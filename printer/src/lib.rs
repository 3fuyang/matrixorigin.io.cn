use std::{env, error::Error, fs, path::PathBuf, str::FromStr};

use mdbook::{Config, MDBook};

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

pub async fn run(cli_config: CLIConfig) -> Result<(), Box<dyn Error>> {
    let config_src = fs::read_to_string(cli_config.config_src_path)?;
    let config = Config::from_str(&config_src)?;

    let book_rel_path = config.build.build_dir.clone();

    if let Err(err) = MDBook::load_with_config(&cli_config.book_root, config)?.build() {
        return Err(err.into());
    }

    println!("Book generated successfully.");

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
