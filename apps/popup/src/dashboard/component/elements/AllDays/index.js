import { useState } from '@wordpress/element';
import { CheckboxControl } from '@wordpress/components';

function AllDays(props) {

if(props.alldays){
  return (
    <>
        {Object.keys(props.alldays).map(day => (
          <CheckboxControl
            key={day}
            label={props.alldays[day]}
            checked={props.selectedDays.includes(day)}
            onChange={() => props.onChangeDay(day)}
            
          />
        ))}
  </>
  );
}

}

export default AllDays;