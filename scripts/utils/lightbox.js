import {PHOTOGRAPHERS_PATH} from '../utils/variables.js';

const lightBoxContainer = document.querySelector('.media-modale');
const lightboxClose = document.querySelector('.lightbox__close');
const lightboxMedia = document.querySelector('.lightbox__media');
const next = document.querySelector('.lightbox__next');
const previous = document.querySelector('.lightbox__previous');

let index = 0;
let filteredMedias = [];

handleLightboxEvents();

function handleLightboxEvents() {
	previous.addEventListener('click', () => {
		console.log(index, index - 1);
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

export function openLightBox(startIndex, medias) {
	lightBoxContainer.style.display = 'block';
	console.log(startIndex);
	index = startIndex;
	filteredMedias = medias;
	lightbox(index, filteredMedias);
	lightboxClose.addEventListener('click', closeLightbox);
}

function closeLightbox() {
	lightBoxContainer.style.display = 'none';
	index = 0;
}

function lightbox(startIndex, data) {
	const neededData = data[startIndex];
	lightboxMedia.innerHTML = '';

	if (data[startIndex].image) {
		const imageEl = document.createElement('img');
		imageEl.setAttribute(
			'src',
			`${PHOTOGRAPHERS_PATH}/${neededData.photographerId}/${neededData.image}`
		);

		lightboxMedia.appendChild(imageEl);
	} else if (data[startIndex].video) {
		const videoEl = document.createElement('video');
		videoEl.setAttribute('controls', '');
		videoEl.setAttribute(
			'src',
			`${PHOTOGRAPHERS_PATH}/${neededData.photographerId}/${neededData.video}`
		);

		lightboxMedia.appendChild(videoEl);
	}
}
