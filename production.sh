#!/bin/bash

cd bonsai
vim site.yml
bonsai -r
cp -r output/** ../ 


tar -cvf site.tar output/*
mv site.tar ../

