// External Dependencies
import $ from 'jquery';

// Internal Dependencies
import modules from './modules';
import fields from './fields';
import '../admin/js/module-default-data';
$(window).on('et_builder_api_ready', (event, API) => {
      // Add default data for mdoules in visual builder
    window.ETBuilderBackend.defaults.difl_breadcrumbs = {
      home_text: 'Home',
      separator_text: '/'
    };
  API.registerModules(modules);
  API.registerModalFields(fields);

});
