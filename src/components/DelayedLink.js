import { useNavigate } from 'react-router-dom';
import videojs from "video.js";
import 'video.js/dist/video-js.css';


// Delay the route from Navbar for wait closed video elemen animation and sidebar animation
function DelayedLink({ to, delay = 1800, children, ...props }) {
  const navigate = useNavigate();

  const handleClick = (e) => {
    e.preventDefault();
    const playerEl = document.getElementById('show-video');
		const sidebar = document.querySelector('.sidebar');
		const sections = document.querySelectorAll('section');
    const hasOpenClass = playerEl && playerEl.classList.contains('open');
		
    if(!hasOpenClass) {
      navigate(to);
    }
		else {
			window.scrollTo({top: 0, behavior: 'smooth'});
			setTimeout(() => {
				playerEl.classList.remove('open');
			}, 1000);
			
			const hasScrollbar = window.innerWidth > document.documentElement.clientWidth;
			const viewportWidth = hasScrollbar ? window.innerWidth : document.documentElement.clientWidth;
			
			if(viewportWidth < 500){
				setTimeout(() => {
					sidebar.classList.remove('hide-sidebar-mobile');
				}, 1300);
			}
			setTimeout(() => {
				sections.forEach(section => {
					section.classList.remove('hide-div');
				});
				sidebar.classList.remove('hide-sidebar');
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
