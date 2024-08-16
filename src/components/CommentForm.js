import React, { useState, useEffect } from 'react';
import { useLocation, Link  } from 'react-router-dom';

// Comment form called from Home page component specific at playing video or at opened video player. This will show comment list that fetced from database and for who want to send comment at spesific video
export default function CommentForm ({ platformName, videoId }) {
	
	const commentListUrl = process.env.REACT_APP_COMMENT_LIST_ENDPOINT;
	const submitCommentUrl = process.env.REACT_APP_POST_COMMENT_ENDPOINT;
	
  const location = useLocation();
  const currentPath = location.pathname;
	
	const [commentData, setCommentData] = useState([]);
	const [isSubmitted, setIsSubmitted] = useState(false);
	const [isOpen, setIsOpen] = useState(false);
	const [platform, setPlatform] = useState('');
	const [slug, setSlug] = useState('');
	
	useEffect(() => {
		const fetchData = async () => {
			try {
				let data;
				if(videoId) {
					if(platformName === 'eporner' || platformName === 'dreamcam' || platformName === 'camsoda' || platformName === 'babestation' || platformName === 'amateur' || platformName === 'redtube' || platformName === 'chaturbate' || platformName === 'stripchat' || platformName === 'cam4' || platformName === 'compilations' || platformName === 'eplay') {
						setPlatform(platformName);
						setSlug(videoId);
						const res = await fetch(`${commentListUrl}?platform=${platformName}&slug=${videoId}`);
						data = await res.json();
					}
					
					if(data) {
						if(data.success === true) {
							setCommentData(data.results);
						}
					}
				}
			}
			catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		fetchData();
	}, [videoId, isSubmitted]);

	const initialInputs = {
		name: '',
		website: '',
		comment: '',
	};

	const [inputs, setInputs] = useState(initialInputs);
	const [maxLength, setMaxLength] = useState(500);
	const handleChange = (e) => {
		const { name, value } = e.target;
		setInputs({
			...inputs,
			[e.target.name]: e.target.value,
		});
	};

 	const handleKeyPress = (event) => {
		console.log(inputs.comment.length)
		if(inputs.comment.length >= maxLength) {
			event.preventDefault();
		}
	};

	const charRemaining = maxLength - inputs.comment.length;

	const handleSubmit = async (e) => {
		e.preventDefault();
 		try {
			setIsSubmitted(true);
			const form =  document.getElementById('comment-form');
			const formData = new FormData(form);
			formData.append('platform', platform);
			formData.append('slug', slug);
			const response = await fetch(submitCommentUrl, {
				method: 'POST',
				body: formData
			});
			const resData = await response.json();
			if (resData.success === true) {
				setIsSubmitted(false);
				setInputs(initialInputs);
				const arr = document.querySelector('.box');
				if(arr) {
					setIsOpen(false);
				}
				else {
					setIsOpen(true);
				}
				window.$('.btn-overlay').toggleClass('box');
			}
			else {
				setIsSubmitted(false);
				console.log('error')
			}
		}
		catch (error) {
			console.error("Error post comment:", error);
		}
	};

	const openBox = async (e) => {
		e.preventDefault();
		const arr = document.querySelector('.box');
		if(arr) {
			setIsOpen(false);
		}
		else {
			setIsOpen(true);
		}
		window.$('.btn-overlay').toggleClass('box');
	}

	const handleClose = (e) => {
		if (!e.target.closest('form')) {
			const arr = document.querySelector('.box');
			if(arr) {
				setIsOpen(false);
				window.$('.btn-overlay').removeClass('box');
			}
		}
	};

	return (
		<>
		<div className="heading left-flex" style={{ marginTop: 23 }} >
			<h4><strong style={{color: "#b00505"}}>{`${commentData.length} Comments`}</strong></h4>
		</div>
		<div id="ads" onClick={handleClose}>
			<form id="comment-form" className="btn-overlay" onSubmit={handleSubmit} encType="multipart/form-data">
				<button className="btn-show" onClick={openBox}>
					{isOpen ? (
						<svg xmlns="http://www.w3.org/2000/svg" height="24" fill="#fff" viewBox="0 -960 960 960" width="24">
							<path d="M480-358.463 253.847-584.615 296-626.768l184 184 184-184 42.153 42.153L480-358.463Z"/>
						</svg>
					):(
						<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" fill="#fff" width="24">
							<path d="m296-358.463-42.153-42.152L480-626.768l226.153 226.153L664-358.463l-184-184-184 184Z"/>
						</svg>
					)}
				</button>
				<input type="text" name="name" id="name" placeholder="Name" required value={inputs.name} onChange={handleChange} />
				<input type="text" name="website" id="website" placeholder="Website" value={inputs.website} onChange={handleChange} />
				<textarea type="text" name="comment" id="comment" placeholder="Comment" required value={inputs.comment} onChange={handleChange} maxLength={maxLength} ></textarea>
				<span className="limit-char">{`remaining ${charRemaining} character`}</span>
				{isSubmitted ? (
					<div className="loading-animation loading-div">
					<div className="loading-comment"></div>
					</div>
				):(
					<button id="box-btn" className="comment-btn">Send</button>
				)}
			</form>
			<div className="ads-scroll">
				{commentData.map((visitor) => (
					<div key={visitor.id} className="comment">
						<span><strong><a href={visitor.website} title={visitor.name} target="_blank">{visitor.name}</a></strong></span>
						<span>{visitor.comment}</span>
					</div>
				))}
			</div>
		</div>
		</>
	)
}