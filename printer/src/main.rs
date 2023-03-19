use std::{env, error::Error, process};

use printer::{run, CLIConfig};

#[tokio::main]
async fn main() -> Result<(), Box<dyn Error>> {
    let args: Vec<String> = env::args().skip(1).collect();

    let cli_config = CLIConfig::build(&args);

    if let Err(err) = run(cli_config).await {
        eprintln!("An error occurred: {}", err);
        process::exit(1);
    };

    Ok(())
}
