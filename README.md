# D5 Extension Example Modules
This extension is a collection of example modules. You can use these modules as a reference for your development. This extension uses composer to autoload the modules in PHP. You can find the example modules in the `src/components` folder for Visual Builder and in the `modules` folder for Front-end rendering.

## Installation
You need to have **npm** available in your node.js environment. And make sure to use **node version: 18.0.0 or later**.
```
npm install
```

Install the composer dependencies:
```
composer install
```

Now, start the project:
```
npm run start
```

## Module Icons
You can find the module icons in the `src/icons` folder. You can use these icons for module icon. You can also add your own icons in this folder.

## Tests
In Divi 5, we always use testing. The `test-config` folder contains the configuration for JavaScript testing. The testing for the module is set up in the `__tests__` folder. We test modules based on `test-cases.json`. Some modules require additional mock data, and this data is stored in the `__mock-data__` folder.

## Available Commands
Some `npm` commands are available for your development and tests.

### `npm run start`
It will start the webpack compiler for development with watch mode.

### `npm run build`
It will build all JS and CSS assets for production.

### `npm run zip`
It will zip all assets and files without the `src` folder for distribution.

### `npm run test`
It will run all tests for the module.

### `npm run reset-install`
It will remove node_modules and reinstall all dependencies.

_Note: If you are facing error for divi packages in `npm run install`, then you need to run `npm run reset-install` command._


## Folder Structure
```
d5-extension-example-modules
├── divi-4
│   ├── modules
│   │   └── divi-4-module-name
│   │       └── Divi4Module.php
├── modules
│   └── ModuleName
|   |   ├── ModuleNameTrait
│   │   │   ├── CustomCssTrait.php
│   │   │   ├── ModuleClassnamesTrait.php
│   │   │   ├── ModuleScriptDataTrait.php
│   │   │   ├── ModuleStylesTrait.php
│   │   │   └── RenderCallbackTrait.php
│   │   └── ModuleName.php
│   └── Modules.php
├── scripts -- (build scripts)
├── src
│   ├── components
│   │   └── module-name
│   │       ├── __mock-data__
│   │       │   └── attrs.ts
│   │       │   └── shortcodes.ts -- (for converted modules from Divi 4 module)
│   │       ├── __tests__
│   │       │   ├── __snapshots__
│   │       │   │   └── edit.tsx.snap
│   │       │   └── conversion.ts -- (for converted modules from Divi 4 module)
│   │       │   └── edit.tsx
│   │       ├── custom-css.ts
│   │       ├── edit.tsx
│   │       ├── index.ts
│   │       ├── module.json
│   │       ├── module.scss
│   │       ├── placeholder-content.ts
│   │       ├── settings-advanced.tsx
│   │       ├── settings-content.tsx
│   │       ├── settings-design.tsx
│   │       ├── style.scss
│   │       ├── styles.tsx
│   │       └── types.ts
|   ├── icons
|   |   ├── icon-name
|   |   |   └── index.tsx
│   │   └── index.ts
│   ├── index.ts
│   └── module-icons.ts
├── d5-extension-example-modules.php
├── gulpfile.js
├── package.json
├── package-lock.json
├── README.md
├── tsconfig.json
└── webpack.config.js
```