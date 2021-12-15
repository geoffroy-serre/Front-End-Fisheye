import {PHOTOGRAPHERS_PATH} from '../utils/variables.js';

export const mediaFactory = (arrayMedias) => {
	const gallerySection = document.querySelector('.gallery');
	const mediaSection = document.querySelector('#media-section');
	arrayMedias.forEach((media) => {
		const container = document.createElement('div');
		const mediaContainer = document.createElement('div');
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
			mediaContainer.appendChild(image);
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
			mediaContainer.appendChild(video);
			container.appendChild(mediaContainer);
			container.appendChild(description);
		}

		gallerySection.appendChild(container);
		mediaSection.appendChild(gallerySection);
	});
};
