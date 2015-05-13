#!/bin/bash

set -e

key=0
host=0
user=0

while getopts "h:u:k:" opt
do
  case $opt in
    h)
      host=$OPTARG
      ;;
    u)
      user=$OPTARG
      ;;
    k)
      key=$OPTARG
      ;;
    esac
done

if [[ $key = 0 || $host = 0 || $user = 0 ]]
then
  echo "Usage: $0 -u  <user> -k <sshkey> -h <host>"
  exit 1
fi


jekyll b


# cp -r output/** ../
scp -r -i $key _site/ $user@$host:/var/www/html


# tar -cvf site.tar output/*
# mv site.tar ../

