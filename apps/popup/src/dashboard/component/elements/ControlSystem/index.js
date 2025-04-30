
import { withSelect, useSelect } from '@wordpress/data';
import { useEffect, useState } from '@wordpress/element';
import { SelectControl } from '@wordpress/components';
import { CustomPostType, SelectInclude , PostTypeContent, TexonomyContent , AllPages} from '../../elements';

function ControlSystem(props) {
   const indexKey = props.index;

    return (
        <div className="form-inline" key={props.index}>
            <div style={{width: '30%'}}>
            <SelectInclude
            value={ props.element.condition_type}
            onChange={elm => props.onChange(elm , props.index, 'condition_type')}
            />
            </div>
            <div style={{width: '30%'}}>
                
            <CustomPostType  
                value={ props.element.show_popup_at }
                onChange={elm => props.onChange(elm , props.index, 'show_popup_at')}
                postTypes={props.postTypes}
                conditionType={props.element}
                indexKey ={props.index}
            />
            </div>
            {
            props.element.show_popup_at !== 'entire_site' && props.element.show_popup_at !== 'taxonomy'  ? 
            <div style={{width: '30%'}}>
            <PostTypeContent
                value={ props.element.pages }
                onChange={elm => props.onChange(elm , props.index, 'pages')}
                customPostType={props.element.show_popup_at}  
            />
            </div>
            : 
            ''
            }
            {
            props.element.show_popup_at === 'taxonomy' ? 
            <div style={{width: '30%'}}>
            <TexonomyContent
                value={ props.element.pages}
                onChange={elm => props.onChange(elm , props.index, 'pages')}
                // customPostType={props.element.show_popup_at}  
                alltexonomies = {props.alltexonomies}
            />
            </div>
            : 
            ''
            }
            <div className= "remove_block" style={{width: '10%'}}>
                {
                    props.index ? 
                    <button type="button"  className="button remove" onClick={() => props.removeFormFields(props.index)}><span className='close_button'></span></button> 
                    : null
                }
            </div>
        </div>
    );
  
}

export default ControlSystem;

