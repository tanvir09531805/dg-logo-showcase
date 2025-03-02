// alert('tanvir');
window.vendor.wp.hooks.addFilter('divi.moduleLibrary.moduleMapping', 'divi', modules => {
    // Helper functions and constants.
    const { set, get, has } = window.lodash;
    const targetModules     = ['divi/cta', 'divi/heading', 'divi/section'];
  
    Object.keys(modules).forEach(moduleName => {
      // If it's not a target module then skip.
      if (! targetModules.includes(moduleName)) {
        return;
      }
  
      const groupsPath    = [moduleName, 'metadata', 'settings', 'groups'];
      const groupsTarget  = get(modules, groupsPath, {});
      const hasGroupsPath = has(modules, groupsPath);
  
      // Checks if path exists, then adds new custom options groups.
      if (hasGroupsPath) {
        groupsTarget.contentIcon = {
          groupName:     'contentIcon',
          panel:         'content',
          priority:      11,
          multiElements: true,
          component:     {
            name:  'divi/composite',
            props: {
              groupLabel: 'Icon',
            },
          },
        };
  
        groupsTarget.designIcon = {
          groupName:     'designIcon',
          panel:         'design',
          priority:      11,
          multiElements: true,
          component:     {
            name:  'divi/composite',
            props: {
              groupLabel: 'Icon',
            },
          },
        };
      } else {
        console.error('Path is not found for', moduleName);
      }
    });
  
    // Return the modified modules.
    return modules;
});