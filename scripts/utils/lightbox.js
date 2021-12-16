import {PHOTOGRAPHERS_PATH} from '../utils/variables.js';

const lightBoxContainer = document.querySelector('.media-modale');
const lightboxClose = document.querySelector('.lightbox__close');
const lightboxImage = document.querySelector('.lightbox__image');

export function openLightBox(startIndex, filteredMedias) {
	lightBoxContainer.style.display = 'block';
	console.log(startIndex);
	lightbox(startIndex, filteredMedias);
}

function lightbox(startIndex, data) {
	const imageSrc = data[startIndex];
	const imageEl = document.createElement('img');

	imageEl.setAttribute(
		'src',
		`${PHOTOGRAPHERS_PATH}/${imageSrc.photographerId}/${imageSrc.image}`
	);

	lightboxImage.appendChild(imageEl);
}
