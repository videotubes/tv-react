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

import './styles/global.css';
import TrailingSlashEnforcer from './components/TrailingSlashEnforcer';
import InstallPWA from './components/InstallPWA';
import Navbar from './components/Navbar';
import Home from './pages/Homepage';
import Compilations from './pages/Compilations';
import Camsoda from './pages/Camsoda';
import Dreamcam from './pages/Dreamcam';
import Cam4 from './pages/Cam4';
import Chaturbate from './pages/Chaturbate';
import Stripchat from './pages/Stripchat';
import Eplay from './pages/Eplay';
import Amateur from './pages/Amateur';
import Babestation from './pages/Babestation';
import Eporner from './pages/Eporner';
import Redtube from './pages/Redtube';
import SavedList from './pages/SavedList';
import NotFoundPage from './components/404';

const activeChain = 'ethereum';

function App() {
  
  const clientId = process.env.REACT_APP_TEMPLATE_CLIENT_ID;
  
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
  const darkModeChange = (event) => {
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
  
  

  const unregisterServiceWorker = () => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistrations().then((registrations) => {
        registrations.forEach((registration) => {
          registration.unregister();
        });
      });
    }
  };
  
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker
      .register('/sw.js')
      .then((registration) => {
        console.log(registration.scope);
      })
      .catch((error) => {
        console.error(error);
      });
    }
    window.addEventListener('beforeunload', unregisterServiceWorker);
    return () => {
      window.removeEventListener('beforeunload', unregisterServiceWorker);
    };
  }, []);
  
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
        <Navbar handleDarkModeChange={darkModeChange} darkMode={darkMode} />
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
