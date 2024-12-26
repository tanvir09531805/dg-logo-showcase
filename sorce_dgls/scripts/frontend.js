// This script is loaded both on the frontend page and in the Visual Builder.

jQuery(function($) {

    // You can write jQuery code here
    // Select all elements with the class 'dgl-showcase'
    jQuery('.dgl-showcase').each(function() {
        const width = jQuery(this).outerWidth(); // Get the width of the element
        // console.log(`Width of showcase element: ${width}px`);
        let landscapeHight = 16/9
        let portraitHight = 9/16

        let lHight = width/landscapeHight;
        let pHight = width/portraitHight;
        jQuery('.landscape .dgl-showcase').css('height', `${lHight}px`);
        jQuery('.portrait .dgl-showcase').css('height', `${pHight}px`);
        jQuery('.square .dgl-showcase').css('height', `${width}px`);
        jQuery('.logo-full-width .dgl-showcase img').css('width', `${width}px`);
    });

    
});


// const showcaseElements = document.querySelectorAll('.dgl-showcase');
// showcaseElements.forEach((element) => {
//     const width = element.getBoundingClientRect().width;
//     console.log(`Width of showcase element: ${width}px`);
// });
