const DownloadVideo = ({ videoUrl, buttonName }) => {
  
  const shortLinkUrl = process.env.REACT_APP_SHORTENER_URL_ENDPOINT;
  
  // Download video if video can downloaded (not live stream) if else it will redirect to user room, before that this will generate to short link url.
  const downloadPopUp = async (e) => {
    const longUrl = e.target.value;
    const url = `${shortLinkUrl}&url=${longUrl}`;
    const newTab = window.open("about:blank", "_blank");
    try {
      const responseData = await fetch(url);
      if (responseData.ok) {
        let targetUrl;
        const shortedUrl = await responseData.json();
        if (shortedUrl.success === true) {
          targetUrl = shortedUrl.short_url;
        }
        newTab.location.href = targetUrl;
      } else {
        newTab.close();
        return;
      }
    } catch (error) {
      newTab.close();
      console.error(error);
    }
  };
  
  return (
    <div className="download-button">
      <button type="submit" id="download-popup" value={videoUrl} onClick={downloadPopUp}>{buttonName}</button>
    </div>
  );
};

export default DownloadVideo;