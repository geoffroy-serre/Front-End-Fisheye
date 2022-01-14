import {PHOTOGRAPHERS_PATH} from '../utils/variables.js';
import {openLightBox} from '../utils/lightbox.js';
import {
	incrementTotalLikes,
	decrementTotalLikes,
} from '../pages/photographer.js';

/**
 * Create media card with the given media.
 * It can take images and video.
 * It ad an event listener on click on the card. On click open a lightbox at the index corresponding to the card.
 * The index is the position of the medias, in an array of media of a certain order defined previously.
 * @param Object media
 * @param Number index
 * @param Array filteredMedias
 * @returns HTMLElement.
 */
export const mediaFactory = (media, index, filteredMedias) => {
	const container = document.createElement('figure');
	// const mediaContainer = document.createElement('div');
	const mediaLink = document.createElement('a');
	const description = document.createElement('figcaption');
	const titleSpan = document.createElement('span');
	const likeDiv = document.createElement('div');
	const likeNumber = document.createElement('span');
	const heartIcon = document.createElement('button');

	container.id = media.id;
	likeNumber.className = 'like-number';
	heartIcon.className = 'fas fa-heart';
	container.className = 'media-card';
	// mediaContainer.className = 'media-card__container';

	titleSpan.setAttribute('tabindex', 0);
	likeNumber.setAttribute('tabindex', 0);
	heartIcon.setAttribute('tabindex', 0);
	heartIcon.setAttribute('aria-label', 'Liker la photo');
	container.setAttribute('tabindex', -1);

	if (media.image) {
		const image = document.createElement('img');

		titleSpan.textContent = media.title;
		description.className = 'media-card__description';
		image.className = 'media-card__media';

		image.setAttribute('alt', `Photo: 	${media.alt}`);
		image.setAttribute('tabindex', 0);
		image.setAttribute(
			'src',
			`${PHOTOGRAPHERS_PATH}/${media.photographerId}/${media.image}`
		);

		mediaLink.setAttribute('href', '#');
		mediaLink.appendChild(image);
	} else if (media.video) {
		const video = document.createElement('video');

		titleSpan.textContent = media.title;
		video.setAttribute('title', media.alt);
		description.className = 'media-card__description';
		video.className = 'media-card__media';

		video.setAttribute(
			'src',
			`${PHOTOGRAPHERS_PATH}/${media.photographerId}/${media.video}`
		);
		video.setAttribute('tabindex', 0);

		mediaLink.setAttribute('href', `#`);
		mediaLink.appendChild(video);
	}

	mediaLink.addEventListener('click', () => {
		openLightBox(index, filteredMedias);
	});

	container.appendChild(mediaLink);
	description.appendChild(titleSpan);
	likeNumber.textContent = media.likes;
	likeNumber.setAttribute('role', 'Image');
	likeNumber.setAttribute('aria-label', 'Nombre de likes');

	likeDiv.appendChild(likeNumber);
	likeDiv.appendChild(heartIcon);
	description.appendChild(likeDiv);
	// container.appendChild(mediaContainer);

	container.appendChild(description);

	/* As there is no  backend to save  liked photos, class liked is toggled to avoid
	infinite liking in this demo version
	*/
	heartIcon.addEventListener('click', () => {
		if (container.classList.contains('liked')) {
			likeNumber.textContent = parseInt(likeNumber.textContent) - 1;
			likeNumber.classList.toggle('like-number--liked');
			container.classList.toggle('liked');
			decrementTotalLikes();
		} else {
			container.classList.toggle('liked');
			likeNumber.classList.toggle('like-number--liked');
			likeNumber.textContent = parseInt(likeNumber.textContent) + 1;
			console.log('increment event');
			incrementTotalLikes();
		}
	});

	return container;
};
