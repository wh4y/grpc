#!/bin/bash
#
SCRIPT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )

cd "$SCRIPT_DIR"
cd ..

yarn tsproto --path ./src --template ./templates/main.hbs
yarn cti create ./src -e -b
