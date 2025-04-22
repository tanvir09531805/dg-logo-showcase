(() => {
    window.addEventListener('DOMContentLoaded', () => {
        setTimeout(() => {
            const parts = window.location.search.substr(1).split('&');
            const $_GET = {};
            for (let i = 0; i < parts.length; i++) {
                const temp = parts[i].split('=');
                $_GET[decodeURIComponent(temp[0])] = decodeURIComponent(
                    temp[1]
                );
            }
            if (
                typeof $_GET['autofocus[section]'] !== 'undefined' &&
                $_GET['autofocus[section]'] !== ''
            ) {
                const panel = document.querySelector('#accordion-panel-difl_advanced_genaral > .accordion-section-title');
                const section = document.querySelector(`#accordion-section-${$_GET['autofocus[section]']} > .accordion-section-title`);
                panel.click();
                setTimeout(() => {
                    section.click();
                }, 300);
            }
        }, 300);

    })
})();