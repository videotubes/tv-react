import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import CommentForm from '../components/CommentForm';
import DownloadVideo from '../components/DownloadVideo';
import VideoThumbnail from '../components/VideoThumbnail';
import SavedVideos from '../components/SavedVideos';

export default function Chaturbate ({ userAccount, clientIp }) {
  
  const chaturbateUrl = process.env.REACT_APP_CHATURBATE_VIDEO_ENDPOINT;
  
  //**************************************** All State ****************************************//
  const [dataVideos, setDataVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState('');
  const [isReload, setIsReload] = useState(false);
  const [videoData, setVideoData] = useState([]);
  const [isNotFound, setIsNotFound] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  //**************************************** End Of All State ****************************************//


  const location = useLocation();
  const pathName = location.pathname;
  const currentPath = pathName.split('/').filter(Boolean);
  const prevUrl = useRef(location.hash);
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

  // Fetch chaturbate
  const getVideo = async (secondPath, query, page) => {
    const limit = 500;
    const totalResults = 1000;
    let allResults = [];
    let offset = 0;
    let endpointUrl;

    try {
      while (offset < totalResults) {
        if (secondPath) {
          if (secondPath === 'search') {
            setSearchQuery(query);
            endpointUrl = `${chaturbateUrl}/?wm=55xr9&limit=${limit}&offset=${offset}&tag=${query}&client_ip=${clientIp}`;
          } else {
            setSearchQuery('');
            endpointUrl = `${chaturbateUrl}/?wm=55xr9&limit=${limit}&offset=${offset}&client_ip=${clientIp}`;
          }
        } else {
          setSearchQuery('');
          endpointUrl = `${chaturbateUrl}/?wm=55xr9&limit=${limit}&offset=${offset}&client_ip=${clientIp}`;
        }

        const response = await fetch(endpointUrl, { cache: 'no-store' });
        if (!response.ok) {
          setDataVideos([]);
          setIsLoading(false);
          return [];
        }

        const data = await response.json();

        if (data.results) {
          allResults = [...allResults, ...data.results];
        }

        offset += limit;

        if (data.results.length < limit) {
          break;
        }
      }

      if (allResults.length > 0) {
        setIsReload(false);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }

      return allResults;

    } catch (error) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      throw new Error('Failed fetch chaturbate');
    }
  };



  //**************************************** All Fetched Video Data ****************************************//

  // Fetch data from API according url path. The source of all data is inside and start from this function
  const fetchData = async () => {
    try {
      if(currentPath[3]) {
        notFound();
      } else {
        let allVideos;
        if(currentPath[1] !== 'search' && !prevIsNotFound.current) {
          allVideos = await getVideo('', '', currentPage);
          if(allVideos) {
            setIsNotFound(false);
            setDataVideos(allVideos);
            setTotalPages(Math.ceil(allVideos.length / 60));
          }
        }
        
        if(currentPath[1]) {
          prevUrl.current = currentPath[1];
          if(currentPath[1] === 'search' && currentPath[2]) {
            allVideos = await getVideo('search', currentPath[2], currentPage);
            if(allVideos) {
              setIsNotFound(false);
              prevIsNotFound.current = false;
              setDataVideos(allVideos);
              setTotalPages(Math.ceil(allVideos.length / 60));
            }
          } else {
            if(currentPath[2]) {
              notFound();
            } else {
              if(videoData.username !== currentPath[1]) {
                const item = allVideos.find(obj => obj.username === currentPath[1]);
                if(item) {
                  setIsNotFound(false);
                  playVideo(item);
                } else {
                  notFound();
                }
              }
            }
          }
        } else {
          setVideoData([]);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    if (clientIp) {
      fetchData();
    }
  }, [pathName, clientIp]);

  const startIndex = (currentPage - 1) * 60;
  const endIndex = startIndex + 60;
  const visibleResults = dataVideos.slice(startIndex, endIndex);

  // Function that trigger on clicked video thumb for play a video
  const playVideo = async (item) => {
    if(prevUrl.current === 'search') {
      setCurrentPage(1);
    }
    
    window.scrollTo({top: 0, behavior: 'smooth'});
    setVideoData(item);
    
    const playerEl = document.getElementById('show-video');
    const sidebar = document.querySelector('.sidebar');
    const sections = document.querySelectorAll('section');
    const player = `<iframe id="iframe-player" src="https://chaturbate.com/embed/${item.username}/" width="600" height="500" allowfullscreen></iframe>`
    document.getElementById("video-preview").innerHTML = player;
    
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
                <h1>
                  {searchQuery ? (
                    <>Chaturbate | Search <i>{decodeURIComponent(searchQuery)}</i></>
                  ):(
                    `Chaturbate ${videoData.username ? '| ' + videoData.username : ''}`
                  )}
                </h1>
                <h2 className="uid">{`${isNotFound ? 'Not Found' : 'Decentralized Streaming Videos'}`}</h2>
                </>
              )}
            </div>
            <div id="show-video" className="column vid-col">
              <div className="column-1">
                <div id="video-title" className="heading left-flex" style={{ marginTop: 20 }}>
                  <h3><strong>{videoData.username}</strong></h3>
                </div>
                <SavedVideos address={address} videoData={videoData} isNotFound={isNotFound} platform={'chaturbate'} />
                <div id="video-preview"></div>
                <DownloadVideo videoUrl={videoData.chat_room_url_revshare} buttonName={'Go to room'} />
                <span className="details left-flex">{videoData.room_subject}</span>
              </div>
              <div className="column-2">
                <CommentForm platformName={'chaturbate'} videoId={videoData.username} />
              </div>
            </div>
            <VideoThumbnail isSearch={prevUrl.current} isNotFound={isNotFound} isLoading={isLoading} onChangeCurrentPage={handleChangeCurrentPage} onChangeIsReload={handleChangeIsReload} playVideo={playVideo} isReload={isReload} visibleResults={visibleResults} videoData={videoData} platform={'chaturbate'} currentPage={currentPage} totalPages={totalPages} handleChangeIsReload={handleChangeIsReload} />
          </div>
        </div>
      </section>
    </>
  );
};
