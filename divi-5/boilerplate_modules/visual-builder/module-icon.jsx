import React from "react";
import { addFilter } from "@wordpress/hooks";

// Function to dynamically import all icons
const importAll = (requireContext) => {
    const icons = {};
    requireContext.keys().forEach((key) => {
        const iconName = key.replace("./", "").replace(".svg", ""); // Remove folder path and extension
        icons[iconName] = requireContext(key).default; // Import the icon
    });
    return icons;
};

// Dynamically load all SVG icons from the module-icons folder
const icons = importAll(require.context('../../../../admin/dashboard/static/module-icons', false, /\.svg$/));

// Generate the icon configurations for the Divi library
const iconConfigs = Object.keys(icons).reduce((acc, iconName) => {
    const IconComponent = icons[iconName];
    acc[`difl/${iconName}`] = {
        name: `difl/${iconName}`,
        viewBox: "0 0 64 64", // Adjust the viewBox if needed
        component: () => <IconComponent width="64" height="65" />, // Use the component here
    };
    return acc;
}, {});

// Add all icons to the Divi icon library
addFilter("divi.iconLibrary.icon.map", "difl", (existingIcons) => {
    return {
        ...existingIcons,
        ...iconConfigs,
    };
});
