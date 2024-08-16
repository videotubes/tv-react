import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CommentForm from '../CommentForm';
import DownloadVideo from '../DownloadVideo';
import videojs from "video.js";
import 'video.js/dist/video-js.css';
import VideoThumbnail from '../VideoThumbnail';

export default function SavedList ({ userAddress }) {	
	
	const savedVideosUrl = process.env.REACT_APP_SAVED_VIDEOS_ENDPOINT;
	
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
	const pathName = location.pathname;
	const currentPath = pathName.split('/').filter(Boolean);
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

	// Fetch savedlist
	const getVideo = async (user) => {
		const endpointUrl = `${savedVideosUrl}?user=${user}`;

		try {
			const response = await fetch(endpointUrl, {cache: 'no-store'});
			if(!response.ok) {
				setDataVideos([]);
				setIsLoading(false);
				return;
			}
			const data =  await response.json();
			if(data.success === true) {
				setIsReload(false);
				setTimeout(() => {
					setIsLoading(false);
				}, 1000);
			}
			return data;
		}
		catch (error) {
			notFound();
			throw new Error('Failed fetch savedlist');
		}
	}



	//**************************************** All Fetched Video Data ****************************************//

	// Fetch data from API according url path. The source of all data is inside and start from this function
	const fetchData = async () => {
		try {
			if(currentPath[1]) {
				notFound();
			}
			else {
				if(address) {
					const allVideos = await getVideo(address);
					if(allVideos) {
						setIsNotFound(false);
						setDataVideos(allVideos.saved_list);
						setTotalPages(Math.ceil(allVideos.saved_list.length / 60));
					}
				}
			}
		}
		catch (error) {
			console.error('Error fetching data:', error);
		}
		finally {
			setIsLoading(false);
		}
	};

	useEffect(() => {
		fetchData();
	}, [pathName, address]);

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

	async function deleteThis(e) {
		if(address) {
		const response = await fetch(`${savedVideosUrl}?action=delete&user=${address}&platform=${e.platform}&video_id=${e.video_id}&image_url=${e.image_url}`);
			const data = await response.json();
			if(data.success === true) {
				fetchData();
			}
		};
	}
	
	return (
		<>
			<section>
				<div className="page-body full">
					<div className="content-container">
						<div className="heading">
							{isNotFound ? (<><h1>Not Found</h1><h2 className="uid">Decentralized Streaming Videos</h2></>):(
								<>
								<h1>{`Saved List ${videoData.username ? '| ' + videoData.username : ''}`}</h1>
								<h2 className="uid">{`${isNotFound ? 'Not Found' : 'Your Saved Videos'}`}</h2>
								</>
							)}
						</div>
						<VideoThumbnail deleteThis={deleteThis} address={address} isNotFound={isNotFound} isLoading={isLoading} onChangeCurrentPage={handleChangeCurrentPage} onChangeIsReload={handleChangeIsReload} playVideo={playVideo} isReload={isReload} visibleResults={visibleResults} videoData={videoData} platform={'savedlist'} currentPage={currentPage} totalPages={totalPages} handleChangeIsReload={handleChangeIsReload} />
					</div>
				</div>
			</section>
		</>
	);
};
