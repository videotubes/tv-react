import React, { useEffect, useState } from 'react';

const SavedVideos = ({ address, platform, videoData, isNotFound }) => {
	const [isWarning, setIsWarning] = useState(false);
	const [warningText, setWarningText] = useState('');
	
	async function saveThis() {
		if(address) {
			let imageUrl, videoId;
			if(platform === 'compilations') {
				imageUrl = `https://laving.cc/${videoData.file_code}_xt.jpg`;
				videoId = videoData.file_code;
			}
			else if(platform === 'eporner') {
				imageUrl = videoData.default_thumb.src;
				videoId = videoData.id;
			}
			else if(platform === 'camsoda') {
				imageUrl = videoData.thumbUrl;
				videoId = videoData.username;
			}
			else if(platform === 'dreamcam') {
				imageUrl = videoData.modelProfilePhotoUrl;
				videoId = videoData.modelNickname;
			}
			else if(platform === 'cam4') {
				imageUrl = videoData.thumb;
				videoId = videoData.nickname;
			}
			else if(platform === 'chaturbate') {
				imageUrl = videoData.image_url;
				videoId = videoData.username;
			}
			else if(platform === 'stripchat') {
				imageUrl = videoData.snapshotUrl;
				videoId = videoData.username;
			}
			else if(platform === 'eplay') {
				imageUrl = videoData.ss;
				videoId = videoData.username;
			}
			else if(platform === 'babestation') {
				imageUrl = videoData.Thumbnail;
				videoId = videoData.Nickname;
			}
			else if(platform === 'redtube') {
				imageUrl = videoData.thumb;
				videoId = videoData.video_id;
			}
			else if(platform === 'amateur') {
				const parts = videoData.capture.split('/');
				parts[4] = 'capture';
				const unblured = parts.join('/');

				imageUrl = unblured;
				videoId = videoData.username;
			}
			try {
				const response = await fetch(`https://videotubes.serv00.net/api/videos?action=save&user=${address}&platform=${platform}&video_id=${videoId}&image_url=${imageUrl}`);
				const data = await response.json();
				if(data.success === true) {
					setIsWarning(true);
					setWarningText(<span style={{color: "green", fontWeight: "500"}}>&nbsp;Video saved to your list</span>);
					setTimeout(() => {
						setIsWarning(false);
						setWarningText('');
					}, 2000);
				}
			} catch (error) {
				console.error(error);
			}
		} else {
			setIsWarning(true);
			setWarningText(<span style={{color: "var(--red-bg)", fontWeight: "500"}}>&nbsp;Please connect wallet first</span>);
			setTimeout(() => {
				setIsWarning(false);
				setWarningText('');
			}, 2000);
		}
	}
	
  return (
		<div className="saved-container">
			{!isNotFound && (<button className="savethis" onClick={saveThis} ><div className="heart">Save this</div></button>)}
			{isWarning && (warningText)}
		</div>
  );
};

export default SavedVideos;
