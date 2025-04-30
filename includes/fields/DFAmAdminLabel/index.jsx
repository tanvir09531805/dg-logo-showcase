// External Dependencies
import React, { Component } from 'react';

// Internal Dependencies
import './style.css';

class DFAmAdminLabel extends Component {

  static slug = 'df_am_admin_label';

  constructor(props) {
    super(props);

    this._attrs = {
      logo: 'Logo',
      menu: 'Menu',
      offcanvas: 'Offcanvas Trigger',
      mm_trigger: 'Mobile Menu Trigger',
      button: 'Button',
      search: 'Search',
      social: 'Social',
      text: 'Custom Text',
      cart: 'Woo Cart',
      icon_box: 'Icon Box',
      divider: 'Divider',
      select: 'No Item Selected'
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.moduleSettings.type !== prevProps.moduleSettings.type) {
      this.save_module_props();
    }
  }
  componentDidMount() {
    this.save_module_props();
  }

  save_module_props = () => {
    const { moduleSettings: { type }, _onChange, name } = this.props;
    const label = this._attrs[type].toString();
    _onChange(name, label);
  }

  render() {
    return false;
  }
}

export default DFAmAdminLabel;
