import {PHOTOGRAPHERS_PATH} from '../utils/variables.js';

export const mediaFactory = (media) => {
	const container = document.createElement('div');
	const mediaContainer = document.createElement('div');
	const mediaLink = document.createElement('a');
	container.className = 'media-card';
	mediaContainer.className = 'media-card__container';

	if (media.image) {
		const image = document.createElement('img');
		const description = document.createElement('div');
		description.textContent = `${media.title} avec ${media.likes}`;
		description.className = 'media-card__description';
		image.className = 'media-card__media';

		image.setAttribute('alt', `${media.title}`);
		image.setAttribute(
			'src',
			`${PHOTOGRAPHERS_PATH}/${media.photographerId}/${media.image}`
		);
		mediaLink.setAttribute('href', '#');
		mediaLink.appendChild(image);
		mediaContainer.appendChild(mediaLink);
		container.appendChild(mediaContainer);
		container.appendChild(description);
	} else if (media.video) {
		const videoTitle = media.video.split('.')[0].replaceAll('_', ' ');
		const video = document.createElement('video');
		const description = document.createElement('div');

		description.textContent = `${videoTitle} avec ${media.likes}`;

		description.className = 'media-card__description';
		video.className = 'media-card__media';

		video.setAttribute('alt', `${videoTitle}`);
		video.setAttribute(
			'src',
			`${PHOTOGRAPHERS_PATH}/${media.photographerId}/${media.video}`
		);
		mediaLink.setAttribute('href', `#`);

		mediaLink.appendChild(video);
		mediaContainer.appendChild(mediaLink);
		container.appendChild(mediaContainer);
		container.appendChild(description);
	}
	return container;
};
