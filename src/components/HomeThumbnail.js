import React, { useState, useEffect } from 'react';
import { Link  } from 'react-router-dom';
import Image from './Image';

export default function HomeThumbnail ({ isEnd, handleMore, bcVideos, comVideos, ctVideos, stVideos, caVideos, epVideos, setHomeLoading, isLoading, xlVideos, rtVideos, csVideos, amVideos, drVideos, eplVideos, bsVideos, loadingRedtube, loadingCamsoda, loadingEplay, loadingBabestation, loadingDreamcam, loadingAmateur, loadingXlovecam, loadingBongacams }) {
  
  const [videoThumb, setVideoThumb] = useState('');
  const [redtubeThumb, setRedtubeThumb] = useState('');
  const [eplayThumb, setEplayThumb] = useState('');
  const [camsodaThumb, setCamsodaThumb] = useState('');
  const [amateurThumb, setAmateurThumb] = useState('');
  const [babestationThumb, setBabestationThumb] = useState('');
  const [dreamcamThumb, setDreamcamThumb] = useState('');
  const [xlovecamThumb, setXlovecamThumb] = useState('');
  const [bongacamsThumb, setBongacamsThumb] = useState('');
  
  function handleHomeLoading(e) {
    setHomeLoading(e);
  }

  function onChangeHandleMore() {
    handleMore();
  }
  
  // The main div element for all video thumbnail also for upload url path
  useEffect(() => {
    setVideoThumb(
      <>
      
      {/* compilations */}
      <div className="category">
        <div className="heading">
          <h3>Compilations</h3>
          <h4>
            <Link to="/compilations/" id="compilations" name="Compilations">
              View all<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 -900 960 960" width="24"><path d="m517.847-480-184-184L376-706.153 602.153-480 376-253.847 333.847-296l184-184Z"/></svg>
            </Link>
          </h4>
        </div>
        <div className="scrolling-home">
        {comVideos.map((item) => (
          <div key={item.file_code} style={{textAlign: "left"}} className="thumb">
            <Link to={`/compilations/${item.file_code}/`} >
              <Image
                imgKey={item.file_code}
                src={`https://videothumbs.me/${item.file_code}_xt.jpg`}
                getFallbackSrc={() => [
                  `https://videothumbs.me/${item.file_code}_t.jpg`,
                  `/assets/no-image.webp`,
                ]}
                alt={item.file_code}
                title={item.file_code}
                width="214"
                height="142"
              />
              <span className="thumb-title">
                <span className="wrap">{item.file_code}</span>
                <span style={{display: "flex"}}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 12">
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                  </svg>&nbsp;{item.views}
                </span>
              </span>
            </Link>
          </div>
        ))}
        </div>
      </div>
      
      {/* eporner */}
      <div className="category">
        <div className="heading">
          <h3>Eporner</h3>
          <h4>
            <Link to="/eporner/" id="eporner" name="Eporner">
              View all<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 -900 960 960" width="24"><path d="m517.847-480-184-184L376-706.153 602.153-480 376-253.847 333.847-296l184-184Z"/></svg>
            </Link>
          </h4>
        </div>
        <div className="scrolling-home">
        {epVideos.map((item) => (
          <div key={item.id} className="thumb" style={{textAlign: "left"}}>
            <Link to={`/eporner/${item.id}/`}>
              <Image
                imgKey={item.id}
                src={item.default_thumb.src}
                getFallbackSrc={() => [
                  `/assets/no-image.webp`,
                ]}
                alt={item.title}
                title={item.title}
                width="214"
                height="142"
              />
              <span className="thumb-title">
                <span className="wrap">{item.title}</span>
                <span style={{display: "flex"}}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 12">
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                  </svg>&nbsp;{item.views}
                </span>
              </span>
            </Link>
          </div>
        ))}
        </div>
      </div>
      
      {/* chaturbate */}
      <div className="category">
        <div className="heading">
          <h3>Chaturbate</h3>
          <h4>
            <Link to="/chaturbate/" id="chaturbate" name="Chaturbate">
              View all<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 -900 960 960" width="24"><path d="m517.847-480-184-184L376-706.153 602.153-480 376-253.847 333.847-296l184-184Z"/></svg>
            </Link>
          </h4>
        </div>
        <div className="scrolling-home">
        {ctVideos.map((item) => (
          <div key={item.username} style={{textAlign: "left"}} className="thumb">
            <Link to={`/chaturbate/${item.username}/`}>
              <Image
                imgKey={item.username}
                src={item.image_url}
                getFallbackSrc={() => [
                  `/assets/no-image.webp`,
                ]}
                alt={item.username}
                title={item.username}
                width="214"
                height="142"
              />
              <span className="thumb-title">
                <span>{item.username}</span>
                <span>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                  </svg>&nbsp;{item.num_users}
                </span>
              </span>
            </Link>
          </div>
        ))}
        </div>
      </div>
      
      {/* stripchat */}
      <div className="category">
        <div className="heading">
          <h3>Stripchat</h3>
          <h4>
            <Link to="/stripchat/" id="stripchat" name="Stripchat">
              View all<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 -900 960 960" width="24"><path d="m517.847-480-184-184L376-706.153 602.153-480 376-253.847 333.847-296l184-184Z"/></svg>
            </Link>
          </h4>
        </div>
        <div className="scrolling-home">
        {stVideos.map((item) => (
          <div key={item.id} style={{textAlign: "left"}} className="thumb">
            <Link to={`/stripchat/${item.username}/`}>
              <Image
                imgKey={item.username}
                src={item.snapshotUrl}
                getFallbackSrc={() => [
                  `/assets/no-image.webp`,
                ]}
                alt={item.username}
                title={item.username}
                width="214"
                height="142"
              />
              <span className="thumb-title">
                <span className="wrap">{item.username}</span>
                <span style={{display: "flex"}}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 12">
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                  </svg>&nbsp;{item.viewersCount}
                </span>
              </span>
            </Link>
          </div>
        ))}
        </div>
      </div>
      
      {/* cam4 */}
      <div className="category">
        <div className="heading">
          <h3>Cam4</h3>
          <h4>
            <Link to="/cam4/" id="cam4" name="Cam4">
              View all<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 -900 960 960" width="24"><path d="m517.847-480-184-184L376-706.153 602.153-480 376-253.847 333.847-296l184-184Z"/></svg>
            </Link>
          </h4>
        </div>
        <div className="scrolling-home">
        {caVideos.map((item) => (
          <div key={item.nickname} style={{textAlign: "left"}} className="thumb">
            <Link to={`/cam4/${item.nickname}/`}>
              <Image
                imgKey={item.nickname}
                src={item.thumb}
                getFallbackSrc={() => [
                  `/assets/no-image.webp`,
                ]}
                alt={item.nickname}
                title={item.nickname}
                width="214"
                height="142"
              />
              <span className="thumb-title">
                <span className="wrap">{item.nickname}</span>
                <span style={{display: "flex"}}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 12">
                    <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                    <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                  </svg>&nbsp;{item.viewers}
                </span>
              </span>
            </Link>
          </div>
        ))}
        </div>
      </div>
      </>
    )
    if(rtVideos.length > 0) {
      setRedtubeThumb(
        <div className="category">
          <div className="heading">
            <h3>Redtube</h3>
            <h4>
              <Link to="/redtube/" id="redtube" name="Redtube">
                View all<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 -900 960 960" width="24"><path d="m517.847-480-184-184L376-706.153 602.153-480 376-253.847 333.847-296l184-184Z"/></svg>
              </Link>
            </h4>
          </div>
          <div className="scrolling-home">
          {rtVideos.map((item) => (
            <div key={item.video_id} className="thumb" style={{textAlign: "left"}}>
              <Link to={`/redtube/${item.video_id}/`}>
                <Image
                  imgKey={item.video_id}
                  src={item.thumb}
                  getFallbackSrc={() => [
                    `/assets/no-image.webp`,
                  ]}
                  alt={item.title}
                  title={item.title}
                  width="214"
                  height="142"
                />
                <span className="thumb-title">
                  <span className="wrap">{item.title}</span>
                  <span style={{display: "flex"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 12">
                      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                    </svg>&nbsp;{item.views}
                  </span>
                </span>
              </Link>
            </div>
          ))}
          </div>
        </div>
      )
      handleHomeLoading('redtube');;
    }
    if(csVideos.length > 0) {
      setCamsodaThumb(
        <div className="category">
          <div className="heading">
            <h3>Camsoda</h3>
            <h4>
              <Link to="/camsoda/" id="camsoda" name="Camsoda">
                View all<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 -900 960 960" width="24"><path d="m517.847-480-184-184L376-706.153 602.153-480 376-253.847 333.847-296l184-184Z"/></svg>
              </Link>
            </h4>
          </div>
          <div className="scrolling-home">
          {csVideos.map((item) => (
            <div key={item.id} style={{textAlign: "left"}} className="thumb">
              <Link to={`/camsoda/${item.username}/`}>
                <Image
                  imgKey={item.username}
                  src={item.thumbUrl}
                  getFallbackSrc={() => [
                    `/assets/no-image.webp`,
                  ]}
                  alt={item.username}
                  title={item.username}
                  width="214"
                  height="142"
                />
                <span className="thumb-title">
                  <span className="wrap">{item.username}</span>
                  <span style={{display: "flex"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 12">
                      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                    </svg>&nbsp;{item.connectionCount}
                  </span>
                </span>
              </Link>
            </div>
          ))}
          </div>
        </div>
      )
      handleHomeLoading('camsoda');;
    }
    if(amVideos.length > 0) {
      const replaceImg = 'capture';
      setAmateurThumb(
        <div className="category">
          <div className="heading">
            <h3>Amateur</h3>
            <h4>
              <Link to="/amateur/" id="amateur" name="Amateur">
                View all<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 -900 960 960" width="24"><path d="m517.847-480-184-184L376-706.153 602.153-480 376-253.847 333.847-296l184-184Z"/></svg>
              </Link>
            </h4>
          </div>
          <div className="scrolling-home">
          {amVideos.map((item) => {
            const parts = item.capture.split('/');
            parts[4] = replaceImg;
            const unblured = parts.join('/');
            return (
            <div key={item.id} className="thumb" style={{textAlign: "left"}}>
              <Link to={`/amateur/${item.username}/`}>
                <Image
                  imgKey={item.username}
                  src={unblured}
                  getFallbackSrc={() => [
                    `/assets/no-image.webp`,
                  ]}
                  alt={item.username}
                  title={item.username}
                  width="214"
                  height="142"
                />
                <span className="thumb-title">
                  <span className="wrap">{item.username}</span>
                  <span style={{display: "flex"}}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 12">
                      <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                      <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                    </svg>&nbsp;{item.viewers}
                  </span>
                </span>
              </Link>
            </div>
            )
          })}
          </div>
        </div>
      )
      handleHomeLoading('amateur');;
    }
    if(drVideos.length > 0) {
      setDreamcamThumb(
        <div className="category">
          <div className="heading">
            <h3>Dreamcam</h3>
            <h4>
              <Link to="/dreamcam/" id="dreamcam" name="dreamcam">
                View all<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 -900 960 960" width="24"><path d="m517.847-480-184-184L376-706.153 602.153-480 376-253.847 333.847-296l184-184Z"/></svg>
              </Link>
            </h4>
          </div>
          <div className="scrolling-home">
          {drVideos.map((item) => (
            <div key={item.modelNickname} style={{textAlign: "left"}} className="thumb">
              <Link to={`/dreamcam/${item.modelNickname}/`}>
                <Image
                  imgKey={item.modelNickname}
                  src={item.modelProfilePhotoUrl}
                  getFallbackSrc={() => [
                    `/assets/no-image.webp`,
                  ]}
                  alt={item.modelNickname}
                  title={item.modelNickname}
                  width="214"
                  height="142"
                />
                <span className="thumb-title">{item.modelNickname}</span>
              </Link>
            </div>
          ))}
          </div>
        </div>
      )
      handleHomeLoading('dreamcam');
    }
    if(eplVideos.length > 0) {
      setEplayThumb(
        <div className="category">
          <div className="heading">
            <h3>Eplay</h3>
            <h4>
              <Link to="/eplay/" id="eplay" name="eplay">
                View all<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 -900 960 960" width="24"><path d="m517.847-480-184-184L376-706.153 602.153-480 376-253.847 333.847-296l184-184Z"/></svg>
              </Link>
            </h4>
          </div>
          <div className="scrolling-home">
          {eplVideos.map((item) => (
            <div key={item.id} style={{textAlign: "left"}} className="thumb">
              <Link to={`/eplay/${item.username}/`}>
                <Image
                  imgKey={item.username}
                  src={item.ss}
                  getFallbackSrc={() => [
                    `/assets/no-image.webp`,
                  ]}
                  alt={item.username}
                  title={item.username}
                  width="214"
                  height="142"
                />
                <span className="thumb-title">{item.username}</span>
              </Link>
            </div>
          ))}
          </div>
        </div>
      )
      handleHomeLoading('eplay');
    }
    if(xlVideos.length > 0) {
      setXlovecamThumb(
        <div className="category">
          <div className="heading">
            <h3>Xlovecam</h3>
            <h4>
              <Link to="/xlovecam/" id="xlovecam" name="xlovecam">
                View all<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 -900 960 960" width="24"><path d="m517.847-480-184-184L376-706.153 602.153-480 376-253.847 333.847-296l184-184Z"/></svg>
              </Link>
            </h4>
          </div>
          <div className="scrolling-home">
          {xlVideos.map((item) => (
            <div key={item.id} style={{textAlign: "left"}} className="thumb">
              <Link to={`/xlovecam/${item.name}/`}>
                <Image
                  imgKey={item.name}
                  src={`https:${item.imgLive}`}
                  getFallbackSrc={() => [
                    `/assets/no-image.webp`,
                  ]}
                  alt={item.name}
                  title={item.name}
                  width="214"
                  height="142"
                />
                <span className="thumb-title">{item.name}</span>
              </Link>
            </div>
          ))}
          </div>
        </div>
      )
      handleHomeLoading('xlovecam');
    }
    if(bcVideos.length > 0) {
      setBongacamsThumb(
        <div className="category">
          <div className="heading">
            <h3>Bongacams</h3>
            <h4>
              <Link to="/bongacams/" id="bongacams" name="bongacams">
                View all<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 -900 960 960" width="24"><path d="m517.847-480-184-184L376-706.153 602.153-480 376-253.847 333.847-296l184-184Z"/></svg>
              </Link>
            </h4>
          </div>
          <div className="scrolling-home">
          {bcVideos.map((item) => {
            let imgUrl = item.thumb_image;
            imgUrl = `https:${imgUrl}`
              .replace("{ext}", "jpg");
            return (
              <div key={item.username} style={{textAlign: "left"}} className="thumb">
                <Link to={`/bongacams/${item.username}/`}>
                  <Image
                    imgKey={item.username}
                    src={imgUrl}
                    getFallbackSrc={() => [
                      `/assets/no-image.webp`,
                    ]}
                    alt={item.username}
                    title={item.username}
                    width="214"
                    height="142"
                  />
                  <span className="thumb-title">
                    <span className="wrap">{item.username}</span>
                    <span style={{display: "flex"}}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 12">
                        <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z"/>
                        <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8zm8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z"/>
                      </svg>&nbsp;{item.viewers}
                    </span>
                  </span>
                </Link>
              </div>
            );
          })}
          </div>
        </div>
      )
      handleHomeLoading('bongacams');
    }
    if(bsVideos.length > 0) {
      setBabestationThumb(
        <div className="category">
          <div className="heading">
            <h3>Babe Station</h3>
            <h4>
              <Link to="/babestation/" id="babestation" name="Babe Station">
                View all<svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" height="24" viewBox="0 -900 960 960" width="24"><path d="m517.847-480-184-184L376-706.153 602.153-480 376-253.847 333.847-296l184-184Z"/></svg>
              </Link>
            </h4>
          </div>
          <div className="scrolling-home">
          {bsVideos.map((item) => (
            <div key={item.PerformerId} style={{textAlign: "left"}} className="thumb">
              <Link to={`/babestation/${item.Nickname}/`}>
                <Image
                  imgKey={item.Nickname}
                  src={item.Thumbnail}
                  getFallbackSrc={() => [
                    `/assets/no-image.webp`,
                  ]}
                  alt={item.Nickname}
                  title={item.Nickname}
                  width="214"
                  height="142"
                />
                <span className="thumb-title">{item.Nickname}</span>
              </Link>
            </div>
          ))}
          </div>
        </div>
      )
      handleHomeLoading('babestation');
    }
  }, [isLoading, bcVideos, xlVideos, rtVideos, csVideos, amVideos, drVideos, eplVideos, bsVideos]);
  
  return (
    <>
      <div id="video-thumb">
        {videoThumb}
        {loadingRedtube ? (<div className="loading-animation" style={{height: "auto"}}><div className="loading-spinner"></div></div>) : (redtubeThumb)}
        {loadingCamsoda ? (<div className="loading-animation" style={{height: "auto"}}><div className="loading-spinner"></div></div>) : (camsodaThumb)}
        {loadingAmateur ? (<div className="loading-animation" style={{height: "auto"}}><div className="loading-spinner"></div></div>) : (amateurThumb)}
        {loadingDreamcam ? (<div className="loading-animation" style={{height: "auto"}}><div className="loading-spinner"></div></div>) : (dreamcamThumb)}
        {loadingEplay ? (<div className="loading-animation" style={{height: "auto"}}><div className="loading-spinner"></div></div>) : (eplayThumb)}
        {loadingXlovecam ? (<div className="loading-animation" style={{height: "auto"}}><div className="loading-spinner"></div></div>) : (xlovecamThumb)}
        {loadingBongacams ? (<div className="loading-animation" style={{height: "auto"}}><div className="loading-spinner"></div></div>) : (bongacamsThumb)}
        {loadingBabestation ? (<div className="loading-animation" style={{height: "auto", marginBottom: "3rem"}}><div className="loading-spinner"></div></div>) : (babestationThumb)}
      </div>
      {!isEnd && videoThumb && <div className="more-btn"><button name="more" className="type-bg" onClick={onChangeHandleMore}>Load more</button></div>}
    </>
  );
};
