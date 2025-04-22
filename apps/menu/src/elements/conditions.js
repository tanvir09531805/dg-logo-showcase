import { useState, useEffect } from '@wordpress/element';

import _ from 'lodash';

function Condition(props) {
    const display = () => {
        let condi = [];
        if(props.conditions && props.conditions.show_if) {
            _.map(props.conditions.show_if, function(val, key) {
                if(props.data[key] === val) {
                    condi.push(true);
                } else {
                    condi.push(false);
                }
            })
        }
        if(props.conditions && props.conditions.show_if_not) {
            _.map(props.conditions.show_if_not, function(val, key) {
                if(props.data[key] === val) {
                    condi.push(false);
                } else {
                    condi.push(true);
                }
            })
        }
        
        return condi.every(ele => ele);
    }
    return display() && props.children;
}
export default Condition;