use std::env;

use printer::{CLIConfig, run};

#[tokio::main]
async fn main() {
    let args: Vec<String> = env::args().skip(1).collect();

    let cli_config = CLIConfig::build(&args);

    run(cli_config).await;
}
