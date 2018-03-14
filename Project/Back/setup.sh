#!/bin/bash

echo "PROVISIONNING VIRTUAL MACHINE"
echo "UPDATING"
   sudo apt-get update
   sudo apt-get upgrade
echo "INSTALLING GIT"
   sudo apt-get install git -y > /dev/null
echo "INSTALLING NGINX"
   sudo apt-get install nginx -y > /dev/null
echo "UPDATE PHP REPOSITORY"
   sudo apt-get install python-software-properties build-essential -y > /dev/null
   sudo add-apt-repository ppa:ondrej/php 
   sudo apt-get update
   sudo apt-get install php7.2 -y
echo "INSTALLING PHP EXTENSIONS"
   sudo apt-get install php7.2-mbstring -y
   sudo apt-get install zip -y
   sudo apt-get install php7.2-zip -y
   sudo apt-get install openssl -y
   sudo apt-get install phpunit -y
   sudo apt-get install php7.2-mysql -y
echo "PREPARING MYSQL"
   sudo apt-get install debconf-utils -y > /dev/null
   debconf-set-selections <<< "mysql-server mysql-server/root_password password 0000"
   debconf-set-selections <<< "mysql-server mysql-server/root_password_again password 0000"
echo "INSTALLING MYSQL"
   sudo apt-get install mysql-server -y > /dev/null
echo "UPDATE"
   sudo apt-get update
echo "INSTALLING COMPOSER"
   cd /var/www/html
   php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"
   php -r "if (hash_file('SHA384', 'composer-setup.php') === '544e09ee996cdf60ece3804abc52599c22b1f40f4323403c44d44fdfdd586475ca9813a858088ffbc1f233e9b180f061') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"
   php composer-setup.php
   php -r "unlink('composer-setup.php');"
   sudo mv composer.phar /usr/local/bin/composer
echo "UPDATE"
   sudo apt-get update
   composer update
echo "CLONE LASTEST PROJECT BACK FROM DEV"
   git clone  https://github.com/MaximeDelaporte/TodoList-Lumen/tree/dev/Project/Back/data/project
   cd project
   composer install
   echo "create database `todo_db`" | mysql -u root -p
   php artisan migrate
   php artisan db:seed
   vagrant ssh
