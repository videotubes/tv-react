import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CommentForm from '../components/CommentForm';
import DownloadVideo from '../components/DownloadVideo';
import VideoThumbnail from '../components/VideoThumbnail';
import SavedVideos from '../components/SavedVideos';

export default function Compilations ({ userAddress }) {

  const backendVideosUrl = process.env.REACT_APP_BACKEND_VIDEO_ENDPOINT;
  
  //**************************************** All State ****************************************//
  const [dataVideos, setDataVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState('');
  const [videoThumb, setVideoThumb] = useState('');
  const [isReload, setIsReload] = useState(false);
  const [videoData, setVideoData] = useState([]);
  const [isNotFound, setIsNotFound] = useState(false);
  
  //**************************************** End Of All State ****************************************//


  const location = useLocation();
  const pathName = location.pathname;
  const currentPath = pathName.split('/').filter(Boolean);
  const prevPage = useRef(0);
  const prevIsNotFound = useRef(isNotFound);
  const address = userAddress();
  
  // Function for notfound
  function notFound () {
    prevIsNotFound.current = true;
    setCurrentPage(1);
    setTimeout(() => {
      setIsNotFound(true);
      setIsLoading(false);
      setVideoData([]);
    }, 1000);
  }

  function handleChangeCurrentPage(e) {
    setCurrentPage(e);
  }
  
  function handleChangeIsReload(e) {
    setIsReload(e);
  }
  
  // Fetch compilations
  const getVideo = async (secondPath, query, page) => {
    let endpointUrl;
    if(secondPath) {
      if(secondPath === 'search') {
        endpointUrl = `${backendVideosUrl}/compilations?page=${page}&per_page=60&titla=${query}`;
      }
      else {
        endpointUrl = `${backendVideosUrl}/compilations?filecode=${secondPath}`;
      }
    }
    else {
      endpointUrl = `${backendVideosUrl}/compilations?page=${page}&per_page=60`;
    }
    try {
      const response = await fetch(endpointUrl, {cache: 'no-store'});
      if(!response.ok) {
        setDataVideos([]);
        setIsLoading(false);
        return;
      }
      const data =  await response.json();
      if(data.compilations.status === 200) {
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
      throw new Error('Failed fetch compilations');
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
          const allVideos = await getVideo('', '', currentPage);
          if(allVideos) {
            setIsNotFound(false);
            setDataVideos(allVideos.compilations.result.files);
            setTotalPages(Math.ceil(allVideos.compilations.result.results_total / 60));
          }
        }
        
        if(currentPath[1]) {
          if(videoData.file_code !== currentPath[1]) {
            const item = await getVideo(currentPath[1], '', '');
            if(item && item.compilations.status === 200) {
              setIsNotFound(false);
              prevIsNotFound.current = false;
              playVideo(item.compilations.result[0]);
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
    const player = `<iframe id="iframe-player" src="https://vidhidepre.com/embed/${item.file_code}" width="600" height="500" allowfullscreen></iframe>`
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
                <h1>{`Compilations ${videoData.file_code ? '| ' + videoData.file_code : ''}`}</h1>
                <h2 className="uid">{`${isNotFound ? 'Not Found' : 'Decentralized Streaming Videos'}`}</h2>
                </>
              )}
            </div>
            <div id="show-video" className="column vid-col">
              <div className="column-1">
                <div id="video-title" className="heading left-flex" style={{ marginTop: 20 }}>
                  <h3><strong>{videoData.file_code}</strong></h3>
                </div>
                <SavedVideos address={address} videoData={videoData} isNotFound={isNotFound} platform={'compilations'} />
                <div id="video-preview"></div>
                <DownloadVideo videoUrl={`https://vidhidepre.com/download/${videoData.file_code}`} buttonName={'Download Video'} />
              </div>
              <div className="column-2">
                <CommentForm platformName={'compilations'} videoId={videoData.file_code} />
              </div>
            </div>
            <VideoThumbnail isNotFound={isNotFound} isLoading={isLoading} onChangeCurrentPage={handleChangeCurrentPage} onChangeIsReload={handleChangeIsReload} playVideo={playVideo} isReload={isReload} visibleResults={visibleResults} videoData={videoData} platform={'compilations'} currentPage={currentPage} totalPages={totalPages} handleChangeIsReload={handleChangeIsReload} />
          </div>
        </div>
      </section>
    </>
  );
};