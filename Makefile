# http://www.cs.tut.fi/~jkorpela/html/cpre.html
# http://gcc.gnu.org/onlinedocs/gcc/Preprocessor-Options.html
build:
	gcc -E -C -x c -P app/app.js > app/compiled.js
	chmod 755 app/compiled.js

build_lib:
	gcc -E -x -C c -P lib/process.jsh > app/compiled-lib.js
	chmod 755 app/compiled.js



full_build: build build_lib
	echo "ok"

