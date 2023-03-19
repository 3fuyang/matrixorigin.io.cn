# Printer

This sub project helps export the document to pdf.

## How to Run

Node.js is required to run a headless chromium.

```shell
# Make sure you are at the correct directory
cd printer

npm ci

npm run print
```

You'll see a `book.pdf` emitted.

## Build from source

To build the executable from source, you will first need to install Rust and Cargo.

```shell
# Make sure you are at the correct directory
cd printer

# Build the executable.
cargo build
```

Move the `print` executable under `target/debug` to `printer`. Or you can modify the `print` script in `package.json` to `SERVE=1 ./target/debug/printer`.

```shell
npm ci

npm run print
```
