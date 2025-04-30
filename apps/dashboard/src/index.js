import domReady from '@wordpress/dom-ready';
import { createRoot } from '@wordpress/element';
import './admin.scss';
import { Container } from './containers/containers';

const app = document.getElementById( 'diviflash-admin' );
const footer = document.getElementById( 'wpfooter' );
const root = createRoot( app );
domReady( () => {
	root.render( <Container /> );
	footer.remove();
} );
