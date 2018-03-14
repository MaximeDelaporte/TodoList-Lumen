#!/bin/bash

cd Front
echo "INSTALLING NODE.JS"
   curl -sL https://deb.nodesource.com/setup_9.x | sudo -E bash -
   sudo apt-get install -y nodejs
echo "INSTALLING ELECTRON"
   npm install electron --save-dev --save-exact
   cd Electron
   npm install
echo "FRONT INSTALLED"
cd ../../Back
   vagrant up
echo "BACK INSTALLED"

