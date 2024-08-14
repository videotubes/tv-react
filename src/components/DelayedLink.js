import { useNavigate } from 'react-router-dom';
import videojs from "video.js";
import 'video.js/dist/video-js.css';

function DelayedLink({ to, delay = 1800, children, ...props }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    const videoDiv = document.getElementById('show-video');
    const hasOpenClass = videoDiv && videoDiv.classList.contains('open');
		
    if(!hasOpenClass) {
      navigate(to);
    }
		else {
			window.scrollTo({top: 0, behavior: 'smooth'});
			setTimeout(() => {
				window.$('#show-video').removeClass('open');
			}, 1000);
			
			const hasScrollbar = window.innerWidth > document.documentElement.clientWidth;
			const viewportWidth = hasScrollbar ? window.innerWidth : document.documentElement.clientWidth;
			
			if(viewportWidth < 500){
				setTimeout(() => {
					window.$('.sidebar').removeClass('hide-sidebar-mobile');
				}, 1300);
			}
			setTimeout(() => {
				window.$('section').removeClass('hide-div');
				window.$('.sidebar').removeClass('hide-sidebar');
			}, 1300);

			const vplayer = document.getElementById('video-player');
			const removeIframe = document.querySelector('iframe');
			
			if(removeIframe) {
				setTimeout(function() {
					removeIframe.remove();
				}, 1500);
			}
			
			if(vplayer){
				setTimeout(function() {
					videojs(vplayer).dispose();
				}, 1500);
			}
		
      setTimeout(() => {
        navigate(to);
      }, delay);
    }
  };

  return (
    <a href={to} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}

export default DelayedLink;
