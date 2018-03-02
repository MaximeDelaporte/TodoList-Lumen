#!/bin/bash

echo "INSTALLING NODE.JS"
   curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
   sudo apt-get install -y nodejs
echo "INSTALLING ELECTRON"
   npm install electron --save-dev --save-exact
   git clone https://github.com/electron/electron-quick-start
   cd electron-quick-start
   npm install
   npm start
