#!/bin/bash

# DO NOT USE - UNTESTED
echo "This script is untested."
exit 1

# Vagrant provisions:

if [ ! "$(whoami)" = "root" ] ; then
	echo "This script must be run as root."
	exit 1
fi

VENV_NAME="alexwforsythe"
VENV_CONFIG_LOCATION=$HOME/.virtualenvs/$VENV_NAME/local/bin/postactivate
BASHRC=$HOME/.bashrc

# Install Heroku Toolbelt
sudo wget -qO- https://toolbelt.heroku.com/install-ubuntu.sh | sh

# Install required Ubuntu packages
echo "Installing Ubuntu system packages..."
sudo apt-get update
sudo apt-get install -y git python-dev python-pip postgresql vim curl
sudo apt-get upgrade

# Install virtualenv and virtualenvwrapper
echo "Installing systemwide pip packages..."
sudo pip install virtualenvwrapper

# Set up virtualenv
touch $BASHRC
echo "# virtualenvwrapper"
echo "export WORKON_HOME=$HOME/.virtualenvs" >> $BASHRC
echo "export PROJECT_HOME=/vagrant" >> $BASHRC
echo "source /usr/local/bin/virtualenvwrapper.sh" >> $BASHRC
source $BASHRC

mkvirtualenv $VENV_NAME

echo "DJANGO_SETTINGS_MODULE='alexwforsythe.settings.dev'" >> $VENV_CONFIG_LOCATION
echo "DJANGO_SECRET_KEY='$(heroku config:get DJANGO_SECRET_KEY)'" >> $VENV_CONFIG_LOCATION
echo "DJANGO_DEBUG='1'" >> $VENV_CONFIG_LOCATION

# Install required pip packages
sudo pip install -r requirements.txt
