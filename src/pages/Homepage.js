import React, { useState, useEffect, useRef } from 'react';
import FetchMore from '../components/FetchMore';
import HomeThumbnail from '../components/HomeThumbnail';

export default function Homepage ({ clientIp }) {
  
  /**********************************************************************************************************************
  For Redtube, Amateur, Babestation CORS will be error if directly request from client browser,
  so you must use you mine backend server for fetch API from them then return to your client browser.
  
  Some Video API endpoint here is purely public that everyone can get and access without register like
  API from Redtube and Eporner. Stripchat you can get after register as Webmaster not User but
  actually the API endpoint  url not parameters for authentication so you can use API endpoint same as on this page.
  Chaturbate and Cam4  require  you to register as Partner or Webmaster for get the key.
  For Dreamcam, Camsoda, Babestation, Amateur and Eplay i don't see link for register as Webmaster or partner
  so the enpoint for that is the result I searched for manually myself. I don't know how long this endpoint can be used.
  
  Spesifically for Compilations it's your mine video from a video streaming service that serve big storage space
  for upload a video for free so it's your choice. You can use doodstream, filemoon, streamwish, vidhide, streamtape,
  vtube and many more, use can use that directly with their API url or hide that behind your backend because the API key
  will be exposed if you directly use that on client side.
  
  For user comment and saved videos you also must have your mine backend for database.
  
  For API Endpoint that can't directly from browser cause CORS and should use backend for fetching, you can use enpoint
  same as on this page for development only on localhost:3000, it can't accessed outside that also from other domain.
  
  ************************************************************************************************************************/
  
  
  
  const backendVideosUrl = process.env.REACT_APP_BACKEND_VIDEO_ENDPOINT;
  const chaturbateUrl = process.env.REACT_APP_CHATURBATE_VIDEO_ENDPOINT;

  //**************************************** All State ****************************************//
  const [comVideos, setComVideos] = useState([]);
  const [epVideos, setEpVideos] = useState([]);
  const [ctVideos, setCtVideos] = useState([]);
  const [stVideos, setStVideos] = useState([]);
  const [caVideos, setCaVideos] = useState([]);
  const [csVideos, setCsVideos] = useState([]);
  const [drVideos, setDrVideos] = useState([]);
  const [eplVideos, setEplVideos] = useState([]);
  const [amVideos, setAmVideos] = useState([]);
  const [rtVideos, setRtVideos] = useState([]);
  const [bsVideos, setBsVideos] = useState([]);
  const [xlVideos, setXlVideos] = useState([]);
  const [bcVideos, setBcVideos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingRedtube, setLoadingRedtube] = useState(false);
  const [loadingCamsoda, setLoadingCamsoda] = useState(false);
  const [loadingAmateur, setLoadingAmateur] = useState(false);
  const [loadingDreamcam, setLoadingDreamcam] = useState(false);
  const [loadingEplay, setLoadingEplay] = useState(false);
  const [loadingXlovecam, setLoadingXlovecam] = useState(false);
  const [loadingBongacams, setLoadingBongacams] = useState(false);
  const [loadingBabestation, setLoadingBabestation] = useState(false);
  const [isEnd, setIsEnd] = useState(false);
  const abortControllerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loadMore, setLoadMore] = useState(false);
  
  //**************************************** End Of All State ****************************************//



  // Set state form loading animation at homepage on load more button trigger. This state trigger from VideoThumbnail page component
  function setHomeLoading(e) {    
    if(e === 'redtube') {
      setLoadingRedtube(false);
    }
    else if(e === 'amateur') {
      setLoadingAmateur(false);
    }
    else if(e === 'camsoda') {
      setLoadingCamsoda(false);
    }
    else if(e === 'dreamcam') {
      setLoadingDreamcam(false);
    }
    else if(e === 'babestation') {
      setLoadingBabestation(false);
    }
    else if(e === 'eplay') {
      setLoadingEplay(false);
    }
    else if(e === 'xlovecam') {
      setLoadingXlovecam(false);
    }
    else if(e === 'bongacams') {
      setLoadingBongacams(false);
    }
    
    setTimeout(() => {
      window.scrollTo({top: document.body.scrollHeight, behavior: 'smooth'});
    }, 500)
  }
  
  
  
  //**************************************** All Fetched Video Data ****************************************//
  
  // Fetch data from API according url path. The source of all data is inside and start from this function
  const fetchData = async () => {
    const abortController = new AbortController();
    abortControllerRef.current = abortController;
    try {
      const results = await Promise.all(apiUrls.map((url) => fetchUrlList(url)));
      const successfulResponses = results.filter((data) => data !== null);
      successfulResponses.map((sourceUrl) => {
        
        // compilations
        if(sourceUrl.compilations) {
          setComVideos(sourceUrl.compilations.result.files);
        }
        // eporner
        else if(sourceUrl.videos) {
          setEpVideos(sourceUrl.videos);
        }
        // chaturbate
        else if(sourceUrl.results) {
          setCtVideos(sourceUrl.results);
        }
        // stripchat
        else if(sourceUrl.models) {
          setStVideos(sourceUrl.models);
        }
        // cam4
        else if(sourceUrl.length) {
          setCaVideos(sourceUrl);
        }
      });
    } catch (error) {
      console.error('Error fetching data:', error);
      return;
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (clientIp) {
      fetchData();
    }
  }, [clientIp]);
  
  // API list than will fetched on trigger load more button at homepage, this will fetch one by one sequentially
  const moreApiUrls = [
    `${backendVideosUrl}/redtube?limit=6`,
    'https://www.camsoda.com/api/v1/browse/react?&p=1&gender-hide=m,t&perPage=6',
    `${backendVideosUrl}/amateur?limit=6`,
    'https://bss.dreamcamtrue.com/api/clients/v1/broadcasts?partnerId=dreamcam_oauth2&limit=6&offset=0&show-offline=false&tag-categories=girls&stream-types=video2D,video3D&include-tags=false&include-tip-menu=false',
    `https://search-cf.eplay.com/channels?size=6&from=0&fieldsactivityTags,avatar,channelId,displayName,gameTags,id,jpeg,keyclub,live,manifest,offline,previews,ss,ssTime,username,vipGame,nudity`,
    `${backendVideosUrl}/xlovecam?limit=6`,
    `${backendVideosUrl}/bongacams?limit=6`,
    `${backendVideosUrl}/babestation?limit=6`,
  ];
  
  // Fetch next API video function, condition check based url
  const fetchNextAPI = async () => {
    let more;
    if (currentIndex < moreApiUrls.length) {
      const apiUrl = moreApiUrls[currentIndex];
      switch (apiUrl) {
        
        // redtube
        case `${backendVideosUrl}/redtube?limit=6`:
          setLoadingRedtube(true);
        break;
        
        // camsoda
        case 'https://www.camsoda.com/api/v1/browse/react?&p=1&gender-hide=m,t&perPage=6':
          setLoadingCamsoda(true);
        break;
        
        // amateur
        case `${backendVideosUrl}/amateur?limit=6`:
          setLoadingAmateur(true);
        break;
        
        // dreamcam
        case 'https://bss.dreamcamtrue.com/api/clients/v1/broadcasts?partnerId=dreamcam_oauth2&limit=6&offset=0&show-offline=false&tag-categories=girls&stream-types=video2D,video3D&include-tags=false&include-tip-menu=false':
          setLoadingDreamcam(true);
        break;
        
        // eplay
        case `https://search-cf.eplay.com/channels?size=6&from=0&fieldsactivityTags,avatar,channelId,displayName,gameTags,id,jpeg,keyclub,live,manifest,offline,previews,ss,ssTime,username,vipGame,nudity`:
          setLoadingEplay(true);
        break;
        
        // xlovecam
        case `${backendVideosUrl}/xlovecam?limit=6`:
          setLoadingXlovecam(true);
        break;
        
        // bongacams
        case `${backendVideosUrl}/bongacams?limit=6`:
          setLoadingBongacams(true);
        break;
        
        // babestation
        case `${backendVideosUrl}/babestation?limit=6`:
          setLoadingBabestation(true);
        break;
        
        default:
        break;
      }
      try {
        const data = await FetchMore(apiUrl);
        setCurrentIndex(currentIndex + 1);
        more = data;
        if(data) {
          switch (apiUrl) {
            
            // redtube
            case `${backendVideosUrl}/redtube?limit=6`:
              setRtVideos(data.redtube);
            break;
            
            // camsoda
            case 'https://www.camsoda.com/api/v1/browse/react?&p=1&gender-hide=m,t&perPage=6':
              setCsVideos(data.userList);
            break;
            
            // amateur
            case `${backendVideosUrl}/amateur?limit=6`:
              setAmVideos(data.amateur);
            break;
            
            // dreamcam
            case 'https://bss.dreamcamtrue.com/api/clients/v1/broadcasts?partnerId=dreamcam_oauth2&limit=6&offset=0&show-offline=false&tag-categories=girls&stream-types=video2D,video3D&include-tags=false&include-tip-menu=false':
              setDrVideos(data.pageItems);
            break;
            
            // eplay
            case `https://search-cf.eplay.com/channels?size=6&from=0&fieldsactivityTags,avatar,channelId,displayName,gameTags,id,jpeg,keyclub,live,manifest,offline,previews,ss,ssTime,username,vipGame,nudity`:
              setEplVideos(data.results);
            break;

            // xlovecam
            case `${backendVideosUrl}/xlovecam?limit=6`:
              setXlVideos(data.xlovecam);
            break;

            // bongacams
            case `${backendVideosUrl}/bongacams?limit=6`:
              setBcVideos(data.bongacams);
            break;
            
            // babe station
            case `${backendVideosUrl}/babestation?limit=6`:
              setBsVideos(data.babestation);
            break;
            
            default:
            break;
          }
        }
        setCurrentIndex(currentIndex + 1);
      }
      catch (error) {
        switch (apiUrl) {
          
          // redtube
          case `${backendVideosUrl}/redtube?limit=6`:
            setLoadingRedtube(false);
            setRtVideos([]);
          break;
          
          // camsoda
          case 'https://www.camsoda.com/api/v1/browse/react?&p=1&gender-hide=m,t&perPage=6':
            setLoadingCamsoda(false);
            setCsVideos([]);
          break;
          
          // amateur
          case `${backendVideosUrl}/amateur?limit=6`:
            setLoadingAmateur(false);
            setAmVideos([]);
          break;
          
          // dreamcam
          case 'https://bss.dreamcamtrue.com/api/clients/v1/broadcasts?partnerId=dreamcam_oauth2&limit=6&offset=0&show-offline=false&tag-categories=girls&stream-types=video2D,video3D&include-tags=false&include-tip-menu=false':
            setLoadingDreamcam(false);
            setDrVideos([]);
          break;
          
          // eplay
          case `https://search-cf.eplay.com/channels?size=6&from=0&fieldsactivityTags,avatar,channelId,displayName,gameTags,id,jpeg,keyclub,live,manifest,offline,previews,ss,ssTime,username,vipGame,nudity`:
            setLoadingEplay(false);
            setEplVideos([]);
          break;

          // xlovecam
          case `${backendVideosUrl}/xlovecam?limit=6`:
            setLoadingXlovecam(false);
            setXlVideos([]);
          break;

          // bongacams
          case `${backendVideosUrl}/bongacams?limit=6`:
            setLoadingBongacams(false);
            setBcVideos([]);
          break;
          
          // babe station
          case `${backendVideosUrl}/babestation?limit=6`:
            setLoadingBabestation(false);
            setBsVideos([]);
          break;
          
          default:
          break;
        }
        setCurrentIndex(currentIndex + 1);
        console.error('Error load more data:', error);
      }
    }
    else {
      console.log('All APIs fetched.');
    }
    return more;
  };

  // Executed fetch next api that trigger by load more button at homepage
  useEffect(() => {
    if (loadMore) {
      fetchNextAPI();
      setLoadMore(false);
    }
    if(currentIndex === moreApiUrls.length - 1) {
      setIsEnd(true);
    }
    else {
      setIsEnd(false);
    }
  }, [loadMore])
  
  // Set state for loadmore
  const handleMore = async () => {
    setLoadMore(true);
  }
  
  // The list of API url that will executed first on page load at homepage
  const apiUrls = [
    `${backendVideosUrl}/compilations?limit=6`,
    'https://www.eporner.com/api/v2/video/search/?per_page=6',
    `${chaturbateUrl}/?wm=55xr9&limit=6&client_ip=${clientIp}`,
    'https://go.xlirdr.com/api/models?limit=6&isNew=1',
    'https://api.pinklabel.com/api/v1/cams/online.json?aff_id=64ad0d76c17c866d6c664c50&prog=rs&limit=6'
  ];

  // Executed fetch 4 API for homepage
  const fetchUrlList = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) {
      throw new Error(`Failed to fetch data from ${url}`);
    }
      return response.json();
    }
    catch (error) {
      console.error(error);
      return null;
    }
  }
  
  //**************************************** End Of All Fetched Video Data ****************************************//



  return (
    <>
      <section>
        <div className="page-body full">
          <div className="content-container">
            <div className="heading">
              <h1>All Source On The One Place</h1>
              <h2 className="uid">Decentralized Streaming Videos</h2>
            </div>
            {isLoading ? (
              <div className="loading-animation">
              <div className="loading-spinner"></div>
              </div>
            ):(
              <>
              <HomeThumbnail isEnd={isEnd} handleMore={handleMore} setHomeLoading={setHomeLoading} loadingBongacams={loadingBongacams} loadingXlovecam={loadingXlovecam} loadingRedtube={loadingRedtube} loadingCamsoda={loadingCamsoda} loadingAmateur={loadingAmateur} loadingDreamcam={loadingDreamcam} loadingEplay={loadingEplay} loadingBabestation={loadingBabestation} isLoading={isLoading} bcVideos={bcVideos} xlVideos={xlVideos} rtVideos={rtVideos} csVideos={csVideos} amVideos={amVideos} drVideos={drVideos} eplVideos={eplVideos} bsVideos={bsVideos} comVideos={comVideos} stVideos={stVideos} caVideos={caVideos} ctVideos={ctVideos} epVideos={epVideos} />
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};
