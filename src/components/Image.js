import React, { useState } from 'react';
import LazyLoad from 'react-lazyload';

// Component for check each image for video VideoThumbnail list spesific for compilations. Video image at compilations sometime missing so it will fallback to spesific image for best user experience. This trigger by VideoThumbnail page component
const Image = ({ src, alt, title, getFallbackSrc }) => {
  const [fallbackIndex, setFallbackIndex] = useState(0);

  const handleError = (e) => {
    const fallbackSources = getFallbackSrc();
    const currentFallback = fallbackSources[fallbackIndex];

    setFallbackIndex((prevIndex) => (prevIndex + 1) % fallbackSources.length);

    e.target.src = currentFallback;
  };

  return (
    <LazyLoad>
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
