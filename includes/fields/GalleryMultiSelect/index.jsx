// External Dependencies
import React, {Component} from 'react';

import './style.css';

class DF_GalleryMultiSelect extends Component {
  static slug = 'df_gallery_multi_select';

  constructor(props) {
    super(props);
    this.state = {
      data: [],
      taxonomy_data: [],
      options: [],
    };
    this.ref_input = React.createRef();
  }

  componentDidMount() {
    if (this.ref_input.current) {
      this.setState({data: this.props.value !== '' ? JSON.parse(this.props.value) : []});
      const taxonomies = window.ETBuilderBackendDynamic.getTaxonomies.difl_media_category;
      if(taxonomies){
          const tax_data = taxonomies.map((data) => ({
              id: data.term_id,
              name: data.name,
              slug: data.slug,
          }));
          this.setState({taxonomy_data: tax_data});
      }

    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
      if(JSON.parse(prevProps.value).length > 0 && JSON.parse(this.props.value).length === 0){
          this.setState({ data: [] });
          this.props._onChange(this.props.name, JSON.stringify([]));
      }
  }


  _onChange = (event) => {
    event.preventDefault();
    let value = this.state.data;
    if(value.includes(String(event.target.value))) return;
    value.push(event.target.value);
    this.props._onChange(this.props.name, JSON.stringify(value));
    this.setState({ data: value });
  };

  _onDelete = (id) => {
    const updatedData = this.state.data.filter((itemId) => itemId !== String(id));
    this.props._onChange(this.props.name, JSON.stringify(updatedData));
    this.setState({ data: updatedData });
  };

  render_selected_content = () => {
    return this.state.data.map(id => {
      return this.state.taxonomy_data.find(item => String(item.id) === String(id));
    }).filter(item => item !== undefined);
  };

    render_select_options = () => {
        const option = this.state.taxonomy_data.filter(({ id }) => !this.state.data.includes(String(id)));
        const element = this.ref_input.current && this.ref_input.current.querySelector("#df-select2-field");
        if (element) {
            if(option.length > 0){
                const newHeight = (option.length * 30) + 32;
                element.style.height = newHeight + 'px';
            }else{
                element.style.height = '62px';
            }
        }
        return option;
    };

  handle_Selector = (event) => {
    const element = this.ref_input.current.querySelector("#df-select2-field");
    (element.classList.contains('active')) ? element.classList.remove('active') : element.classList.add('active');
  }

  render() {
    return (
        <div className="df-select2-wrapper" ref={this.ref_input}>
          <div className="difl-selected-container" onClick={this.handle_Selector}>
            {this.render_selected_content().length > 0 ? this.render_selected_content().map((item) => (
                <div className="selected-items" key={item.id}>
                  <span>{item.name}</span>
                  <i onClick={() => this._onDelete(item.id)} className="dashicons-trash"></i>
                </div>
            )) : <span style={{marginInlineStart: "10px"}}>Select Category</span> }
          </div>
          <select
              id="df-select2-field"
              className="states[]"
              multiple="multiple"
              onChange={this._onChange}
          >
              {(this.render_select_options().length > 0) ? this.render_select_options().map((option) => (
                  <option key={option.id} value={option.id}>
                      {option.name}
                  </option>
              )) : <option disabled className="no-hover">No Item Found</option>}
          </select>
        </div>
    );
  }

}

export default DF_GalleryMultiSelect;