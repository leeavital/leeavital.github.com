" tab stuff
set tabstop=3
set shiftwidth=3
set softtabstop=3
set expandtab

set smartindent

set nocompatible

set noerrorbells
set novisualbell



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


colorscheme peachpuff

nore ; :
nore , ;


" useful when editing partial tex files
" http://tex.stackexchange.com/questions/55397/vim-syntax-highlighting-of-partial-tex-file-used-with-include-is-incorrect
let g:tex_flavor = "latex"

syntax on



set cc=80

" aspectJ
au BufNewFile,BufRead *.aj set filetype=java


execute pathogen#infect()
filetype plugin indent on

set ruler

autocmd InsertEnter * :set number
autocmd InsertLeave * :set relativenumber


au BufRead *.coffee set filetype=coffee



fun! JsPretty()
   "let lineNo = getline(".")
   execute '%!js-beautify --type js -s 2 -f - '
   "call setline(".", lineNo)
endfunction

fun! HtmlPretty()
   execute '%!js-beautify --type html -s 2 -f -'
endfun

" press f8 to open tagbar
nmap <F8> :TagbarToggle<CR>

" open tagbar when supported
autocmd VimEnter * nested :call tagbar#autoopen(1)


set foldmethod=syntax
set foldlevelstart=100

