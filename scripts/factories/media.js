import {PHOTOGRAPHERS_PATH} from '../utils/variables.js';

export const mediaFactory = (arrayMedias) => {
	const mediaSection = document.querySelector('#media-section');
	const gallerySection = document.querySelector('.gallery');
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
			const video = document.createElement('video');
			const description = document.createElement('div');
			description.textContent = `${media.title} avec ${media.likes}`;

			// Virer les _ des noms de fichier pour en faire un titre. virer l'extension aussi
			// genre - les 4 caracteres de la fin
			const videoTitle = '';
			description.className = 'media-card__description';
			video.className = 'media-card__media';
			video.setAttribute('alt', `${media.title}`);
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
