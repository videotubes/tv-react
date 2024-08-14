import React, { useState, useEffect } from 'react';

// Newsticker for crypto price 
export default function NewsTicker () {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cryptorank.io/widget/marquee.js';
    script.async = true;
    script.onload = () => {
    };
    script.onerror = (error) => {
      console.error('Error loading external script:', error);
    };

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
	return (
		<>
		<div id="cr-widget-marquee" style={{margin: "2rem 0 8px 0", background: "#fff"}}
			data-coins="bitcoin,ethereum,tether,ripple,cardano,matic-network,bitgert"
			data-theme="light"
			data-show-symbol="true"
			data-show-icon="true"
			data-show-period-change="true"
			data-period-change="24H"
			data-api-url="https://api.cryptorank.io/v0">
		</div>
		</>
	)
}