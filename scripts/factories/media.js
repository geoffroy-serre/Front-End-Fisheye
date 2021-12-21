import {PHOTOGRAPHERS_PATH} from '../utils/variables.js';

export const mediaFactory = (media) => {
	const container = document.createElement('div');
	const mediaContainer = document.createElement('div');
	const mediaLink = document.createElement('a');
	const description = document.createElement('div');
	const titleSpan = document.createElement('span');
	const likeCount = document.createElement('div');
	const heartIcon = document.createElement('i');

	heartIcon.className = 'fas fa-heart';
	container.className = 'media-card';
	mediaContainer.className = 'media-card__container';

	if (media.image) {
		const image = document.createElement('img');

		titleSpan.textContent = media.title;
		description.className = 'media-card__description';
		image.className = 'media-card__media';

		image.setAttribute('alt', `${media.title}`);
		image.setAttribute(
			'src',
			`${PHOTOGRAPHERS_PATH}/${media.photographerId}/${media.image}`
		);

		mediaLink.setAttribute('href', '#');
		mediaLink.appendChild(image);
	} else if (media.video) {
		const video = document.createElement('video');

		titleSpan.textContent = media.title;

		description.className = 'media-card__description';
		video.className = 'media-card__media';

		video.setAttribute('alt', `${media.title}`);
		video.setAttribute(
			'src',
			`${PHOTOGRAPHERS_PATH}/${media.photographerId}/${media.video}`
		);

		mediaLink.setAttribute('href', `#`);
		mediaLink.appendChild(video);
	}
	mediaContainer.appendChild(mediaLink);
	description.appendChild(titleSpan);
	likeCount.textContent = media.likes;
	likeCount.appendChild(heartIcon);
	description.appendChild(likeCount);
	container.appendChild(mediaContainer);

	container.appendChild(description);
	return container;
};
