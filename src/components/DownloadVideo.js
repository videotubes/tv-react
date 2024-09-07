import React, { useEffect, useState } from 'react';

const DownloadVideo = ({ videoUrl, buttonName }) => {
  
  const shortLinkUrl = process.env.REACT_APP_SHORTENER_URL_ENDPOINT;
  
  // Detect if is on mobile for download popup
  function isMobileDevice() {
    return /Mobi|Android/i.test(navigator.userAgent);
  }
  
  // Download video if source is VideoThumbnail if else it will redirect to user room, before that this will generate to short link url.
  const downloadPopUp = async (e) => {
    const longUrl = e.target.value;
    const url = `${shortLinkUrl}&url=${longUrl}`;
    const responseData = await fetch(url);
    const shortedUrl = await responseData.json();
    if (shortedUrl.success === true) {
      if (isMobileDevice()) {
        const openInNewTab = window.confirm("Open the link in a new tab?");
        if (openInNewTab) {
          window.open(shortedUrl.short_url, '_blank');
        }
        else {
          window.location.href = shortedUrl.short_url;
        }
      }
      else {
        window.open(shortedUrl.short_url, '_blank');
      }
    }
  };
  
  return (
    <div className="download-button">
      <button type="submit" id="download-popup" value={videoUrl} onClick={downloadPopUp}>{buttonName}</button>
    </div>
  );
};

export default DownloadVideo;
