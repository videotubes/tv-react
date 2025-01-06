import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import videojs from "video.js";
import 'video.js/dist/video-js.css';
import Image from './Image';

export default function VideoThumbnail ({ deleteThis, address, isSearch, isNotFound, isLoading, onChangeCurrentPage, onChangeIsReload, playVideo, isReload, visibleResults, videoData, platform, currentPage, totalPages, handleChangeIsReload }) {
  
  const [videoThumb, setVideoThumb] = useState('');
  const [isPagination, setIsPagination] = useState(false);
  const navigate = useNavigate();

  const buttonsPerPage = 5;
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalPages); i++) {
    pageNumbers.push(i);
  }
  const startButtonIndex = Math.floor((currentPage - 1) / buttonsPerPage) * buttonsPerPage;
  const endButtonIndex = startButtonIndex + buttonsPerPage;
  const visiblePageNumbers = pageNumbers.slice(startButtonIndex, endButtonIndex);
  
  const handleFirstPage = () => {
    if(platform === 'compilations' || platform === 'eporner' || platform === 'camsoda' || platform === 'redtube' || platform === 'babestation' || platform === 'eplay') {
      onChangeIsReload(true);
    }
    onChangeCurrentPage(1);
  };
  const handleLastPage = () => {
    if(platform === 'compilations' || platform === 'eporner' || platform === 'camsoda' || platform === 'redtube' || platform === 'babestation' || platform === 'eplay') {
      onChangeIsReload(true);
    }
    onChangeCurrentPage(totalPages);
  };
  const handleClick = (pageNumber) => {
    if(platform === 'compilations' || platform === 'eporner' || platform === 'camsoda' || platform === 'redtube' || platform === 'babestation' || platform === 'eplay') {
      onChangeIsReload(true);
    }
    onChangeCurrentPage(pageNumber);
  };
  const handleNextPage = () => {
    if(platform === 'compilations' || platform === 'eporner' || platform === 'camsoda' || platform === 'redtube' || platform === 'babestation' || platform === 'eplay') {
      onChangeIsReload(true);
    }
    onChangeCurrentPage((prevPage) => prevPage + 1)
  };
  const handlePrevPage = () => {
    if(platform === 'compilations' || platform === 'eporner' || platform === 'camsoda' || platform === 'redtube' || platform === 'babestation' || platform === 'eplay') {
      onChangeIsReload(true);
    }
    onChangeCurrentPage((prevPage) => prevPage - 1);
  };

  function closePlayer () {
    const playerEl = document.getElementById('show-video');
    const sidebar = document.querySelector('.sidebar');
    const sections = document.querySelectorAll('section');
    
    playerEl.classList.remove('open');
    window.scrollTo({top: 0, behavior: 'smooth'});
    
    const hasScrollbar = window.innerWidth > document.documentElement.clientWidth;
    const viewportWidth = hasScrollbar ? window.innerWidth : document.documentElement.clientWidth;

    if(viewportWidth < 500){
      setTimeout(() => {
        sidebar.classList.remove('hide-sidebar-mobile');
      }, 1000);
    }
    
    setTimeout(() => {
      sections.forEach(section => {
        section.classList.remove('hide-div');
      });
      sidebar.classList.remove('hide-sidebar');
    }, 1000);

    const vplayer = document.getElementById('video-player');
    const removeIframe = document.querySelector('iframe');
    if(vplayer){
      setTimeout(function() {
        videojs(vplayer).dispose();
      }, 1500);
    }
    if(removeIframe) {
      setTimeout(function() {
        removeIframe.remove();
      }, 1500);
    }
  }

  // Search videos on some page that support search from API
  function searchVid (e) {
    e.preventDefault();
    if(currentPage > 1) {
      onChangeCurrentPage(1);
    }
    onChangeIsReload(true);
    const formData = new FormData(e.target);
    const form_values = Object.fromEntries(formData);
    if(form_values.search) {
      navigate(`/${platform}/search/${form_values.search}/`, { replace: true });
      const inputMessage = document.getElementById('search');
      inputMessage.value = '';
    }
  }
  
  useEffect(() => {
    if(isNotFound) {
      closePlayer();
    };
  }, [isNotFound]);

  // The main div element for all video thumbnail also for upload url path
  useEffect(() => {
    if(platform === 'savedlist') {
      if(address) {
        if(visibleResults.length !== 0) {
          setVideoThumb(
            <div className="view">
            {visibleResults.map((item, index) => (
              <div key={index} className="thumb" style={{textAlign: "left"}}>
                <button className="button-delete" onClick={(e) => deleteThis(item)} >
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#fff" viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                  </svg>
                </button>
                <Link to={`/${item.platform}/${item.video_id}/`}>
                  <Image
                    imgKey={item.video_id}
                    src={item.image_url}
                    getFallbackSrc={() => [
                      `/assets/no-image.webp`,
                    ]}
                    alt={item.video_id}
                    title={item.video_id}
                    width="214"
                    height="142"                    
                  />
                  <span className="thumb-title">
                    <span className="wrap">{item.video_id}</span>
                  </span>
                </Link>
              </div>
            ))}
            </div>
          )
        } else {
          setVideoThumb('');
        }
      }
      else {
        setVideoThumb(
          <div className="loading-animation" style={{color: "var(--red-bg)", fontSize: 24, fontWeight: 600}}>Please connect wallet first</div>
        );
      }
      
    }
    else {
      if(visibleResults.length === 0) {
        if(isSearch === 'search' && (platform === 'eporner' || platform === 'redtube' || platform === 'compilations')) {
          setVideoThumb(
            <>
              <form className="form-inline" onSubmit={searchVid}>
                <input className="form-control mr-sm-2" name="search" type="search" id="search" placeholder="Search videos" aria-label="Search" />
              </form>
              <div className="loading-animation" style={{color: "var(--red-bg)", fontSize: 24, fontWeight: 600}}>No results</div>
            </>
          )
        }
        else {
          setVideoThumb(
            <div className="loading-animation" style={{color: "var(--red-bg)", fontSize: 24, fontWeight: 600}}>Failed to fetch videos</div>
          )
        }
        setIsPagination(false);
      }
      else {
        let videoId, videoTitle, getThumbnailUrl, getCompilationsFallback, viewCount, getOnliveStatus = false, isHaveViewCount = false, isHaveSearchForm = false;
        
        if(platform === 'camsoda') {
          videoId = 'username';
          videoTitle = 'username';
          viewCount = 'connectionCount';
          isHaveViewCount = true;
          getThumbnailUrl = item => item.thumbUrl;
          getCompilationsFallback = item => ('');
        }
        else if(platform === 'compilations') {
          videoId = 'file_code';
          videoTitle = 'file_code';
          viewCount = 'views';
          isHaveViewCount = true;
          isHaveSearchForm = true;
          getThumbnailUrl = item => `https://videothumbs.me/${item.file_code}_xt.jpg`;
          getCompilationsFallback = item => `https://videothumbs.me/${item.file_code}_t.jpg`;
        }
        else if(platform === 'dreamcam') {
          videoId = 'modelNickname';
          videoTitle = 'modelNickname';
          getThumbnailUrl = item => item.modelProfilePhotoUrl;
          getCompilationsFallback = item => ('');
        }
        else if(platform === 'bongacams') {
          videoId = 'username';
          videoTitle = 'username';
          viewCount = 'viewers';
          isHaveViewCount = true;
          getThumbnailUrl = item => {
            let url = item.thumb_image;
            url = `https:${url}`
              .replace("{ext}", "jpg"); 
            return url;
          };
          getCompilationsFallback = item => ('');
        }
        else if(platform === 'xlovecam') {
          videoId = 'name';
          videoTitle = 'name';
          getThumbnailUrl = item => `https:${item.imgLive}`;
          getCompilationsFallback = item => ('');
        }
        else if(platform === 'cam4') {
          videoId = 'nickname';
          videoTitle = 'nickname';
          viewCount = 'viewers';
          isHaveViewCount = true;
          getThumbnailUrl = item => item.thumb;
          getCompilationsFallback = item => ('');
        }
        else if(platform === 'chaturbate') {
          videoId = 'username';
          videoTitle = 'username';
          viewCount = 'num_users';
          isHaveViewCount = true;
          getThumbnailUrl = item => item.image_url;
          getCompilationsFallback = item => ('');
        }
        else if(platform === 'stripchat') {
          videoId = 'username';
          videoTitle = 'username';
          viewCount = 'viewersCount';
          isHaveViewCount = true;
          getThumbnailUrl = item => item.snapshotUrl;
          getCompilationsFallback = item => ('');
        }
        else if(platform === 'eplay') {
          videoId = 'username';
          videoTitle = 'username';
          getThumbnailUrl = item => item.ss;
          getOnliveStatus = true;
          getCompilationsFallback = item => ('');
        }
        else if(platform === 'amateur') {
          videoId = 'username';
          videoTitle = 'username';
          viewCount = 'viewers';
          isHaveViewCount = true;
          getThumbnailUrl = item => {
            const parts = item.capture.split('/');
            parts[4] = 'capture';
            const unblured = parts.join('/');
            return unblured;
          };
          getCompilationsFallback = item => ('');
        }
        else if(platform === 'babestation') {
          videoId = 'Nickname';
          videoTitle = 'Nickname';
          getThumbnailUrl = item => item.Thumbnail;
          getCompilationsFallback = item => ('');
        }
        else if(platform === 'eporner') {
          videoId = 'id';
          videoTitle = 'title';
          viewCount = 'views';
          isHaveViewCount = true;
          isHaveSearchForm = true;
          getThumbnailUrl = item => item.default_thumb.src;
          getCompilationsFallback = item => ('');
        }
        else if(platform === 'redtube') {
          videoId = 'video_id';
          videoTitle = 'title';
          viewCount = 'views';
          isHaveViewCount = true;
          isHaveSearchForm = true;
          getThumbnailUrl = item => item.thumb;
          getCompilationsFallback = item => ('');
        }

        setVideoThumb(
          <>
            {isHaveSearchForm && (
              <form className="form-inline" onSubmit={searchVid}>
                <input className="form-control mr-sm-2" name="search" type="search" id="search" placeholder="Search videos" aria-label="Search" />
              </form>
            )}
            <div className="view">
              {isReload && (
                <div className="loading-overlay">
                  <div className="loading-animation">
                  <div className="loading-spinner"></div></div>
                </div>
              )}
              {visibleResults.map((item, index) => {
                const thumbnailUrl = getThumbnailUrl(item);
                const compilationsFallback = getCompilationsFallback(item);
                return (
                  <div key={index} style={{textAlign: "left"}} className="thumb">
                    {getOnliveStatus && !item.live && (<div className="thumb-overlay">OFFLINE</div>)}
                    <Link to={`/${platform}/${item[videoId]}/`} onClick={() => playVideo(item)}>
                      <Image
                        imgKey={item[videoId]}
                        src={thumbnailUrl}
                        getFallbackSrc={() => [
                          compilationsFallback,
                          `/assets/no-image.webp`,
                        ]}
                        alt={item[videoTitle]}
                        title={item[videoTitle]}
                        width="214"
                        height="142"
                      />
                      <span className="thumb-title">
                        <span className="wrap">{item[videoTitle]}</span>
                        {isHaveViewCount && (
                          <span style={{display: "flex"}}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 12">
                              <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                              <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                            </svg>&nbsp;{item[viewCount]}
                          </span>
                        )}
                      </span>
                    </Link>
                  </div>
                )})
              }
            </div>
          </>
        );
        setIsPagination(true);
      }
    }
  }, [address, isReload, visibleResults]);

  return (
    <>
      {isLoading ? (
        <div className="loading-animation">
        <div className="loading-spinner"></div>
        </div>
      ):(
        <>
          {isNotFound ? (
            <div className="notfound-page">
              <img src="/assets/gif-lesbico-sumisa-gimiendo-anime-porn.gif" alt="gif-lesbico-sumisa-gimiendo-anime-porn" width="1024" height="576"/>
            </div>
          ):(
            <div id="video-thumb">
              {videoThumb}
              {isPagination && (
                <div className="heading center-flex">
                  <div className="pagination">
                    <button className="number" onClick={handleFirstPage} disabled={currentPage === 1}>First</button>
                    <button className="number" onClick={handlePrevPage} disabled={currentPage === 1}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 -960 960 960" width="24"><path d="M560-253.847 333.847-480 560-706.153 602.153-664l-184 184 184 184L560-253.847Z"/></svg>
                    </button>
                    {visiblePageNumbers.map((pageNumber) => (
                    <button className="number"
                      key={pageNumber}
                      onClick={() => handleClick(pageNumber)}
                      disabled={currentPage === pageNumber}>
                      {pageNumber}
                    </button>
                    ))}
                    <button className="number" onClick={handleNextPage} disabled={currentPage === totalPages || totalPages === 0}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 -960 960 960" width="24"><path d="m517.847-480-184-184L376-706.153 602.153-480 376-253.847 333.847-296l184-184Z"/></svg>
                    </button>
                    <button className="number" onClick={handleLastPage} disabled={currentPage === totalPages || totalPages === 0}>Last</button>
                  </div>
                </div>
              )}
            </div>
          )}
        </>
      )}
    </>
  );
};
