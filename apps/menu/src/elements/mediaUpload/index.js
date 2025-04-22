import { useEffect, useState } from '@wordpress/element';

import { TextControl, Button } from '@wordpress/components';

function MediaUpload(props) {
    const [tbarBG, setTbarBG] = useState(props.value);
    useEffect(() => {
        setTbarBG(props.value);
    }, [props.value]);

    const _mediaFrame = window.wp.media({
        multiple: false,
        button: {
            text: 'Set Background Image'
        },
    });
    _mediaFrame.on('open',function() {
        const selection = _mediaFrame.state().get('selection');
        const attachment = wp.media.attachment(tbarBG.id);
        attachment.fetch();
        selection.add(attachment ? [attachment] : []);
    });

    const handleMediaButton = (event) => {
        _mediaFrame.open();
    }

    _mediaFrame.on('select', () => {
        // Get media attachment details from the frame state
        var attachment = _mediaFrame.state().get('selection').first().toJSON();
        setTbarBG({url:attachment.url,id:attachment.id});
        props.onChange({url:attachment.url,id:attachment.id});
    })

    return(<div className="dfmd-media-upload">
        {"" !== tbarBG.url ? <img className="dfmd-preview" src={tbarBG.url} alt="Upload"/> : ""}
        <TextControl
            value={tbarBG.url}
            onChange={(value) => {
                props.onChange({url: value, id:''});
                setTbarBG({url: value, id:''})
            }}
            __nextHasNoMarginBottom
        />
        <Button onClick={ (ev) => handleMediaButton(ev, '') }>
            <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0NAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAqklEQVR4nO3TvwnCQBQH4BBHsE+fPQQrh7BzA8dwA7FzlXSps4AjaBr5JHDBEw35YxrBHzxySd77OA4uSXqCFMdQaV//EOzkmTMWc2HTUd3YeFQ/Ng5FjjoM3VFFSBW+CT350F2uccUOhwhs1lvcsBmEtcEyPF/A+N+k+AB+FX8w+f0z9LwVxVQQRXt7mpc2ZUdzhlWorKOnbJEYvGA/sZrZN3CWxGc4R+oH6uGUzcxeqxIAAAAASUVORK5CYII="/>
        </Button>
    </div>)
}
export default MediaUpload;
