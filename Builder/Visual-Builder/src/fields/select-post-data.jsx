import {__} from "@wordpress/i18n";
// react dependency
import React, {useEffect, useState, useRef} from "react";
const {useFetch} = window?.divi?.rest;

// divi fields
const {SelectContainer} = window?.divi?.fieldLibrary;
const {FieldContainer} = window?.divi?.module;



export const SelectPostTypes = ( props ) => {

    const [postData, setPostData] = useState({
        typeList: {
            post: {
                label: __("Posts", "dg-blog-module"),
                value: "post",
            },
        }
    });

    const {fetch, isLoading} = useFetch([]);
    const fetchAbortRef = useRef();
    useEffect(() => {
        if (fetchAbortRef.current) {
            fetchAbortRef.current.abort();
        }
        fetchAbortRef.current = new AbortController();

        // Helper function to handle API fetch
        const fetchData = async (route) => {
            try {
                const response = await fetch({
                    method: "GET",
                    restRoute: route,
                    signal: fetchAbortRef.current.signal,
                });
                return response;
            } catch (error) {
                console.error("Error fetching data:", error);
                return null;
            }
        };

        const fetchCategoriesAndTypes = async () => {
            const [categories, types] = await Promise.all([
                fetchData("/wp/v2/categories"),
                fetchData("/wp/v2/types"),
            ]);

            if (!categories || !types) return;

            const excludePostTypes = [
                "page",
                "attachment",
                "nav_menu_item",
                "wp_block",
                "wp_template",
                "wp_template_part",
                "wp_global_styles",
                "wp_navigation",
                "wp_font_family",
                "wp_font_face",
            ];
            const postData = {
                typeList: Object.values(types).reduce((acc, type) => {
                    if (!excludePostTypes.includes(type.slug)) {
                        acc[type.slug] = {
                            label: type.name,
                            value: type.slug,
                        };
                    }
                    return acc;
                }, {}),
            };

            // Set the post data state
            setPostData(postData);
        };

        // Call the function to fetch data
        fetchCategoriesAndTypes();

        // Cleanup function
        return () => {
            if (fetchAbortRef.current) {
                fetchAbortRef.current.abort();
            }
        };
    }, []);


    return (
        <>
            <FieldContainer
                attrName={props.attrName}
                features={{
                    sticky: false,
                    responsive: false,
                    hover:false,
                }}
                component={{
                    type:"field",
                    name:"divi/select"
                }}
                options={{
                    select: {
                        label: __("Select Post type", "dg-blog-module"),
                        value: "select",
                    },
                    ...postData.typeList
                }}
            >
            </FieldContainer>
        </>
    );
};
