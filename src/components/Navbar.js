import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import DelayedLink from './DelayedLink';

// Navigation Bar and Sidebar
export default function Navbar ({ handleDarkModeChange, darkMode, clientId, wallets, ConnectButton, chains }) {
  const location = useLocation();
  const pathName = location.pathname;
  const currentPath = pathName.split('/').filter(Boolean);

  const [selectedLinkId, setSelectedLinkId] = useState(null);
  const [copyright, setCopyright] = useState([]);

  useEffect(() => {
    if(currentPath[0]) {
      setSelectedLinkId(currentPath[0]);
    } else {
      setSelectedLinkId(null);
    }
  }, [currentPath, selectedLinkId]);
  
  useEffect(() => {
    setCopyright(
      <div className="copyright">
        <div className="wallet-connect">
          <ConnectButton
            client={clientId}
            wallets={wallets}
            chains={chains}
            theme="dark"
            connectModal={{ size: "compact", showThirdwebBranding: false, titleIcon: "./assets/tubevideos.svg" }}
            connectButton={{ label: "Connect Wallet" }}
          />
        </div>
        <span className="year">&copy; TubeVideos. {new Date().getFullYear()}</span>
      </div>
    );
  }, []);

  //**************************************** Handle Theme Dark/Light Mode ****************************************//
  

  
  //**************************************** Handle Viewport And Sidebar ****************************************//

  // Detect clicked body on mobile then hide sidebar
  useEffect(() => {
    document.addEventListener("click", function(event) {
      const navbar = document.querySelector(".navbar");
      
      if(!event.target.classList.contains('sidebar') && !navbar.contains(event.target)) {
        const hasScrollbar = window.innerWidth > document.documentElement.clientWidth;
        const viewportWidth = hasScrollbar ? window.innerWidth : document.documentElement.clientWidth;
        
        if(viewportWidth < 500){
          const sections = document.querySelectorAll('section');
          const sidebar = document.querySelector(".sidebar");
          if (sidebar.classList.contains("hide-sidebar-mobile")) {
            sidebar.classList.remove('hide-sidebar-mobile');
            sidebar.classList.remove('hide-sidebar');
            sections.forEach(section => {
              section.classList.remove('hide-div');
            });
          }
        }
      }
    });
  });

  // Show and hide sidebar menu
  const showMenu = () => {
    const sections = document.querySelectorAll('section');
    const sidebar = document.querySelector('.sidebar');
    
    sections.forEach(section => {
      section.classList.toggle('hide-div');
    });
    sidebar.classList.toggle('hide-sidebar');
    sidebar.classList.toggle('hide-sidebar-mobile');
  };
  
  // Handle screen resize
  const handleResize = () => {
    const hasScrollbar = window.innerWidth > document.documentElement.clientWidth;
    const viewportWidth = hasScrollbar ? window.innerWidth : document.documentElement.clientWidth;

    const navBtn = document.querySelector('.nav-btn');
    const btnList = document.querySelector('.btn-list');
    const formCheck = document.querySelector('.form-check');
    const savedList = document.getElementById('saved_list');
    const sidebar = document.querySelector('.sidebar');
    
    if(viewportWidth < 500){
      const typeContainer = document.querySelector('.type');
      
      typeContainer.appendChild(navBtn);
      navBtn.style.marginTop = '13px';
      navBtn.style.paddingTop = '12px';
      navBtn.style.borderTop = '1px solid rgba(255, 255, 255, 0.4)';
      navBtn.style.width = '100%';
      navBtn.classList.add('show-btn');
      btnList.style.width = '100%';
      formCheck.style.marginTop = '20px';
      savedList.style.display = 'unset';
      savedList.style.fontSize = 'unset';
    }
    else {
      if (sidebar && sidebar.classList.contains('hide-sidebar-mobile')) {
        sidebar.classList.remove('hide-sidebar-mobile');
        sidebar.classList.remove('hide-sidebar');
        document.querySelectorAll('section').forEach(section => {
          section.classList.remove('hide-div');
        });
      }
      
      const container = document.querySelector('.container');
      container.appendChild(navBtn);
      navBtn.style.marginTop = 'unset';
      navBtn.style.paddingTop = 'unset';
      navBtn.style.borderTop = 'unset';
      navBtn.style.width = 'unset';
      navBtn.classList.add('show-btn');
      btnList.style.width = 'unset';
      formCheck.style.marginTop = 'unset';
      savedList.style.display = 'flex';
      savedList.style.fontSize = '14px';
    }
  };
    
  // Executed handleResize realtime
  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // handleResize first on page load
  useEffect(() => {
    const timer = setTimeout(() => {
      handleResize();
    }, 100);
    return () => clearTimeout(timer);
  }, []);
  
  //**************************************** End Of Handle Viewport And Sidebar ****************************************//
  
  
  
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-dark" aria-label="Eighth navbar example">
        <div className="container">
          <div className="btn-list">
            <button className="menu-btn" onClick={showMenu}>
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="#fff" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
              </svg>
            </button>
            <DelayedLink  className="navbar-brand" to="/" title="Home" >
              <img src="/assets/tubevideos.svg" width="25" height="25" aria-label="Tubevideos logo" />
              <strong id="homepage" style={{marginLeft: 5}}>TubeVideos</strong>
            </DelayedLink>
          </div>
        </div>
      </nav>
      <div className="sidebar">
        <div className="type">
          <span><DelayedLink to="/compilations/" id="compilations" name="Compilations" className={`type-bg ${selectedLinkId === 'compilations' ? 'current' : ''}`} >Compilations</DelayedLink></span>
          <span><DelayedLink to="/eporner/" id="eporner" name="Eporner" className={`type-bg ${selectedLinkId === 'eporner' ? 'current' : ''}`} >Eporner</DelayedLink></span>
          <span><DelayedLink to="/chaturbate/" id="chaturbate" name="Chaturbate" className={`type-bg ${selectedLinkId === 'chaturbate' ? 'current' : ''}`} >Chaturbate</DelayedLink></span>
          <span><DelayedLink to="/stripchat/" id="stripchat" name="Stripchat" className={`type-bg ${selectedLinkId === 'stripchat' ? 'current' : ''}`} >Stripchat</DelayedLink></span>
          <span><DelayedLink to="/cam4/" id="cam4" name="Cam4" className={`type-bg ${selectedLinkId === 'cam4' ? 'current' : ''}`} >Cam4</DelayedLink></span>
          <span><DelayedLink to="/redtube/" id="redtube" name="Redtube" className={`type-bg ${selectedLinkId === 'redtube' ? 'current' : ''}`} >Redtube</DelayedLink></span>
          <span><DelayedLink to="/camsoda/" id="camsoda" name="Camsoda" className={`type-bg ${selectedLinkId === 'camsoda' ? 'current' : ''}`} >Camsoda</DelayedLink></span>
          <span><DelayedLink to="/amateur/" id="amateur" name="Amateur" className={`type-bg ${selectedLinkId === 'amateur' ? 'current' : ''}`} >Amateur</DelayedLink></span>
          <span><DelayedLink to="/dreamcam/" id="dreamcam" name="Dreamcam" className={`type-bg ${selectedLinkId === 'dreamcam' ? 'current' : ''}`} >Dreamcam</DelayedLink></span>
          <span><DelayedLink to="/eplay/" id="eplay" name="Eplay" className={`type-bg ${selectedLinkId === 'eplay' ? 'current' : ''}`} >Eplay</DelayedLink></span>
          <span><DelayedLink to="/babestation/" id="babestation" name="Babe Station" className={`type-bg ${selectedLinkId === 'babestation' ? 'current' : ''}`} >Babe Station</DelayedLink></span>
          <div className="nav-btn">
            <DelayedLink  to="/savedlist/" id="saved_list" className="type-bg" >Saved List</DelayedLink>
            <div className="form-check form-switch">
              <input className="form-check-input" type="checkbox" checked={darkMode} onChange={handleDarkModeChange} role="switch" id="flexSwitchCheckDefault" />
              <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Dark mode</label>
            </div>
          </div>
        </div>
        {copyright}
      </div>
    </>
  );
};
