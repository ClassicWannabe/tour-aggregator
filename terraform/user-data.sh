#!/bin/bash

echo "Update packages and install Git"
sudo apt update -y
sudo apt install -y nodejs npm git

echo "Install Node.js 20"
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.40.1/install.sh | bash
exec bash
nvm install 20
nvm use 20

echo "Install Yandex CLI"
curl -sSL https://storage.yandexcloud.net/yandexcloud-yc/install.sh | bash
exec bash

echo "Get the repo"
yc storage s3api get-object --bucket deploy-config --key yc_deploy_key_ed25519  ~/.ssh/id_ed25519
chmod 400 ~/.ssh/id_ed25519
echo "github.com ssh-ed25519 AAAAC3NzaC1lZDI1NTE5AAAAIOMqqnkVzrm0SdG6UOoqKLsabgH5C9okWi0dh2l9GKJl" > ~/.ssh/known_hosts
mkdir ~/tour-app
git clone git@github.com:ClassicWannabe/scaling-broccoli.git ~/tour-app/
yc storage s3api get-object --bucket deploy-config --key backend-env ~/tour-app/backend/.env

echo "Start the app"
cd ~/tour-app/backend
npm ci
npm run build:db
npm run build:app
npm run start:prod
