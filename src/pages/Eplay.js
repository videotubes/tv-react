import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import CommentForm from '../components/CommentForm';
import DownloadVideo from '../components/DownloadVideo';
import videojs from "video.js";
import 'video.js/dist/video-js.css';
import VideoThumbnail from '../components/VideoThumbnail';
import SavedVideos from '../components/SavedVideos';

export default function Eplay ({ userAccount }) {
  
  //**************************************** All State ****************************************//
  const [dataVideos, setDataVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState('');
  const [isReload, setIsReload] = useState(false);
  const [videoData, setVideoData] = useState([]);
  const [isNotFound, setIsNotFound] = useState(false);
  const [isLive, setIsLive] = useState(true);
  
  //**************************************** End Of All State ****************************************//


  const location = useLocation();
  const pathName = location.pathname;
  const currentPath = pathName.split('/').filter(Boolean);
  const prevPage = useRef(0);
  const prevIsNotFound = useRef(isNotFound);
  const account = userAccount();
  const address = account ? account.address : undefined;

  function handleChangeCurrentPage(e) {
    setCurrentPage(e);
  }
  
  function handleChangeIsReload(e) {
    setIsReload(e);
  }
  
  // Function for notfound
  function notFound () {
    prevIsNotFound.current = false;
    setCurrentPage(1);
    setTimeout(() => {
      setIsNotFound(true);
      setIsLoading(false);
      setVideoData([]);
    }, 1000);
  }

  // Fetch eplay
  const getVideo = async (username, page) => {
    let endpointUrl;
    let startPage;
    if(username) {
      endpointUrl = `https://search-cf.eplay.com/channels?size=1&exactMatch=true&username=${username}`;
    }
    else {
      if(page > 1) {
        startPage = page * 60 - 60;
      } else {
        startPage = 0;
      }
      endpointUrl = `https://search-cf.eplay.com/channels?size=60&from=${startPage}&fields=activityTags,avatar,channelId,displayName,gameTags,id,jpeg,keyclub,live,manifest,offline,previews,ss,ssTime,username,vipGame,nudity`;
    }
    try {
      const response = await fetch(endpointUrl, {cache: 'no-store'});
      if(!response.ok) {
        setDataVideos([]);
        setIsLoading(false);
        return;
      }
      const data =  await response.json();
      if(data.results) {
        setIsReload(false);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
      return data;
    }
    catch (error) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      throw new Error('Failed fetch eplay');
    }
  }



  //**************************************** All Fetched Video Data ****************************************//

  // Fetch data from API according url path. The source of all data is inside and start from this function
  const fetchData = async () => {
    try {
      if(currentPath[2]) {
        notFound();
      }
      else {
        if(prevPage.current !== currentPage && !prevIsNotFound.current) {
          prevPage.current = currentPage;
          const allVideos = await getVideo('', currentPage);
          if(allVideos) {
            setIsNotFound(false);
            setDataVideos(allVideos.results);
            setTotalPages(Math.ceil(allVideos.total / 60));
          }
        }
        
        if(currentPath[1]) {
          if(videoData.username !== currentPath[1]) {
            const item = await getVideo(currentPath[1], '');
            if(item && item.total > 0) {
              setIsNotFound(false);
              prevIsNotFound.current = false;
              playVideo(item);
            } else {
              notFound();
            }
          }
        } else {
          setVideoData([]);
        }
      }
    }
    catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pathName, currentPage]);
  
  const visibleResults = dataVideos;

  // Function that trigger on clicked video thumb for play a video
  const playVideo = async (item) => {
    window.scrollTo({top: 0, behavior: 'smooth'});
    setVideoData(item);

    const playerEl = document.getElementById('show-video');
    const sidebar = document.querySelector('.sidebar');
    const sections = document.querySelectorAll('section');
    const vplayer = document.getElementById('video-player');
    const player = `<video id="video-player" class="video-js vjs-big-play-centered" controls playsInline preload="auto" width="600" height="480" autoPlay={${true}}></video>`
    if(!vplayer){
      document.getElementById("video-preview").innerHTML = player;
    }

    if(item.live === false) {
      setIsLive(false);
      const videoPlayer = videojs('video-player');
      videoPlayer.pause();
      const bigPlayButton = videoPlayer.$('.vjs-big-play-button');
      if(bigPlayButton) {
        bigPlayButton.style.display = 'none';
      }
      videoPlayer.reset();
      videoPlayer.poster(item.ss);
      videoPlayer.load();
      videoPlayer.autoplay(false);
    }
    else {
      setIsLive(true);
      const getServer = async () => {
        try {
          const src = await fetch(item.manifest);
          const res = await src.json();
          const url = res.formats['mp4-hls'].manifest;
          return url;
        }
        catch (error) {
          console.error(error);
        }
      }
      const videoPlayer = videojs('video-player');
      const videoSrc = await getServer();
        
      videoPlayer.src({
        src: videoSrc,
        type: 'application/x-mpegURL'
      });
      videoPlayer.poster(item.ss);
      videoPlayer.on('loadedmetadata', () => {
        videoPlayer.play().catch((e) => {
          console.log(e);
        });
        videoPlayer.muted(true);
      });
      videoPlayer.autoplay(true);
    }
    
    setTimeout(() => {
      playerEl.classList.add('open');
    }, 1000);
    
    setTimeout(() => {
      sections.forEach(section => {
        section.classList.add('hide-div');
      });
      sidebar.classList.add('hide-sidebar');
    }, 1300);
  }

  return (
    <>
      <section>
        <div className="page-body full">
          <div className="content-container">
            <div className="heading">
              {isNotFound ? (<><h1>Not Found</h1><h2 className="uid">Decentralized Streaming Videos</h2></>):(
                <>
                <h1>{`Eplay ${videoData.username ? '| ' + videoData.username : ''}`}</h1>
                <h2 className="uid">{`${isNotFound ? 'Not Found' : 'Decentralized Streaming Videos'}`}</h2>
                </>
              )}
            </div>
            <div id="show-video" className="column vid-col">
              <div className="column-1">
                <div id="video-title" className="heading left-flex" style={{ marginTop: 20 }}>
                  <h3><strong>{videoData.username}</strong></h3>
                </div>
                <SavedVideos address={address} videoData={videoData} isNotFound={isNotFound} platform={'eplay'} />
                <div id="video-preview">{!isLive && (<div className="offline-preview">{videoData.username} is OFFLINE</div>)}</div>
                <DownloadVideo videoUrl={`https://eplay.com/${videoData.username}/live`} buttonName={'Go to room'} />
                <span className="details left-flex">{videoData.intro}</span>
              </div>
              <div className="column-2">
                <CommentForm platformName={'eplay'} videoId={videoData.username} />
              </div>
            </div>
            <VideoThumbnail isNotFound={isNotFound} isLoading={isLoading} onChangeCurrentPage={handleChangeCurrentPage} onChangeIsReload={handleChangeIsReload} playVideo={playVideo} isReload={isReload} visibleResults={visibleResults} videoData={videoData} platform={'eplay'} currentPage={currentPage} totalPages={totalPages} handleChangeIsReload={handleChangeIsReload} />
          </div>
        </div>
      </section>
    </>
  );
};
