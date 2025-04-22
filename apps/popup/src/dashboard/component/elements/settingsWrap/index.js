import {useState, useEffect} from '@wordpress/element';
import {Divider} from '../index';

function SettingsWrap(props) {
    const [showIf, setShowIf] = useState(true);

    const [disableLabel, setdisableLabel] = useState(false);
    const customClass = props.customClass ? props.customClass: '';
    useEffect(() => {
        if(props.hasOwnProperty('show_if')) {
            if(props.show_if) {
                setShowIf(true);
            } else {
                setShowIf(false);
            }
        } 
    }, [props.show_if])

    useEffect(() => {
      
        if(props.disableLabel) {
            setdisableLabel(true);
        } else {
            setdisableLabel(false);
        }
         
    }, [props.disableLabel])
    // console.log( props.label + ': '+ showIf)
    if(showIf){
       
        return <><div className={customClass + " df-popup-settings-wrap"}>
                    {   
                        props.label !== undefined  ? 
                        <div className="df-popup-setting-label">
                            <p className="title">
                                {props.label}
                            </p>
                            {props.description ? 
                                <p className="description">{props.description}</p> : ''}
                        </div>
                        : 
                        ''
                    }
                    <div className="df-popup-setting-content">{props.children}</div>
                </div>
                {<Divider />}
                </>
    }else{
        return(<></>)
    }

}
export default SettingsWrap;