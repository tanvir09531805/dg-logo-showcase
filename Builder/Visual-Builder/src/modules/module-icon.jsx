import React from "react";
const {
	addAction, addFilter,
} = window?.vendor?.wp?.hooks;

import {
	DiviFlashIcon,
	BentoGridIcon,
	AdvancedButtonIcon,
	SocialShareIcon,
	ImageRevealIcon,
	AvatarStackIcon,
	InlineContentsIcon,
	ACFGalleryIcon
} from '../icons';

const importAll = (requireContext) => {
    const icons = {};
    requireContext.keys().forEach((key) => {
        const iconName = key.replace("./", "").replace(".svg", ""); // Remove folder path and extension
        icons[iconName] = requireContext(key).default; // Import the icon
    });
    return icons;
};

const icons = importAll(require.context('../../../../admin/dashboard/static/module-icons', false, /\.svg$/));

const iconConfigs = Object.keys(icons).reduce((acc, iconName) => {
    const IconComponent = icons[iconName];
    acc[`difl/${iconName}`] = {
        name: `difl/${iconName}`,
        viewBox: "0 0 64 64", // Adjust the viewBox if needed
        component: () => <IconComponent width="64" height="65" />, // Use the component here
    };
    return acc;
}, {});

addFilter("divi.iconLibrary.icon.map", "difl", (existingIcons) => {
    return {
        ...existingIcons,
        ...iconConfigs,
		[DiviFlashIcon.name]: DiviFlashIcon,
		[BentoGridIcon.name]: BentoGridIcon,
		[AdvancedButtonIcon.name]: AdvancedButtonIcon,
		[SocialShareIcon.name]: SocialShareIcon,
		[ImageRevealIcon.name]: ImageRevealIcon,
		[AvatarStackIcon.name]: AvatarStackIcon,
		[InlineContentsIcon.name]: InlineContentsIcon,
		[ACFGalleryIcon.name]: ACFGalleryIcon,
    };
});
