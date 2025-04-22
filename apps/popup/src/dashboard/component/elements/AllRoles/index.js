import { useState } from '@wordpress/element';
import { CheckboxControl } from '@wordpress/components';

function AllRoles(props) {


const updateDisablKey = function(propsValue, index){
  if(propsValue.includes('all') && index > 0){
    return true;
  }
}
if(props.allroles){
  return (
    <>
        {Object.keys(props.allroles).map( (role , index) => (
          <CheckboxControl
            key={role}
            label={props.allroles[role]}
            //checked={role === 'all' ?  props.selectedRoles.includes(role)  :  !props.selectedRoles.includes('all') && props.selectedRoles.includes(role)}
            checked={props.selectedRoles ? props.selectedRoles.includes(role): false  }
            onChange={() => props.onChange(role)}
            //disabled={updateDisablKey(props.selectedRoles, index)}
          />
        ))}
  </>
  );
}


}

export default AllRoles;