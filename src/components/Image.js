import React, { useState, useEffect } from 'react';
import LazyLoad from 'react-lazyload';

// Component for check each image for video VideoThumbnail list spesific for compilations. Video image at compilations sometime missing so it will fallback to spesific image for best user experience. This trigger by VideoThumbnail page component
const Image = ({ src, alt, title, key, getFallbackSrc }) => {
  const [fallbackIndex, setFallbackIndex] = useState(0);
  const [imageKey, setImageKey] = useState(Date.now());

  const handleError = (e) => {
    const fallbackSources = getFallbackSrc();
    const currentFallback = fallbackSources[fallbackIndex];

    setFallbackIndex((prevIndex) => (prevIndex + 1) % fallbackSources.length);

    e.target.src = currentFallback;
  };

  useEffect(() => {
    setImageKey(Date.now());
  }, [src])
  
  return (
    <LazyLoad key={key} placeholder={<img src="/assets/tubevideos_placeholder.webp" />}>
      <img
        src={src}
        alt={alt}
        title={title}
        onError={handleError}
      />
    </LazyLoad>
  );
};

export default Image;
