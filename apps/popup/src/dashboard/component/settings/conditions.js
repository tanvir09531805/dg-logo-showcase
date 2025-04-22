import {useState, useEffect} from '@wordpress/element';
import { withSelect, useSelect } from '@wordpress/data';
import { CheckboxControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { CustomPostType, SelectInclude , PostTypeContent,AllPages, ControlSystem} from '../elements';

function Condition(props) {
    const { data } = props;

    const [formValues, setFormValues] = useState( props.value )
    const [showSite, setShowSite] = useState();
    const [pages, setPages] = useState('');

    let formValueChange = (elm , index, type) => {

      let newFormValues = [...formValues];

      if(type !== 'pages'){

          newFormValues[index][type] = elm;
      }else{
          newFormValues[index][type] = elm
      }

      if(newFormValues[index]['show_popup_at'] === 'entire_site'){

        newFormValues[index]['pages'] = [];
      }
      if(type== 'show_popup_at' ){
        if(newFormValues[index]['show_popup_at'] !=='taxonomy' ){

          if(newFormValues[index]['show_popup_at'] === 'entire_site'){
            newFormValues[index]['pages'] = [];
          }else{
            newFormValues[index]['pages'] = [{id:'all', label: 'All'}];
          }

        }else{

          newFormValues[index]['pages'] = [];
        }
        setShowSite(newFormValues[index]['show_popup_at'])
      }
      setFormValues(newFormValues);
      props.conditionUpdate('df_popup_display_condition', newFormValues);

    }

    let addFormFields = () => {
        setFormValues([...formValues, { condition_type: "include", show_popup_at: "entire_site"  , pages: []}])
      }

    let removeFormFields = (i) => {
        let newFormValues = [...formValues];
        newFormValues.splice(i, 1);
        setFormValues(newFormValues)
        props.conditionUpdate('df_popup_display_condition', newFormValues);
    }

    let changeShowSite = ( value) => {

        setShowSite(value);

    }

    return (
        <div className='control_container'>
          <div className="df-popup-setting-label"  style={{marginBottom: '20px'}}>
            <p className="title">{__('Condition Settings', 'divi_flash')}</p>
            <p className="description">{__('Determine where your popup will be displayed on your website.', 'divi_flash')}</p>
          </div>
          {formValues.map((formvalue, index) => (

            <ControlSystem
              formValue = {formvalue[index]}
              index  = {index}
              postTypes ={props.postTypes}
              element = {formvalue}
              onChange = {(elm , index, type) =>formValueChange(elm , index, type)}
              removeFormFields = {(index) => removeFormFields(index)}
              alltexonomies = {props.alltexonomies}
              key={index}
            />


          ))}
          <div className="button-section">
              <button className="button add" type="button" onClick={() => addFormFields()}>{__('Add', 'divi_flash')}</button>
          </div>
      </div>
    )

}

export default Condition;
