
INSTALL OF VIRTUALBOX

https://download.virtualbox.org/virtualbox/5.2.6/virtualbox-5.2_5.2.6-120293~Ubuntu~xenial_amd64.deb

#######################################################

INSTALL OF VAGRANT

https://releases.hashicorp.com/vagrant/2.0.2/vagrant_2.0.2_x86_64.deb?_ga=2.93307613.1304601059.1519641759-1044868200.1519641759

#######################################################

IN THE VAGRANT (if the Install fails)

#######################################################

INSTALLING PHP

sudo apt-get update
sudo apt-get upgrade

sudo apt-get install python-software-properties
echo -ne '\n' | sudo add-apt-repository ppa:ondrej/php
sudo apt-get update
sudo apt-get install php7.2
sudo apt-get install php7.2-mbstring
sudo apt-get install zip
sudo apt-get install php7.2-zip
sudo apt-get install openssl
sudo apt-get install phpunit

#######################################################

INSTALLING COMPOSER

php -r "copy('https://getcomposer.org/installer', 'composer-setup.php');"

php -r "if (hash_file('SHA384', 'composer-setup.php') === '544e09ee996cdf60ece3804abc52599c22b1f40f4323403c44d44fdfdd586475ca9813a858088ffbc1f233e9b180f061') { echo 'Installer verified'; } else { echo 'Installer corrupt'; unlink('composer-setup.php'); } echo PHP_EOL;"

php composer-setup.php

php -r "unlink('composer-setup.php');"

sudo mv composer.phar /usr/local/bin/composer
#######################################################

INSTALL OF LUMEN

composer create-project --prefer-dist laravel/lumen project

php -S localhost:8000 -t public

