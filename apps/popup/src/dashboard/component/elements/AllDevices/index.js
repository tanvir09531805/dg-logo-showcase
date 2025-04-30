import { useState } from '@wordpress/element';
import { CheckboxControl } from '@wordpress/components';

function AllDevices(props) {
  if(props.alldevices){
    return (
      <>
          {Object.keys(props.alldevices).map((device , index)=> (
            <CheckboxControl
              key={device}
              label={props.alldevices[device]}
              //checked={ device === 'all' ?  props.selectedDevices.includes(device)  :  !props.selectedDevices.includes('all') && props.selectedDevices.includes(device) }
              checked={ props.selectedDevices.includes(device) }
              onChange={() => props.onChange(device)}
              // disabled={ props.selectedDevices.includes('all') && index > 0 }
              
            />
          ))}
    </>
    );
  }

}

export default AllDevices;