import {useState, useEffect} from '@wordpress/element';

function SettingsGroup(props) {

    const [showIf, setShowIf] = useState(true);

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
        if(props.hasOwnProperty('load')) {
            const data = {};
            data[props.id] = {
                group: props.group,
                show:  showIf
            }
            props.load(data);
        }        
    })

    if(showIf) {
        return(<div id={props.id} data-group={props.group} className="df-popup-settings-group">
            <h4 className="group-title">{props.group}</h4>
            {props.children}
        </div>)
    } else {
        return(<></>)
    }
    
}
export default SettingsGroup;