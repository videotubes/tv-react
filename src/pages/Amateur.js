import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CommentForm from '../components/CommentForm';
import DownloadVideo from '../components/DownloadVideo';
import videojs from "video.js";
import 'video.js/dist/video-js.css';
import VideoThumbnail from '../components/VideoThumbnail';
import SavedVideos from '../components/SavedVideos';

export default function Amateur ({ userAccount }) {  
  
  const backendVideosUrl = process.env.REACT_APP_BACKEND_VIDEO_ENDPOINT;
  
  //**************************************** All State ****************************************//
  const [dataVideos, setDataVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState('');
  const [isReload, setIsReload] = useState(false);
  const [videoData, setVideoData] = useState([]);
  const [isNotFound, setIsNotFound] = useState(false);
  
  //**************************************** End Of All State ****************************************//


  const location = useLocation();
  const pathName = location.pathname;
  const currentPath = pathName.split('/').filter(Boolean);
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
    setCurrentPage(1);
    setTimeout(() => {
      setIsNotFound(true);
      setIsLoading(false);
      setVideoData([]);
    }, 1000);
  }

  // Fetch amateur
  const getVideo = async () => {
    const endpointUrl = `${backendVideosUrl}/amateur`;

    try {
      const response = await fetch(endpointUrl, {cache: 'no-store'});
      if(!response.ok) {
        setDataVideos([]);
        setIsLoading(false);
        return;
      }
      const data =  await response.json();
      if(data.success === true) {
        setIsReload(false);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
      return data.amateur;
    }
    catch (error) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      throw new Error('Failed fetch amateur');
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
        const allVideos = await getVideo();
        if(allVideos) {
          setIsNotFound(false);
          setDataVideos(allVideos);
          setTotalPages(Math.ceil(allVideos.length / 60));
        }
        
        if(currentPath[1]) {
          if(videoData.username !== currentPath[1]) {
            const item = allVideos.find(obj => obj.username === currentPath[1]);
            if(item) {
              setIsNotFound(false);
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
  }, [pathName]);
  
  const startIndex = (currentPage - 1) * 60;
  const endIndex = startIndex + 60;
  const visibleResults = dataVideos.slice(startIndex, endIndex);

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

    const getServer = async () => {
      try {
        const src = await fetch(`${backendVideosUrl}/amateur?show=${item.username}`);
        const res = await src.json();
        
        if(res.success === true) {
          const stream = res.amateur.videoTechnologies.fmp4;
          return stream;
        }
      }
      catch (error) {
        console.error(error);
      }
    }
    const streamUrl = await getServer();
    const videoPlayer = videojs('video-player');
    
    videoPlayer.src({
      src: streamUrl,
      type: 'video/mp4'
    });
    videoPlayer.poster(item.capture);
    videoPlayer.on('loadedmetadata', () => {
      videoPlayer.play().catch((e) => {
        console.log(e);
      });
      videoPlayer.muted(true);
    });
    
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
                <h1>{`Amateur ${videoData.username ? '| ' + videoData.username : ''}`}</h1>
                <h2 className="uid">{`${isNotFound ? 'Not Found' : 'Decentralized Streaming Videos'}`}</h2>
                </>
              )}
            </div>
            <div id="show-video" className="column vid-col">
              <div className="column-1">
                <div id="video-title" className="heading left-flex" style={{ marginTop: 20 }}>
                  <h3><strong>{videoData.username}</strong></h3>
                </div>
                <SavedVideos address={address} videoData={videoData} isNotFound={isNotFound} />
                <div id="video-preview"></div>
                <DownloadVideo videoUrl={`https://amateur.com/${videoData.username}`} buttonName={'Go to room'} platform={'amateur'} />
                <span className="details left-flex">{videoData.topic}</span>
              </div>
              <div className="column-2">
                <CommentForm platformName={'amateur'} videoId={videoData.username} />
              </div>
            </div>
            <VideoThumbnail isNotFound={isNotFound} isLoading={isLoading} onChangeCurrentPage={handleChangeCurrentPage} onChangeIsReload={handleChangeIsReload} playVideo={playVideo} isReload={isReload} visibleResults={visibleResults} videoData={videoData} platform={'amateur'} currentPage={currentPage} totalPages={totalPages} handleChangeIsReload={handleChangeIsReload} />
          </div>
        </div>
      </section>
    </>
  );
};
