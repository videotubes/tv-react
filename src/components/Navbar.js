import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import DelayedLink from './DelayedLink';
import { ConnectWallet } from "@thirdweb-dev/react";

// Navigation Bar and Sidebar
export default function Navbar ({ handleDarkModeChange, darkMode }) {
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
		const notice = new Date().getFullYear();
		setCopyright(
			<div className="copyright">
				<div className="wallet-connect">
					<ConnectWallet
						theme={"dark"}
						modalSize={"compact"}
						modalTitleIconUrl={
							"./assets/tubevideos.svg"
						}
						showThirdwebBranding={false}
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
					const navbarMobile = document.querySelector(".sidebar");
					if (navbarMobile.classList.contains("hide-sidebar-mobile")) {
						window.$('.sidebar').removeClass('hide-sidebar-mobile');
						window.$('.sidebar').removeClass('hide-sidebar');
						window.$('section').removeClass('hide-div');
					}
				}
			}
		});
	});

	// Show and hide sidebar menu
	const showMenu = () => {
		window.$('section').toggleClass('hide-div');
		window.$('.sidebar').toggleClass('hide-sidebar');
		window.$('.sidebar').toggleClass('hide-sidebar-mobile');
	};
	
	// Handle screen resize
	const handleResize = () => {
		const hasScrollbar = window.innerWidth > document.documentElement.clientWidth;
		const viewportWidth = hasScrollbar ? window.innerWidth : document.documentElement.clientWidth;

		if(viewportWidth < 500){
			window.$('.nav-btn').appendTo('.type');
			window.$('.nav-btn').css({'margin-top': '13px', 'padding-top': '12px', 'border-top': '1px solid rgb(255 255 255 / 40%)', 'width': '100%'});
			window.$('.nav-btn').addClass('show-btn');
			window.$('.btn-list').css('width', '100%');
			window.$('.form-check').css({'margin-top': '20px'});
			window.$('#saved_list').css({'display': 'unset', 'font-size': 'unset'});
		}
		else {
			const navbarMobile = document.querySelector(".sidebar");
			if (navbarMobile) {
				if (navbarMobile.classList.contains("hide-sidebar-mobile")) {
					window.$('.sidebar').removeClass('hide-sidebar-mobile');
					window.$('.sidebar').removeClass('hide-sidebar');
					window.$('section').removeClass('hide-div');
				}
			}

			window.$('.nav-btn').appendTo('.container');
			window.$('.nav-btn').css({'margin-top': 'unset', 'padding-top': 'unset', 'border-top': 'unset', 'width': 'unset'});
			window.$('.nav-btn').addClass('show-btn');
			window.$('.btn-list').css('width', 'unset');
			window.$('.form-check').css({'margin-top': 'unset'});
			window.$('#saved_list').css({'display': 'flex', 'font-size': '14px'});
		}
		
		const windowHeight = window.innerHeight;
		let windowWidth;
		let windowInnerWidth;
		if(viewportWidth >= 1366) {
			windowWidth = 1366;
			windowInnerWidth = windowWidth - 70;
		}
		else {
			windowWidth = viewportWidth;
			if(viewportWidth <= 500) {
				windowInnerWidth = windowWidth - 30;
			}
			else {
				windowInnerWidth = windowWidth - 250;
			}
		}
		const windowInnerHeight = windowHeight;
		const itemWidth = 200;
		const itemHeigh = 150;
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
		window.$(document).ready(function () {
			setTimeout(function() {
				handleResize();
			}, 100);
		});
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
							<img src="/assets/tubevideos.svg" width="25" height="25"/>
							<strong id="homepage" style={{marginLeft: 5}}>TubeVideos</strong>
						</DelayedLink>
					</div>
				</div>
			</nav>
			<div className="sidebar">
				<div className="type">
					<span><DelayedLink  to="/compilations/" id="compilations" name="Compilations" className={`type-bg ${selectedLinkId === 'compilations' ? 'current' : ''}`} >Compilations</DelayedLink></span>
					<span><DelayedLink  to="/eporner/" id="eporner" name="Eporner" className={`type-bg ${selectedLinkId === 'eporner' ? 'current' : ''}`} >Eporner</DelayedLink></span>
					<span><DelayedLink  to="/chaturbate/" id="chaturbate" name="Chaturbate" className={`type-bg ${selectedLinkId === 'chaturbate' ? 'current' : ''}`} >Chaturbate</DelayedLink></span>
					<span><DelayedLink  to="/stripchat/" id="stripchat" name="Stripchat" className={`type-bg ${selectedLinkId === 'stripchat' ? 'current' : ''}`} >Stripchat</DelayedLink></span>
					<span><DelayedLink  to="/cam4/" id="cam4" name="Cam4" className={`type-bg ${selectedLinkId === 'cam4' ? 'current' : ''}`} >Cam4</DelayedLink></span>
					<span><DelayedLink  to="/redtube/" id="redtube" name="Redtube" className={`type-bg ${selectedLinkId === 'redtube' ? 'current' : ''}`} >Redtube</DelayedLink></span>
					<span><DelayedLink  to="/camsoda/" id="camsoda" name="Camsoda" className={`type-bg ${selectedLinkId === 'camsoda' ? 'current' : ''}`} >Camsoda</DelayedLink></span>
					<span><DelayedLink  to="/amateur/" id="amateur" name="Amateur" className={`type-bg ${selectedLinkId === 'amateur' ? 'current' : ''}`} >Amateur</DelayedLink></span>
					<span><DelayedLink  to="/dreamcam/" id="dreamcam" name="Dreamcam" className={`type-bg ${selectedLinkId === 'dreamcam' ? 'current' : ''}`} >Dreamcam</DelayedLink></span>
					<span><DelayedLink  to="/eplay/" id="eplay" name="Eplay" className={`type-bg ${selectedLinkId === 'eplay' ? 'current' : ''}`} >Eplay</DelayedLink></span>
					<span><DelayedLink  to="/babestation/" id="babestation" name="Babe Station" className={`type-bg ${selectedLinkId === 'babestation' ? 'current' : ''}`} >Babe Station</DelayedLink></span>
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
