#!/usr/bin/env bash

set -e

yarn run test
yarn run build:ts
yarn run build:ts:es2015

JSCODE="
var x = require('./package.json');
x.version = x.version.split('.').map((x, i) => + (i === 2) + + x).join('.');
fs.writeFileSync('./package.json', JSON.stringify(x, null, 2));
"
node -e "$JSCODE"

rm -rf ./packet/*
mkdir -p ./packet/lib

cp ./package.json ./packet/package.json
cp -r ./lib/* ./packet/lib/
cd ./packet
git init

echo "Publishing es6"
yarn publish --non-interactive --access public
echo "Publishing es6 ... done"

JSCODE="
var np = require('./package.json');
var op = require('./../package.json');
op.version = np.version;
var fs = require('fs');
fs.writeFileSync('./../package.json', JSON.stringify(op, null, 2));
"
node -e "$JSCODE"
echo "Version bump ... done"

# es2015
cd ..
rm -rf ./packet/lib/*
cp -r ./lib5/* ./packet/lib/
cd ./packet

JSCODE="
var p = require('./package.json');
p.name = '@kalmia/jsf-common-es2015'
var fs = require('fs');
fs.writeFileSync('./package.json', JSON.stringify(p));
"
node -e "$JSCODE"

echo "Publishing es2015"
yarn publish --non-interactive --access public
echo "Publishing es2015 ... done"

cd ..
pwd

git add package.json
git add yarn.lock
git diff-index --quiet HEAD || git commit --no-verify -m "Bot: publish kalmia/jsf-common@$( node -e "console.log(require('./package.json').version)" )"

echo "PUBLISHED kalmia/jsf-common@$( node -e "console.log(require('./package.json').version)" )"

cd ..
