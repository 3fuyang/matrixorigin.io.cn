use std::{env, error::Error, fs, path::PathBuf, str::FromStr};

use fancy_regex::{Captures, Regex};
use mdbook::{Config, MDBook};
use walkdir::{DirEntry, WalkDir};

pub struct CLIConfig {
    pub book_root: PathBuf,
    pub config_src_path: PathBuf,
    pub serve: bool,
}

impl CLIConfig {
    pub fn build(args: &[String]) -> CLIConfig {
        let len = args.len();

        let book_root = if len > 0 {
            args[0].clone()
        } else {
            "../docs/MatrixOne".to_string()
        };
        let config_src_path = if len > 1 {
            args[1].clone()
        } else {
            "../docs/MatrixOne/book.toml".to_string()
        };
        let serve = env::var("SERVE").is_ok();

        CLIConfig {
            book_root: PathBuf::from(book_root),
            config_src_path: PathBuf::from(config_src_path),
            serve,
        }
    }
}

/// Asserts `markdown` files.
fn is_md(entry: &DirEntry) -> bool {
    entry
        .file_name()
        .to_str()
        .map(|e| e.ends_with(".md"))
        .unwrap_or(false)
}

/// Asserts `mdx` files.
fn is_mdx(entry: &DirEntry) -> bool {
    entry
        .file_name()
        .to_str()
        .map(|e| e.ends_with(".mdx"))
        .unwrap_or(false)
}

/// Replace mkdocs-style admonition component syntax.
fn replace_admonitions(entry: &DirEntry) -> Result<(), Box<dyn Error>> {
    let src = fs::read_to_string(entry.path())?;
    let adm_re = Regex::new(
        r"(?s)!!![^\r\n\S]*(?<type>[^\s]+)?[^\r\n\S]*(?<title>[^\r\n]+)?((.(?!\n\n|\r\n\r\n))*.)",
    )?;

    let match_adm = adm_re.is_match(&src)?;

    if match_adm {
        let after = adm_re.replace_all(&src, |caps: &Captures| {
            let adm_type = &caps.get(1).map(|m| m.as_str()).unwrap_or("info");
            let adm_title = &caps.get(2).map(|m| m.as_str()).unwrap_or("注意");
            let adm_content = &caps[3];
            format!(":::{}[{}]{}\r\n:::", adm_type, adm_title, adm_content)
        });

        fs::write(entry.path(), after.to_string())?;
    }

    Ok(())
}

/// Renames `.md` files to `.mdx`.
fn rename_md_to_mdx() -> Result<(), Box<dyn Error>> {
    for entry in WalkDir::new("../docs/MatrixOne") {
        let entry = entry?;
        if is_md(&entry) {
            replace_admonitions(&entry)?;
            // rename_file(&entry, "mdx")?;
        }
    }

    Ok(())
}

/// Renames `.mdx` files to `.md`.
fn rename_mdx_to_md() -> Result<(), Box<dyn Error>> {
    for entry in WalkDir::new("../docs/MatrixOne") {
        let entry = entry?;
        if is_mdx(&entry) {
            rename_file(&entry, "md")?;
        }
    }

    Ok(())
}

/// Renames a file with the given new extension.
fn rename_file(entry: &DirEntry, new_ext: &str) -> Result<(), Box<dyn Error>> {
    let old_path = entry.path();
    let new_path = old_path.with_extension(new_ext);
    fs::rename(&old_path, &new_path)?;
    Ok(())
}

pub async fn run(cli_config: CLIConfig) -> Result<(), Box<dyn Error>> {
    let config_src = fs::read_to_string(cli_config.config_src_path)?;
    let config = Config::from_str(&config_src)?;

    let book_rel_path = config.build.build_dir.clone();

    // if let Err(err) = MDBook::load_with_config(&cli_config.book_root, config)?.build() {
    //     return Err(err.into());
    // }

    // println!("Book generated successfully.");

    if let Err(err) = rename_md_to_mdx() {
        return Err(err.into());
    };

    let book_root = cli_config.book_root;

    if cli_config.serve {
        let mut book_path = PathBuf::new();

        book_path.push(book_root);
        book_path.push(book_rel_path);

        let server = warp::serve(warp::fs::dir(book_path)).run(([127, 0, 0, 1], 3000));

        println!("Server started at http://localhost:3000");
        server.await;
    }

    Ok(())
}
