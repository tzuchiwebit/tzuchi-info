#!/bin/bash

PROJECT_DIR=$( cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd )
ENV_FILE=".env"
echo "PROJECT_DIR: $PROJECT_DIR"

while getopts "e:" arg
do
    case $arg in
        e)
            ENV_FILE=".env.$OPTARG"
            ;;
        ?)
            echo "unknown argument"
            exit 1
     esac
done

. $PROJECT_DIR/$ENV_FILE

echo "ENV_NAME: $ENV_NAME"

cd $PROJECT_DIR
# PATH="/root/.nvm/versions/node/v18.18.2/bin:$PATH"
npm run build
