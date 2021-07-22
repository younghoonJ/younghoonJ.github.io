# https://younghoonjung.com



### Jekyll with Tailwindcss configuration.


### build
npm install tailwindcss @tailwindcss/typography cssnano postcss postcss-import autoprefixer --save-dev

bundle exec jekyll serve


### publish on nelify

JEKYLL_ENV=production bundle exec jekyll build
JEKYLL_ENV=production NODE_ENV=production bundle exec jekyll build
