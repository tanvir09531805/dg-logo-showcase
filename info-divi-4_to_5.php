<?php
# https://devalpha.elegantthemes.com/docs/category/converting-divi-4-module-to-divi-5/
# https://github.com/elegantthemes/d5-extension-example-modules

/**
* I created a Divi module named DG Logo Showcase and a folder named dg-logo-showcse. It works fine, but it was built in Divi 4. Now, I want to convert the Divi-4 module to a Divi-5 module.  

Difference between a Divi 4 extension & a Divi 5 extension
** The module settings which were defined using PHP in Divi 4 are now defined using React in Divi 5. 
** Proficiency with React, particularly focusing on React-based architecture, modern JavaScript frameworks, and streamlined functionality.
* Completely React-based, focusing on client-side rendering.
* Modules are written primarily in JavaScript/JSX, with minimal PHP for setup.
* No shortcodes; the React virtual DOM handles rendering dynamically.
** 2. Module Registration
* Modules are registered via config.json and React components.
* Divi CLI provides scaffolding tools, and module configuration is abstracted into JSON and JavaScript files.
* 
** 3. Rendering
* Client-side rendering using React component
* The builder interface and front-end use the same React-based rendering logic, ensuring consistency.
** 5. Styling
* Uses modern CSS methodologies (e.g., CSS-in-JS or scoped CSS in module files).
* Module styles are modular and scoped within the React component.
** 5. State Management
* React handles state management natively.
* Module props and states allow real-time updates in the builder.
Divi CLI, Hot-reloading and better debugging support
** 7. Fields and Settings
* Fields and settings are defined in config.json
* Improved support for advanced field types like arrays, repeaters, and JSON structures.
*** This means you'll need to rewrite PHP-heavy modules and adapt to the React/JSX paradigm.  
*** While the learning curve may be steep initially ***

>> Divi 5 SDK (Software Development Kit).
*/
/*
>> Divi 5 module borrows many concept and approach from WordPress' block editor (Gutenberg), but diverge in some areas.
>> Divi 5 doesn't save the rendered HTML on the database; 
>> Recommend using Typescript.
>> 
>> 

npm install |=> E:\dg-logo-showcase\d5-logo-showcase\visual-builder

when run npm build 

npm install cross-env --save-dev |=> install cross-env

NODE_ENV=development webpack -w --config webpack.config.js --progress = set NODE_ENV=development&& webpack -w --config webpack.config.js --progress

npm run start | then run npm run build.

# https://devalpha.elegantthemes.com/docs/tutorials/module/intermediate/converting-module/converting-static-module

Frontend |=> https://devalpha.elegantthemes.com/docs/tutorials/module/intermediate/converting-module/converting-static-module#frontend

*/