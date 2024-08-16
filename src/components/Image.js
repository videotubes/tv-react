import React, { useEffect, useState } from 'react';

// Component for check each image for video VideoThumbnail list spesific for compilations. Video image at compilations sometime missing so it will fallback to spesific image for best user experience. This trigger by VideoThumbnail page component
const Image = ({ src, getFallbackSrc }) => {
  const [fallbackIndex, setFallbackIndex] = useState(0);

  const handleError = (e) => {
    const fallbackSources = getFallbackSrc();
    const currentFallback = fallbackSources[fallbackIndex];

    setFallbackIndex((prevIndex) => (prevIndex + 1) % fallbackSources.length);

    e.target.src = currentFallback;
  };

  return (
    <img
      src={src}
      onError={handleError}
    />
  );
};

export default Image;
