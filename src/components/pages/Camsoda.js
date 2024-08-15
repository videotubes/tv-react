import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CommentForm from '../CommentForm';
import DownloadVideo from '../DownloadVideo';
import videojs from "video.js";
import 'video.js/dist/video-js.css';
import VideoThumbnail from '../VideoThumbnail';
import SavedVideos from '../SavedVideos';

export default function Camsoda ({ userAddress }) {
	
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

	//**************************************** End Of All State ****************************************//


  const location = useLocation();
  const currentHash = location.hash;
	const currentPath = location.pathname;
	const prevUrl = useRef(location.hash);
	const prevPage = useRef(0);
	const address = userAddress();

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

	// Fetch camsoda
	const getVideo = async (secondPath, page) => {
		let endpointUrl;
		if(secondPath) {
			endpointUrl = `https://www.camsoda.com/api/v1/chat/react/${secondPath}`;
		}
		else {
			endpointUrl = `https://www.camsoda.com/api/v1/browse/react?gender-hide=m,t&p=${page}`;
		}
		try {
			const response = await fetch(endpointUrl, {cache: 'no-store'});
			if(!response.ok) {
				setDataVideos([]);
				setIsLoading(false);
				return;
			}
			const data =  await response.json();
			if(data.userList) {
				setIsReload(false);
				setTimeout(() => {
					setIsLoading(false);
				}, 1000);
			}
			return data;
		}
		catch (error) {
			notFound();
			throw new Error('Failed fetch camsoda');
		}
	}



	//**************************************** All Fetched Video Data ****************************************//

	// Fetch data from API according url path. The source of all data is inside and start from this function
	const fetchData = async () => {
		const url = new URL(window.location.href);
		const currentUrl = url.hash.split('/').filter(Boolean);
		try {
			if(currentUrl[3]) {
				notFound();
			}
			else {
				if(currentUrl[2]) {
					if(videoData.username !== currentUrl[2]) {
						const item = await getVideo(currentUrl[2], '');
						if(item && !item.error) {
							setIsNotFound(false);
							playVideo(item);
						} else {
							notFound();
						}
					}
				} else {
					setVideoData([]);
				}

				if(prevPage.current !== currentPage) {
					prevPage.current = currentPage;
					const allVideos = await getVideo('', currentPage);
					if(allVideos) {
						setIsNotFound(false);
						setDataVideos(allVideos.userList);
						setTotalPages(Math.ceil(allVideos.totalCount / 60));
					}
				}
			}
		}
		catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	useEffect(() => {
		fetchData();
	}, [currentPath, currentPage]);
	
	const visibleResults = dataVideos;

	// Function that trigger on clicked video thumb for play a video
	const playVideo = async (item) => {
		window.scrollTo({top: 0, behavior: 'smooth'});
		setVideoData(item);
		
		const vplayer = document.getElementById('video-player');
		const player = `<video id="video-player" class="video-js vjs-big-play-centered" controls playsInline preload="auto" width="600" height="480" autoPlay={${true}}></video>`
		if(!vplayer){
			window.$("#video-preview").html(player);
		}			
		
		let token;
		let videoSrc;
		let videoPoster;
		if(item.user) {
			token = item.stream.token
			videoSrc = `https://${item.stream.edge_servers[0]}/${item.stream.stream_name}_v1/index.m3u8?token=${token}`;
			videoPoster = item.user.profilePictureUrl;
		}
		else {
			const getServer = async () => {
				try {
					const src = await fetch(`https://www.camsoda.com/api/v1/chat/react/${item.username}`);
					const res = await src.json();
					const authToken = res.stream.token;
					return authToken;
				}
				catch (error) {
					console.error(error);
				}
			}
			token = await getServer();
			videoSrc = `https://${item.streamEdgeUrl}/${item.streamName}_v1/index.m3u8?token=${token}`;
			videoPoster = item.thumbUrl;
		}

		const videoPlayer = videojs('video-player');
		videoPlayer.src({
			src: videoSrc,
			type: 'application/x-mpegURL'
		});
		videoPlayer.poster(videoPoster);
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
								<h1>{`Camsoda ${videoData.username ? '| ' + videoData.username : ''}`}</h1>
								<h2 className="uid">{`${isNotFound ? 'Not Found' : 'Decentralized Streaming Videos'}`}</h2>
								</>
							)}
						</div>
						<div id="show-video" className="column vid-col">
							<div className="column-1">
								<div id="video-title" className="heading left-flex" style={{ marginTop: 20 }}>
									<h3><strong>{videoData.username}</strong></h3>
								</div>
								<SavedVideos address={address} videoData={videoData} isNotFound={isNotFound} platform={'camsoda'} />
								<div id="video-preview"></div>
								<DownloadVideo videoUrl={`https://camsoda.com/${videoData.username}`} buttonName={'Go to room'} />
								<span className="details left-flex">{videoData.user ? videoData.chat.subjectText : videoData.subjectText}</span>
							</div>
							<div className="column-2"  style={{paddingBottom: 24}}>
								<CommentForm platformName={'camsoda'} videoId={videoData.username} />
							</div>
						</div>
						<VideoThumbnail isNotFound={isNotFound} isLoading={isLoading} onChangeCurrentPage={handleChangeCurrentPage} onChangeIsReload={handleChangeIsReload} playVideo={playVideo} isReload={isReload} visibleResults={visibleResults} videoData={videoData} platform={'camsoda'} currentPage={currentPage} totalPages={totalPages} handleChangeIsReload={handleChangeIsReload} />
					</div>
				</div>
			</section>
		</>
	);
};
