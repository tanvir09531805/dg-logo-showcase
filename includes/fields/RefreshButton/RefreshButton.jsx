// External Dependencies
import React, { Component } from 'react';

// Internal Dependencies
import './style.css';

class RefreshButton extends Component {

  static slug = 'refresh_button';

  constructor( props ) {
        super( props );

        this.state = {
            disable : false
        }
  }
 
  /**
   * Handle input value change.
   *
   * @param {object} event
   */
  onClick = (event) => {
        event.preventDefault();
        var value = Number(this.props.value);
        value++;
        this.props._onChange(this.props.name, String(value));
        this.handleDisable();
  }

  /**
   * disabled state handle
   * 
   * @returns 
   */
  handleDisable = () => {
      this.setState( { disable: true } );
      setTimeout( () => {
            this.setState( { disable: false } )
      } , 800)
  }

  render() {
        const props = this.props;
        return(
            <button
                  id={`df-vb-type-${props.name}}`}
                  className="df-vb-refresh-button"
                  onClick={this.onClick}
                  value={1}
                  default={1}
                  disabled={ this.state.disable }
            >{props.fieldDefinition.button_text}</button>
        );
  }
}

export default RefreshButton;