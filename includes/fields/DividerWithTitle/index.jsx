// External Dependencies
import React, { Component } from 'react';

const style = {
  h6: {
    padding: '0',
    fontSize: '16px',
    fontWeight: '800',
    paddingTop: '10px',
    margin: '0'
  },
  hr: {
    borderTop: '1px solid #f1f5f9'
  }
}

class DividerWithTitle extends Component {

  static slug = 'df_divider_with_title';

  render() {
    return <div className='df-builder-divider'>
        <h6 style={style.h6}>{this.props.fieldDefinition.options.title}</h6>
        <hr style={style.hr}/>
    </div>;
  }
}

export default DividerWithTitle;
