import { useEffect, useState } from '@wordpress/element';

import { TextControl, Button } from '@wordpress/components';

function MediaUpload(props) {

    const [tbarBG, setTbarBG] = useState(props.value);

    const _mediaFrame = window.wp.media({
        multiple: false,
        button: {
            text: 'Set Background Image'
        },
    });

    const handleMediaButton = (event) => {
        _mediaFrame.open();
    }

    _mediaFrame.on('select', () => {
        // Get media attachment details from the frame state
        var attachment = _mediaFrame.state().get('selection').first().toJSON();
        setTbarBG(attachment.url);
        props.onChange(attachment.url);
    })

    return(<div className="df-popup-media-upload">
        <TextControl
            value={tbarBG}
            onChange={(value) => {
                props.onChange(value);
                setTbarBG(value)
            }}
        />
        <Button onClick={ (ev) => handleMediaButton(ev, '') }>
            Upload Image
        </Button>
    </div>)
}
export default MediaUpload;