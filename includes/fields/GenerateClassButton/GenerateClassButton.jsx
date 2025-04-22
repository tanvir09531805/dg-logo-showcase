// External Dependencies
import React, { Component } from 'react';

// Internal Dependencies
import './style.css';
import $ from 'jquery';
class GenerateClassButton extends Component {

  static slug = 'generate_button';

  constructor( props ) {
        super( props );
        this.state = { 
          copySuccess: '',
          newClass: '',
          codeGenerate : false,
        }
        this.copyToClipboard = this.copyToClipboard.bind(this);
  }
  componentDidMount() {  
    const prefix_class = this.props.fieldDefinition.prefix_class;
    const selectorValue = prefix_class === 'df_cs_primary' ? this.props.moduleSettings.primary_content_selector : this.props.moduleSettings.secondary_content_selector;
    if(selectorValue === undefined){
      const new_class = this.contentSwitcherUniqueID(6 , this.props.fieldDefinition.prefix_class);
      this.props._onChange(this.props.name, new_class);
    } 
  }

  componentDidUpdate(prevProps, prevState) {
    setTimeout(() => {
      if(this.state.copySuccess !== '') {
        this.setState({ copySuccess: '' });
      }
    }, 3000)
  }
 
  copyToClipboard = (e) => {
      e.preventDefault();
      var text = e.target.parentNode.querySelector('.df-vb-class-field');
      var el = document.createElement('textarea');
      el.value = text.value;
      el.setAttribute('readonly', '');
      el.style.position = 'absolute';
      el.style.left = '-9999px';
      document.body.appendChild(el);
      el.select();
      document.execCommand("copy");
      e.target.focus();
      this.setState({ copySuccess: 'Copied!' });
    };

  /**
   * Handle input value change.
   *
   * @param {object} event
   */
     _onChange = (event) => {
      this.props._onChange(this.props.name, event.target.value);
    }
  
  contentSwitcherUniqueID(length , type = 'df_cs_primary') {
  
      var result           = type === 'df_cs_primary' ? 'df_cs_primary_': 'df_cs_secondary_';
      var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
      var charactersLength = characters.length;
      for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
    }
  
  render() {
        const props = this.props;
    
        return(
            <>
            <input 
                  ref={(inputField) => this.inputField = inputField}
                  type="text" 
                  id={`df-vb-input-${props.name}`}
                  className="et-fb-settings-option-input et-fb-settings-option-input--block df-vb-class-field"
                  name={this.props.name}
                  value={this.props.value }
                  onChange={this._onChange}
            />
            <button
                  id={`df-vb-type-${props.name}`}
                  className="df-vb-generate-class-button"
                  onClick={this.copyToClipboard}
                 
            >
              {props.fieldDefinition.button_text}
            </button>
            {
            
            this.state.copySuccess !== '' ? <span className="copy-text">Copied!</span> : ''
             
            }
            </>
        );
  }
}

export default GenerateClassButton;