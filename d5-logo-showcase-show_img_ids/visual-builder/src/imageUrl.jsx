import React from 'react';
import { useRef, useState, useEffect, Fragment } from '@wordpress/element';

export default function ImageUrl( ids ) {

  const [urls, setUrls] = useState([]);

  useEffect(() => {
    const fetchImageUrls = async (ids) => {
      let idsArray = ids.split(",");
      const imageUrls = await Promise.all(
        idsArray.map(async (id) => {
          const response = await fetch(`/wp-json/wp/v2/media/${id}`);
          const imageData = await response.json();
          return imageData.source_url;
        })
      );
      return imageUrls;
    };

    // Fetch URLs when component mounts or ids changes
    const fetchUrls = async () => {
      const fetchedUrls = await fetchImageUrls(ids);
      setUrls(fetchedUrls);
    };

    fetchUrls();
  }, [ids]);

  return (
    <>
      {urls.map((item, index) => (
        <div key={index} className="d5_ls_module_image">
          <img src={item} alt={`Logo ${index + 1}`} />
        </div>
      ))}
    </>
  )
}
