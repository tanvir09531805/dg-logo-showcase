const { useState, useEffect, useRef } = window.vendor.React;
const fieldStyle = {
    backgroundColor: '#f1f5f9',
    width: '50%',
    display: 'inline-block',
    maxHeight: '30px',
    borderRadius: '3px',
    padding: '7px 10px',
    boxSizing: 'border-box',
    color: '#4c5866',
    fontFamily: 'Open Sans, Helvetica, Roboto, Arial, sans-serif',
    fontSize: '13px',
    fontWeight: 600,
    textTransform: 'none',
    lineHeight: 'normal',
    boxShadow: 'none',
    letterSpacing: 'normal',
    marginRight: '10px',
};
const buttonStyle = {
    padding: '5px 12px',
    marginRight: '10px',
    border: 'none',
    fontSize: '13px',
    backgroundColor: '#2b87da',
    color: 'white',
    lineHeight: '1.6em',
    fontWeight: 700,
    borderRadius: '3px',
    cursor: 'pointer',
    boxShadow: '1px 2px 10px -5px #18466e',
};

export const GenerateClassButton = ( props ) => {
    const [ copySuccess, setCopySuccess ] = useState( '' );
    const inputFieldRef = useRef( null );

    useEffect( () => {
       const prefix_class = props.fieldDefinition.prefix_class;
       const selectorValue = prefix_class === 'df_cs_primary'
          ? props?.moduleSettings?.primary_content_selector
          : props?.moduleSettings?.secondary_content_selector;

       if ( selectorValue === undefined ) {
          const new_class = contentSwitcherUniqueID( 6, prefix_class );
          props.onChange( { event: props.name, inputValue: new_class } );
       }
    }, [] );

    useEffect( () => {
       if ( copySuccess ) {
          const timer = setTimeout( () => setCopySuccess( '' ), 3000 );
          return () => clearTimeout( timer );
       }
    }, [ copySuccess ] );

    const copyToClipboard = ( e ) => {
       e.preventDefault();
       const text = inputFieldRef.current.value;
       const el = document.createElement( 'textarea' );
       el.value = text;
       el.setAttribute( 'readonly', '' );
       el.style.position = 'absolute';
       el.style.left = '-9999px';
       document.body.appendChild( el );
       el.select();
       document.execCommand( 'copy' );
       document.body.removeChild( el );
       setCopySuccess( 'Copied!' );
    };

    const _onChange = ( e ) => {
       props.onChange( { event: e, inputValue: e.target.value } );
    };

    const contentSwitcherUniqueID = ( length, type = 'df_cs_primary' ) => {
       let result = type === 'df_cs_primary' ? 'df_cs_primary_' : 'df_cs_secondary_';
       const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
       const charactersLength = characters.length;
       for ( let i = 0; i < length; i++ ) {
          result += characters.charAt( Math.floor( Math.random() * charactersLength ) );
       }
       return result;
    };

    return (
       <>
          <input
             ref={ inputFieldRef }
             type="text"
             id={ `df-vb-input-${ props.name }` }
             style={ fieldStyle }
             className="et-fb-settings-option-input et-fb-settings-option-input--block df-vb-class-field"
             name='sample_value'
             value={ props.value }
             onChange={ _onChange }
          />
          <button
             id={ `df-vb-type-${ props.name }` }
             style={ buttonStyle }
             className="df-vb-generate-class-button"
             onClick={ copyToClipboard }
          >
             { props.fieldDefinition.button_text }
          </button>
          { copySuccess && <span className="copy-text">Copied!</span> }
       </>
    );
};

