import React, { useState, useEffect } from 'react';
import UAParser from 'ua-parser-js';

// This component for show div overlay PWA on footer
function InstallPWA() {
	const [showPwa, setShowPwa] = useState(false);
	const [mobilePwa, setMobilePwa] = useState(false);
	
	const handleInstallClick = () => {
		if (window.beforeinstallprompt) {
			const installPrompt = window.beforeinstallprompt;
			installPrompt.prompt();
			installPrompt.userChoice.then((choice) => {
				if (choice.outcome === 'accepted') {
					console.log('PWA installation accepted');
				}
				else {
					console.log('PWA installation declined');
				}
			});
		}
	};
  
	useEffect(() => {
		function isMobileDevice() {
			return 'ontouchstart' in window;
		}

		function handleMobileDeviceChange() {
			if (isMobileDevice()) {
				if (!window.navigator.standalone || !window.matchMedia('(display-mode: standalone)').matches) {
					setMobilePwa(true);
				}
			}
			else {
				const parser = new UAParser();
				const browserName = parser.getBrowser().name.toLowerCase();
				const supportedBrowsers = ['chrome', 'edge'];

					window.addEventListener('beforeinstallprompt', (e) => {
						e.preventDefault();
						window.beforeinstallprompt = e;
						setShowPwa(true);
					});
				setMobilePwa(false);
			}
		}
		handleMobileDeviceChange();
	}, []);

	const closePwa = () => {
		setShowPwa(false);
		setMobilePwa(false);
	}
	
	return (
		<>
		{mobilePwa &&
			<div className="mobile-pwa">
				<div style={{padding: "9px 35px", color: "#fff"}} >For the best user experience we recommended install the TubeVideos app. Click the <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
					<path fillRule="evenodd" d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1h-2z"/>
					<path fillRule="evenodd" d="M7.646.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 1.707V10.5a.5.5 0 0 1-1 0V1.707L5.354 3.854a.5.5 0 1 1-.708-.708l3-3z"/>
					</svg> or <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
						<path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
					</svg> icon then click Add to Home Screen.</div>
			  <div className="pwa-close" onClick={closePwa} />
			</div>
		}
		{showPwa &&
			<div className="pwa-div">
			  <button onClick={handleInstallClick}>Install TubeVideos</button>
			  <div className="pwa-close" onClick={closePwa} />
			</div>
		}
		</>
	);
}

export default InstallPWA;
