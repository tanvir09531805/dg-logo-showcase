This project was bootstrapped with [Create Divi Extension](https://github.com/elegantthemes).

Below you will find some information on how to perform common tasks. You can find the most recent version of this guide [here](https://github.com/elegantthemes/d5-extension-example-modules/blob/main/README.md).

## Installation
You need to have npm available in your node.js environment. And make sure to use node version: 20.11.1 or later.
```js
npm install
```
Install the composer dependencies:
```js
composer install
```
Now, start the project:
```js
npm run start
```

## If you download [d5-extension-example-module](https://github.com/elegantthemes/d5-extension-example-modules), it will not work in windows then you need to flow below step
install npm 
```js
npm install
```
Then install cross-env
```js
npm install cross-env --save-dev
```
go to packge.json and script>stat
```js
set NODE_ENV=development&& webpack -w --config webpack.config.js --progress
```
Now, start the project:
```js
npm run start
```
**This feature is currently only supported by [Visual Studio Code](https://code.visualstudio.com) and [WebStorm](https://www.jetbrains.com/webstorm/).**



## Something Missing?

If you have ideas for more “How To” recipes that should be on this page, [let us know](https://github.com/elegantthemes/d5-extension-example-modules) or [contribute some!](https://github.com/tanvir09531805/dg-logo-showcase/)
