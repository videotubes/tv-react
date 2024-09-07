import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import VideoThumbnail from '../VideoThumbnail';

export default function SavedList ({ userAddress }) {  
  
  const savedVideosUrl = process.env.REACT_APP_SAVED_VIDEOS_ENDPOINT;
  
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
  const address = userAddress();

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

  // Fetch savedlist
  const getSavedVideos = async (user) => {
    const endpointUrl = `${savedVideosUrl}?user=${user}`;

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
      return data;
    }
    catch (error) {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
      throw new Error('Failed fetch savedlist');
    }
  }



  //**************************************** All Fetched Video Data ****************************************//

  // Fetch data from API according url path. The source of all data is inside and start from this function
  const fetchData = async () => {
    try {
      if(currentPath[1]) {
        notFound();
      }
      else {
        if(address) {
          const allVideos = await getSavedVideos(address);
          if(allVideos) {
            setIsNotFound(false);
            setDataVideos(allVideos.saved_list);
            setTotalPages(Math.ceil(allVideos.saved_list.length / 60));
          }
        }
      }
    }
    catch (error) {
      console.error('Error fetching data:', error);
    }
    finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [pathName, address]);

  const visibleResults = dataVideos;

  async function deleteThis(e) {
    if(address) {
    const response = await fetch(`${savedVideosUrl}?action=delete&user=${address}&platform=${e.platform}&video_id=${e.video_id}&image_url=${e.image_url}`);
      const data = await response.json();
      if(data.success === true) {
        fetchData();
      }
    };
  }
  
  return (
    <>
      <section>
        <div className="page-body full">
          <div className="content-container">
            <div className="heading">
              {isNotFound ? (<><h1>Not Found</h1><h2 className="uid">Decentralized Streaming Videos</h2></>):(
                <>
                <h1>{`Saved List ${videoData.username ? '| ' + videoData.username : ''}`}</h1>
                <h2 className="uid">{`${isNotFound ? 'Not Found' : 'Your Saved Videos'}`}</h2>
                </>
              )}
            </div>
            <VideoThumbnail deleteThis={deleteThis} address={address} isNotFound={isNotFound} isLoading={isLoading} onChangeCurrentPage={handleChangeCurrentPage} onChangeIsReload={handleChangeIsReload} isReload={isReload} visibleResults={visibleResults} videoData={videoData} platform={'savedlist'} currentPage={currentPage} totalPages={totalPages} handleChangeIsReload={handleChangeIsReload} />
          </div>
        </div>
      </section>
    </>
  );
};
