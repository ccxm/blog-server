cd /root/project/blog-server
git pull
npm i
tsc
forever stop ./build/server.js
forever start ./build/server.js
