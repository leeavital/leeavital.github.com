syntax on


" tab stuff
set tabstop=3
set shiftwidth=3
set softtabstop=3
set expandtab

set smartindent

set nocompatible




" when searching, only think about case when the 
" pattern has an upper case letter
set ignorecase
set smartcase

" menu for common commands in ex mode
set wildmenu
set wildmode=list:longest,full


set smarttab

set number


" highlight search results
set hlsearch


" nowrap
set nowrap


set cursorline


colorscheme murphy

nore ; :
nore , ;


" useful when editing partial tex files
" http://tex.stackexchange.com/questions/55397/vim-syntax-highlighting-of-partial-tex-file-used-with-include-is-incorrect
let g:tex_flavor = "latex"



set cc=80

" aspectJ
au BufNewFile,BufRead *.aj set filetype=java


execute pathogen#infect()
filetype plugin indent on


autocmd InsertEnter * :set number
autocmd InsertLeave * :set relativenumber
