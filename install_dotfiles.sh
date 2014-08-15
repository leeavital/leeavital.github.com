#/usr/bin/env bash


echo "Installing files to: $HOME"

cd _dotfiles
for file in $(ls -a)
do
   if [ -f $file ]
   then
      install -v $file $HOME
   elif [[ -d $file && $file != "." && $file != ".." ]]
   then
      echo "copying directory: " $file
      cp -R $file $HOME
   fi

done
