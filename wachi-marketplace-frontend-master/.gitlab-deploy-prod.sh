#!/bin/bash
echo "Iniciando batch"
set -f
string=$FE_PROD_SERVER_TO_DEPLOY
array=(${string//,/ })

for i in "${!array[@]}"; do
  echo "Desplegando el servidor de front end de Marketplace - Wachi en produccion con la ip ${array[i]}"
  ssh ec2-user@${array[i]} "cd /home/ec2-user/wachi-marketplace-frontend && git reset --hard && git pull https://DanielAlpiste:WACHI9929.@gitlab.com/wachi-pucp/marketplace/wachi-marketplace-frontend.git && npm install && npm run build && aws s3 sync ./dist s3://marketplace-front"
done