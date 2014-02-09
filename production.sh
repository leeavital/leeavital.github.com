#!/bin/bash

cd bonsai
vim site.yml
bonsai -r
cp -r output/** ../ 
