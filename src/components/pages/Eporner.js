import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import CommentForm from '../CommentForm';
import DownloadVideo from '../DownloadVideo';
import VideoThumbnail from '../VideoThumbnail';
import SavedVideos from '../SavedVideos';

export default function Eporner ({ userAddress }) {
	
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
	const pathName = location.pathname;
	const currentPath = pathName.split('/').filter(Boolean);
	const prevUrl = useRef(location.hash);
	const prevPage = useRef(0);
	const prevIsNotFound = useRef(isNotFound);
	const address = userAddress();

	function handleChangeCurrentPage(e) {
		setCurrentPage(e);
	}
	
	function handleChangeIsReload(e) {
		setIsReload(e);
	}
	
	// Function for notfound
	function notFound () {
		prevIsNotFound.current = false;
		setCurrentPage(1);
		setTimeout(() => {
			setIsNotFound(true);
			setIsLoading(false);
			setVideoData([]);
		}, 1000);
	}

	// Fetch eporner
	const getVideo = async (secondPath, query, page) => {
		let endpointUrl;
		if(secondPath) {
			if(secondPath === 'search') {
				endpointUrl = `https://www.eporner.com/api/v2/video/search/?query=${query}&page=${page}&per_page=60`;
			} else {
				endpointUrl = `https://www.eporner.com/api/v2/video/id/?id=${secondPath}`;
			}
		}
		else {
			endpointUrl = `https://www.eporner.com/api/v2/video/search/?page=${page}&per_page=60`;
		}
		try {
			const response = await fetch(endpointUrl, {cache: 'no-store'});
			if(!response.ok) {
				setDataVideos([]);
				setIsLoading(false);
				return;
			}
			const data =  await response.json();
			if(data.time_ms) {
				setIsReload(false);
				setTimeout(() => {
					setIsLoading(false);
				}, 1000);
			}
			return data;
		}
		catch (error) {
			notFound();
			throw new Error('Failed fetch eporner');
		}
	}



	//**************************************** All Fetched Video Data ****************************************//

	// Fetch data from API according url path. The source of all data is inside and start from this function
	const fetchData = async () => {
		try {
			if(currentPath[3]) {
				notFound();
			}
			else {
				if(currentPath[1] !== 'search' && prevPage.current !== currentPage && !prevIsNotFound.current) {
					prevPage.current = currentPage;
					const allVideos = await getVideo('', '', currentPage);
					if(allVideos) {
						setIsNotFound(false);
						setDataVideos(allVideos.videos);
						setTotalPages(Math.ceil(allVideos.total_pages / 60));
					}
				}
				
				if(currentPath[1]) {
					prevUrl.current = currentPath[1];
					if(currentPath[1] === 'search' && currentPath[2]) {
						const allVideos = await getVideo('search', currentPath[2], currentPage);
						if(allVideos) {
							setIsNotFound(false);
							prevIsNotFound.current = false;
							setDataVideos(allVideos.videos);
							setTotalPages(Math.ceil(allVideos.total_pages / 60));
						}
					} else {
						if(videoData.id !== currentPath[1]) {
							const item = await getVideo(currentPath[1], '', '');
							if(item && item.length !== 0) {
								setIsNotFound(false);
								prevIsNotFound.current = false;
								playVideo(item);
							} else {
								notFound();
							}
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
	}, [pathName, currentPage]);
	
	const visibleResults = dataVideos;

	// Function that trigger on clicked video thumb for play a video
	const playVideo = async (item) => {
		if(prevUrl.current === 'search') {
			setCurrentPage(1);
		}
		
		window.scrollTo({top: 0, behavior: 'smooth'});
		setVideoData(item);
		const vplayer = document.getElementById('video-player');
		const player = `<iframe id="iframe-player" src="${item.embed}" width="600" height="500" allowfullscreen></iframe>`
		window.$("#video-preview").html(player);
		
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
								<h1>{`Eporner ${videoData.id ? '| ' + videoData.id : ''}`}</h1>
								<h2 className="uid">{`${isNotFound ? 'Not Found' : 'Decentralized Streaming Videos'}`}</h2>
								</>
							)}
						</div>
						<div id="show-video" className="column vid-col">
							<div className="column-1">
								<div id="video-title" className="heading left-flex" style={{ marginTop: 20 }}>
									<h3><strong>{videoData.title}</strong></h3>
								</div>
								<SavedVideos address={address} videoData={videoData} isNotFound={isNotFound} platform={'eporner'} />
								<div id="video-preview"></div>
								<DownloadVideo videoUrl={videoData.url} buttonName={'Download Video'} />
								<span className="details left-flex">{videoData.keywords}</span>
							</div>
							<div className="column-2">
								<CommentForm platformName={'eporner'} videoId={videoData.id} />
							</div>
						</div>
						<VideoThumbnail isSearch={prevUrl.current} isNotFound={isNotFound} isLoading={isLoading} onChangeCurrentPage={handleChangeCurrentPage} onChangeIsReload={handleChangeIsReload} playVideo={playVideo} isReload={isReload} visibleResults={visibleResults} videoData={videoData} platform={'eporner'} currentPage={currentPage} totalPages={totalPages} handleChangeIsReload={handleChangeIsReload} />
					</div>
				</div>
			</section>
		</>
	);
};
