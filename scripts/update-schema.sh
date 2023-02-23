#!/bin/zsh

MAIN_SCHEMA=5re.chat-app/aws/schema.graphql

echo "copying schema.graphql .."
cp ../$MAIN_SCHEMA ./schema.graphql
echo

echo "running codegen .."
amplify codegen