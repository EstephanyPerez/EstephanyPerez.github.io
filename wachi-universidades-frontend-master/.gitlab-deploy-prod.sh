#!/bin/bash
echo "Iniciando batch"
set -f
string=$FE_PROD_SERVER_TO_DEPLOY
array=(${string//,/ })

for i in "${!array[@]}"; do
  echo "Desplegando el servidor de front end de Universidades - Wachi en produccion con la ip ${array[i]}"
  ssh ec2-user@${array[i]} "cd /home/ec2-user/wachi-universidades-frontend && git pull https://DanielAlpiste:WACHI9929.@gitlab.com/wachi-pucp/universidades/wachi-universidades-frontend.git && npm run build && aws s3 sync ./dist s3://front-serveless"
done