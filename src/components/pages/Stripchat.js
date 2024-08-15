import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CommentForm from '../CommentForm';
import DownloadVideo from '../DownloadVideo';
import videojs from "video.js";
import 'video.js/dist/video-js.css';
import VideoThumbnail from '../VideoThumbnail';
import SavedVideos from '../SavedVideos';

export default function Stripchat ({ userAddress }) {
	
	/**********************************************************************************************************************
	For Redtube, Amateur, Babestation CORS will be error if directly request from client browser,
	so you must use you mine backend server for fetch API from them then return to your client browser.
	
	Some Video API endpoint here is purely public that everyone can get and access without register like
	API from Redtube and Eporner. Stripchat you can get after register as Webmaster not User but
	actually the API endpoint	url not parameters for authentication so you can use API endpoint on this page.
	Chaturbate and Cam4	require	you to register as Partner or Webmaster for get the key.
	For Dreamcam, Camsoda, Babestation, Amateur and Eplay i don't see link for register as Webmaster or partner
	so the enpoint for that is the result I searched for manually myself. I don't know how long this endpoint can be used.
	
	Spesifically for Compilations it's your mine video from a video streaming service that serve big storage space
	for upload a video for free so it's your choice. You can use doodstream, filemoon, streamwish, vidhide, streamtape,
	vtube and many more.
	
	For user comment you also must have your mine backend for database.
	************************************************************************************************************************/
	
	
	
	//**************************************** All State ****************************************//
	const [dataVideos, setDataVideos] = useState([]);
	const [isLoading, setIsLoading] = useState(true);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState('');
	const [videoThumb, setVideoThumb] = useState('');
	const [isReload, setIsReload] = useState(false);
	const [videoData, setVideoData] = useState([]);
	const [isNotFound, setIsNotFound] = useState(false);
	const [urlHash, setUrlHash] = useState('');
	
	//**************************************** End Of All State ****************************************//


  const location = useLocation();
  const currentHash = location.hash;
	const address = userAddress();
	
	useEffect(() => {
		window.onhashchange = function() {
			const newHash = window.location.hash;
			setUrlHash(newHash);
			if(isNotFound) {
				setIsLoading(true);
			}
		};
	}, [isNotFound]);

	function handleChangeCurrentPage(e) {
		setCurrentPage(e);
	}
	
	function handleChangeIsReload(e) {
		setIsReload(e);
	}
	
	// Function for notfound
	function notFound () {
		setCurrentPage(1);
		setTimeout(() => {
			setIsNotFound(true);
			setIsLoading(false);
			setVideoData([]);
		}, 1000);
	}

	// Fetch stripchat
	const getVideo = async () => {
		const endpointUrl = `https://go.xlirdr.com/api/models?limit=5000&isNew=1`;

		try {
			const response = await fetch(endpointUrl, {cache: 'no-store'});
			const data =  await response.json();
			if(data.models) {
				setIsReload(false);
				setTimeout(() => {
					setIsLoading(false);
				}, 1000);
			}
			return data.models;
		}
		catch (error) {
			notFound();
			throw new Error('Failed fetch stripchat');
		}
	}



	//**************************************** All Fetched Video Data ****************************************//

	// Fetch data from API according url path. The source of all data is inside and start from this function
	const fetchData = async () => {
		setIsNotFound(false);
		
		const url = new URL(window.location.href);
		const currentUrl = url.hash.split('/').filter(Boolean);
		try {
			if(currentUrl[3]) {
				notFound();
			}
			else {
				const allVideos = await getVideo();
				if(allVideos) {
					setDataVideos(allVideos);
					setTotalPages(Math.ceil(5000 / 60));
				}
				
				if(currentUrl[2]) {
					if(videoData.username !== currentUrl[2]) {
						const item = allVideos.find(obj => obj.username === currentUrl[2]);
						if(item) {
							playVideo(item);
						} else {
							notFound();
						}
					}
				} else {
					setVideoData([]);
				}
			}
		}
		catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	useEffect(() => {
		fetchData();
	}, [urlHash, currentHash]);
	
	const startIndex = (currentPage - 1) * 60;
	const endIndex = startIndex + 60;
	const visibleResults = dataVideos.slice(startIndex, endIndex);

	// Function that trigger on clicked video thumb for play a video
	const playVideo = async (item) => {
		window.scrollTo({top: 0, behavior: 'smooth'});
		setVideoData(item);
		
		const vplayer = document.getElementById('video-player');
		const player = `<video id="video-player" class="video-js vjs-big-play-centered" controls playsInline preload="auto" width="600" height="480" autoPlay={${true}}></video>`
		if(!vplayer){
			window.$("#video-preview").html(player);
		}

		const videoPlayer = videojs('video-player');
		videoPlayer.src({
			src: item.stream.url,
			type: 'application/x-mpegURL'
		});
		videoPlayer.poster(item.snapshotUrl);
		videoPlayer.on('loadedmetadata', () => {
			videoPlayer.play().catch((e) => {
				console.log(e);
			});
			videoPlayer.muted(true);
		});
		
		setTimeout(() => {
			window.$('#show-video').addClass('open');
		}, 1000);
		
		setTimeout(() => {
			window.$('section').addClass('hide-div');
			window.$('.sidebar').addClass('hide-sidebar');
		}, 1300);
	}
	
	return (
		<>
			<section>
				<div className="page-body full">
					<div className="content-container">
						<div className="heading">
							{isNotFound ? (<><h1>Not Found</h1><h2 className="uid">Decentralized Streaming Videos</h2></>):(
								<>
								<h1>{`Stripchat ${videoData.username ? '| ' + videoData.username : ''}`}</h1>
								<h2 className="uid">{`${isNotFound ? 'Not Found' : 'Decentralized Streaming Videos'}`}</h2>
								</>
							)}
						</div>
						<div id="show-video" className="column vid-col">
							<div className="column-1">
								<div id="video-title" className="heading left-flex" style={{ marginTop: 20 }}>
									<h3><strong>{videoData.username}</strong></h3>
								</div>
								<SavedVideos address={address} videoData={videoData} isNotFound={isNotFound} platform={'stripchat'} />
								<div id="video-preview"></div>
								<DownloadVideo videoUrl={`https://stripchat.com/${videoData.username}`} buttonName={'Go to room'} />
								<span className="details left-flex"></span>
							</div>
							<div className="column-2">
								<CommentForm platformName={'stripchat'} videoId={videoData.username} />
							</div>
						</div>
						<VideoThumbnail isNotFound={isNotFound} isLoading={isLoading} onChangeCurrentPage={handleChangeCurrentPage} onChangeIsReload={handleChangeIsReload} playVideo={playVideo} isReload={isReload} visibleResults={visibleResults} videoData={videoData} platform={'stripchat'} currentPage={currentPage} totalPages={totalPages} handleChangeIsReload={handleChangeIsReload} />
					</div>
				</div>
			</section>
		</>
	);
};
