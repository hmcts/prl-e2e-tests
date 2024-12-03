#!/bin/bash
# Change KEY_VAULT_NAME if you want to use a different environment
# Secrets must be tagged with "e2e": "ENV_VAR_NAME" in Azure Key Vault
# This script looks for the tagged secrets and creates an .env file based on the .env.example file
# Requires: Azure CLI & JQ (brew install azure-cli jq)

KEY_VAULT_NAME="prl-aat"
env_example_file=".env.example"
env_file=".env"
temp_env_file=$(mktemp)
secrets=$(az keyvault secret list --vault-name $KEY_VAULT_NAME --query "[].id" -o tsv)

for secret in $secrets; do
    secret_name=$(basename $secret)
    tags=$(az keyvault secret show --vault-name $KEY_VAULT_NAME --name $secret_name --query "tags" -o json)
    if echo $tags | jq -e 'has("e2e")' > /dev/null; then
        env_var=$(echo $tags | jq -r '.e2e')
        secret_value=$(az keyvault secret show --vault-name $KEY_VAULT_NAME --name $secret_name --query "value" -o tsv)
        echo "$env_var=$secret_value" >> $temp_env_file
    fi
done

if [ -f $env_example_file ]; then
    cp $env_example_file $env_file
    while IFS= read -r line; do
        key=$(echo $line | cut -d '=' -f 1)
        value=$(grep "^$key=" $temp_env_file | cut -d '=' -f 2-)
        if [ -n "$value" ]; then
            sed -i '' "s|^$key=.*|$key=$value|" $env_file
        fi
    done < $env_example_file
    echo ".env file created successfully."
else
    echo ".env.example file not found." && exit 1
fi

rm $temp_env_file