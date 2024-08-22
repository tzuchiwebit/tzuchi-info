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

if [ -f $PROJECT_DIR/$ENV_FILE ]; then
  echo "Loading environment variables from .env file..."
  export $(grep -v '^#' $PROJECT_DIR/$ENV_FILE | xargs)
else
  echo ".env file not found. Exiting."
  exit 1
fi

echo "✨ [ENV_NAME] $ENV_NAME"
env_vars=$(grep -v '^#' $PROJECT_DIR/$ENV_FILE  | xargs)

echo "✅ $env_vars"
cd $PROJECT_DIR
PATH="/root/.nvm/versions/node/v18.18.2/bin:$PATH"
env $(grep -v '^#' "$PROJECT_DIR/$ENV_FILE" | xargs) npm run start
