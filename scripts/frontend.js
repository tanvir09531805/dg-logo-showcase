// This script is loaded both on the frontend page and in the Visual Builder.

jQuery(function($) {});

document.addEventListener('ETDOMContentLoaded', function(event){
    // add an placeholder to insert OFC markup in the builder
    function createOfc() {
        let div = document.createElement('div');
        div.innerHTML = ('<div class="df-app-ofc-wrap"></div>');
        return div;
    }
    event.target.body.appendChild(createOfc());
    
})