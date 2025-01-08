import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import { ThirdwebProvider } from "thirdweb/react";
import { createThirdwebClient } from "thirdweb";
import { createWallet } from "thirdweb/wallets";
import { ConnectButton, useActiveAccount } from "thirdweb/react";
import { ethereum, polygon, fantom, bsc } from "thirdweb/chains";
import ClientIP from './components/clientIP';
import './styles/global.css';
import TrailingSlashEnforcer from './components/TrailingSlashEnforcer';
import InstallPWA from './components/InstallPWA';
import Navbar from './components/Navbar';
import Homepage from './pages/Homepage';
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
import Xlovecam from './pages/Xlovecam';
import Bongacams from './pages/Bongacams';
import SavedList from './pages/SavedList';
import NotFoundPage from './components/404';

const wallets = [
  createWallet("io.metamask"),
  createWallet("com.coinbase.wallet"),
  createWallet("me.rainbow"),
  createWallet("com.trustwallet.app"),
  createWallet("com.okex.wallet"),
  createWallet("com.binance"),
];

const chains = [ethereum, polygon, fantom, bsc];

function App() {
  const client = createThirdwebClient({ clientId: process.env.REACT_APP_TEMPLATE_CLIENT_ID });
  const [clientIp, setClientIp] = useState('');

  const getClientIP = async () => {
    const ipAdd = await ClientIP();
    setClientIp(ipAdd.ip);
  };
  
  useEffect(() => {
    getClientIP();
  }, []);
  
  // Load previous selected theme on page load
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

  // Set theme dark/light trigger by button, the setting saved at localStorage
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
      <ThirdwebProvider>
        <InstallPWA />
        <Navbar handleDarkModeChange={darkModeChange} darkMode={darkMode} clientId={client} wallets={wallets} ConnectButton={ConnectButton} chains={chains} />
        <main className={darkMode ? 'dark-mode' : 'light-mode'}>
          <TrailingSlashEnforcer>
            <Routes>
              <Route path="/" element={<Homepage clientIp={clientIp} />} />
              
              <Route path="/compilations" element={<Compilations userAccount={useActiveAccount} />} />
              <Route path="/compilations/:id" element={<Compilations userAccount={useActiveAccount} />} />
              <Route path="/compilations/:id/:id" element={<Compilations userAccount={useActiveAccount} />} />
              
              <Route path="/camsoda" element={<Camsoda userAccount={useActiveAccount} />} />
              <Route path="/camsoda/:id" element={<Camsoda userAccount={useActiveAccount} />} />
              
              <Route path="/dreamcam" element={<Dreamcam userAccount={useActiveAccount} />} />
              <Route path="/dreamcam/:id" element={<Dreamcam userAccount={useActiveAccount} />} />
              
              <Route path="/cam4" element={<Cam4 userAccount={useActiveAccount} />} />
              <Route path="/cam4/:id" element={<Cam4 userAccount={useActiveAccount} />} />
              
              <Route path="/chaturbate" element={<Chaturbate userAccount={useActiveAccount} clientIp={clientIp} />} />
              <Route path="/chaturbate/:id" element={<Chaturbate userAccount={useActiveAccount} clientIp={clientIp} />} />
              <Route path="/chaturbate/:id/:id" element={<Chaturbate userAccount={useActiveAccount} clientIp={clientIp} />} />
              
              <Route path="/stripchat" element={<Stripchat userAccount={useActiveAccount} />} />
              <Route path="/stripchat/:id" element={<Stripchat userAccount={useActiveAccount} />} />
              
              <Route path="/eplay" element={<Eplay userAccount={useActiveAccount} />} />
              <Route path="/eplay/:id" element={<Eplay userAccount={useActiveAccount} />} />
              
              <Route path="/amateur" element={<Amateur userAccount={useActiveAccount} />} />
              <Route path="/amateur/:id" element={<Amateur userAccount={useActiveAccount} />} />
              
              <Route path="/babestation" element={<Babestation userAccount={useActiveAccount} />} />
              <Route path="/babestation/:id" element={<Babestation userAccount={useActiveAccount} />} />

              <Route path="/xlovecam" element={<Xlovecam userAccount={useActiveAccount} />} />
              <Route path="/xlovecam/:id" element={<Xlovecam userAccount={useActiveAccount} />} />

              <Route path="/bongacams" element={<Bongacams userAccount={useActiveAccount} />} />
              <Route path="/bongacams/:id" element={<Bongacams userAccount={useActiveAccount} />} />
              
              <Route path="/eporner" element={<Eporner userAccount={useActiveAccount} />} />
              <Route path="/eporner/:id" element={<Eporner userAccount={useActiveAccount} />} />
              <Route path="/eporner/:id/:id" element={<Eporner userAccount={useActiveAccount} />} />
              
              <Route path="/redtube" element={<Redtube userAccount={useActiveAccount} />} />
              <Route path="/redtube/:id" element={<Redtube userAccount={useActiveAccount} />} />
              <Route path="/redtube/:id/:id" element={<Redtube userAccount={useActiveAccount} />} />
              
              <Route path="/savedlist" element={<SavedList userAccount={useActiveAccount} />} />
              
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </TrailingSlashEnforcer>
        </main>
      </ThirdwebProvider>
    </Router>
  );
}

export default App;
