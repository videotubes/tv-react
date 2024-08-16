import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { ThirdwebProvider, useAddress } from "@thirdweb-dev/react";
import {
	metamaskWallet,
	coinbaseWallet,
	walletConnect,
	trustWallet,
	rainbowWallet,
} from "@thirdweb-dev/react";
import './styles/bootstrap.css';
import './styles/global.css';
import TrailingSlashEnforcer from './components/TrailingSlashEnforcer';
import InstallPWA from './components/InstallPWA';
import Navbar from './components/Navbar';
import Home from './components/pages/Homepage';
import Compilations from './components/pages/Compilations';
import Camsoda from './components/pages/Camsoda';
import Dreamcam from './components/pages/Dreamcam';
import Cam4 from './components/pages/Cam4';
import Chaturbate from './components/pages/Chaturbate';
import Stripchat from './components/pages/Stripchat';
import Eplay from './components/pages/Eplay';
import Amateur from './components/pages/Amateur';
import Babestation from './components/pages/Babestation';
import Eporner from './components/pages/Eporner';
import Redtube from './components/pages/Redtube';
import SavedList from './components/pages/SavedList';
import NotFoundPage from './components/404';

const activeChain = 'ethereum';

function App() {
	
	// Set theme dark/light trigger by button, the setting saved at localStorage
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const storedMode = localStorage.getItem('darkMode');
      return storedMode === 'true';
    } else {
      return false;
    }
  });

	// State dark/light mode that trigger from Navbar page component
	const handleDarkModeChange = (event) => {
		const isChecked = event.target.checked;
		setDarkMode(isChecked);
	};

	// Load previous selected theme on page load
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('darkMode', darkMode.toString());
    }
  }, [darkMode]);

	//**************************************** End Of Handle Theme Dark/Light Mode ****************************************//
	
	const clientId = 'ce9156bf65a4cafc9f557c9f4b943c02';
	
	
  return (
    <Router>
			<ThirdwebProvider
				activeChain={activeChain}
				clientId={clientId}
				supportedWallets={[
					metamaskWallet({ recommended: true }),
					coinbaseWallet(),
					walletConnect(),
					trustWallet(),
					rainbowWallet(),
				]}
				>
				<InstallPWA />
				<Navbar handleDarkModeChange={handleDarkModeChange} darkMode={darkMode} />
				<main className={darkMode ? 'dark-mode' : 'light-mode'}>
					<TrailingSlashEnforcer>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/compilations" element={<Compilations userAddress={useAddress} />} />
							<Route path="/compilations/:id" element={<Compilations userAddress={useAddress} />} />
							
							<Route path="/camsoda" element={<Camsoda userAddress={useAddress} />} />
							<Route path="/camsoda/:id" element={<Camsoda userAddress={useAddress} />} />
							
							<Route path="/dreamcam" element={<Dreamcam userAddress={useAddress} />} />
							<Route path="/dreamcam/:id" element={<Dreamcam userAddress={useAddress} />} />
							
							<Route path="/cam4" element={<Cam4 userAddress={useAddress} />} />
							<Route path="/cam4/:id" element={<Cam4 userAddress={useAddress} />} />
							
							<Route path="/chaturbate" element={<Chaturbate userAddress={useAddress} />} />
							<Route path="/chaturbate/:id" element={<Chaturbate userAddress={useAddress} />} />
							
							<Route path="/stripchat" element={<Stripchat userAddress={useAddress} />} />
							<Route path="/stripchat/:id" element={<Stripchat userAddress={useAddress} />} />
							
							<Route path="/eplay" element={<Eplay userAddress={useAddress} />} />
							<Route path="/eplay/:id" element={<Eplay userAddress={useAddress} />} />
							
							<Route path="/amateur" element={<Amateur userAddress={useAddress} />} />
							<Route path="/amateur/:id" element={<Amateur userAddress={useAddress} />} />
							
							<Route path="/babestation" element={<Babestation userAddress={useAddress} />} />
							<Route path="/babestation/:id" element={<Babestation userAddress={useAddress} />} />
							
							<Route path="/eporner" element={<Eporner userAddress={useAddress} />} />
							<Route path="/eporner/:id" element={<Eporner userAddress={useAddress} />} />
							<Route path="/eporner/:id/:id" element={<Eporner userAddress={useAddress} />} />
							
							<Route path="/redtube" element={<Redtube userAddress={useAddress} />} />
							<Route path="/redtube/:id" element={<Redtube userAddress={useAddress} />} />
							<Route path="/redtube/:id/:id" element={<Redtube userAddress={useAddress} />} />
							
							<Route path="/savedlist" element={<SavedList userAddress={useAddress} />} />
							
							<Route path="*" element={<NotFoundPage />} />
						</Routes>
					</TrailingSlashEnforcer>
				</main>
			</ThirdwebProvider>
    </Router>
  );
}

export default App;
