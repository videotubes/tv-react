import React, { useState, useEffect } from 'react';
import videojs from "video.js";
import 'video.js/dist/video-js.css';

const NotFoundPage = () => {
  function closePlayer () {
    const playerEl = document.getElementById('show-video');
    const sidebar = document.querySelector('.sidebar');
    const sections = document.querySelectorAll('section');
    
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

  useEffect(() => {
    closePlayer();
  }, []);
  
  return (
    <>
      <section>
        <div className="page-body full">
          <div className="content-container">
            <div className="heading">
              <h1>Not Found</h1>
              <h2 className="uid">Decentralized Streaming Videos</h2>
            </div>
            <div className="notfound-page">
              <img src="/assets/gif-lesbico-sumisa-gimiendo-anime-porn.gif" alt="gif-lesbico-sumisa-gimiendo-anime-porn" width="1024" height="576"/>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default NotFoundPage;
