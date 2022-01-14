import {PHOTOGRAPHERS_PATH} from '../utils/variables.js';

const lightBoxContainer = document.querySelector('.media-modale');
const lightboxClose = document.querySelector('.lightbox__close');
const lightboxMedia = document.querySelector('.lightbox__media');
const next = document.querySelector('.lightbox__next');
const previous = document.querySelector('.lightbox__previous');

let index = 0;
let filteredMedias = [];

handleLightboxEvents();

/**
 * Initialize lightbox events.
 * Handle click and keyboard navigation.
 */
function handleLightboxEvents() {
	previous.addEventListener('click', () => {
		if (index > 0) {
			lightbox(index - 1, filteredMedias);
			index -= 1;
		}
	});

	window.addEventListener('keydown', (e) => {
		if (index > 0 && e.key == 'ArrowLeft') {
			lightbox(index - 1, filteredMedias);
			index -= 1;
		} else if (index < filteredMedias.length - 1 && e.key == 'ArrowRight') {
			lightbox(index + 1, filteredMedias);
			index += 1;
		} else if (e.key == 'Escape') {
			closeLightbox();
		}
	});

	next.addEventListener('click', () => {
		if (index < filteredMedias.length - 1) {
			lightbox(index + 1, filteredMedias);
			index += 1;
		}
	});
}

/**
 * Open Lightbox
 * @param Number startIndex
 * @param Array medias
 */
export function openLightBox(startIndex, medias) {
	lightBoxContainer.style.display = 'block';
	console.log(startIndex);
	index = startIndex;
	filteredMedias = medias;
	lightbox(index, filteredMedias);
	lightboxClose.addEventListener('click', closeLightbox);
	document.querySelector('main').style.display = 'none';
	lightBoxContainer.querySelector('tabindex[1]').focus();
}

/**
 * Close lightbox
 */
function closeLightbox() {
	document.querySelector('main').style.display = 'block';
	lightBoxContainer.style.display = 'none';
	index = 0;
}

/**
 * Image is defined but its index regarding the given array.
 * Attributes are set for alt text and aria label.
 * @param Number startIndex
 * @param Array data
 */
function lightbox(startIndex, data) {
	const neededData = data[startIndex];
	lightboxMedia.innerHTML = '';
	const titleEl = document.createElement('H3');
	titleEl.className = 'lightbox-media-title';

	if (data[startIndex].image) {
		const imageEl = document.createElement('img');
		imageEl.setAttribute('tabindex', 1);
		imageEl.setAttribute(
			'src',
			`${PHOTOGRAPHERS_PATH}/${neededData.photographerId}/${neededData.image}`
		);
		imageEl.setAttribute('alt', `${data[startIndex].alt}`);

		lightboxMedia.appendChild(imageEl);
	} else if (data[startIndex].video) {
		const videoEl = document.createElement('video');
		videoEl.setAttribute('aria-label', data[startIndex].alt);
		videoEl.setAttribute('controls', '');
		videoEl.setAttribute(
			'src',
			`${PHOTOGRAPHERS_PATH}/${neededData.photographerId}/${neededData.video}`
		);
		videoEl.setAttribute('tabindex', 1);
		videoEl.focus();

		window.addEventListener('keydown', (e) => {
			e.preventDefault();
			if (e.key === ' ' && videoEl.paused) {
				videoEl.play();
			} else {
				videoEl.pause();
			}
		});
	}
	titleEl.textContent = data[startIndex].title;
	lightboxMedia.appendChild(titleEl);
}
