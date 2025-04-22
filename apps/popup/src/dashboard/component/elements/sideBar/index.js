import { useEffect, useState } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';

import _ from 'lodash';

function SideBar(props) {
    const[layout, setLayout] = useState([]);

    const[loadClass, setLoadclass] = useState('');

    useEffect(() =>{
        renderNav();
    }, [props.nav_item])

    useEffect(() =>{
        if(props.loadClass) {
            setTimeout(() =>{
                setLoadclass('loaded')
            }, 300)
        }
    }, [props.loadClass])

    const renderNav = () => {
        let _layout = [];
        {_.map(props.nav_item, (e, i) => {
            const L = e.show ? <a href={i}>{e.group}</a> : '';
            _layout = [
                ..._layout,
                L
            ]
        })}
        setLayout(_layout);
    }    

    return(<div className={`side-bar ${loadClass}`}>
        {layout}
    </div>)
   
}
export default SideBar;