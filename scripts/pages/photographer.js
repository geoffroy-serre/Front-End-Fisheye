//Mettre le code JavaScript lié à la page photographer.html
import {closeModal, displayModal} from '../utils/contactForm.js';
import {
	// DATA_FILE_PATH,
	// DATA_FILE_NAME,
	PHOTOGRAPHERS_ID_PICTURES_PATH,
} from '../utils/variables.js';

import {getPhotographers, getMedias} from '../utils/retrieveData.js';

// DOM Elements
const openModalButton = document.querySelector('.contact_button');
const closeModalButton = document.querySelector('.close_button');
const modalBlock = document.getElementById('contact_modal');
const urlParameter = new URLSearchParams(window.location.search).get('id');
const photographerName = document.querySelector('.photographer__name');
const photographerLocation = document.querySelector('.photographer__location');
const photographerTagline = document.querySelector('.photographer__tagline');
const photographerId = document.querySelector('.photographer__id');

console.log(urlParameter);

openModalButton.addEventListener('click', () => displayModal(modalBlock));
closeModalButton.addEventListener('click', () => closeModal(modalBlock));

init();

/**
 *
 */
async function init() {
	const photographers = await getPhotographers();
	const medias = await getMedias();

	populateInfos(photographers);
	filterMenu('popularité');
	populateMedias(medias);
}

function filterMenu(selectedOption) {
	const select = document.querySelector('.select');
	const selectOptionElements = document.querySelectorAll('.select__option');
	const filterOptions = ['Popularité', 'Date', 'Titre'];
	let currentOption = selectedOption;
	const otherOptions = [];

	select.addEventListener('click', () => {
		document.querySelector('.select__options').style.display = 'block';
	});

	filterOptions.forEach((option) => {
		console.log(option);
		if (option.toLowerCase() != currentOption.toLowerCase()) {
			otherOptions.push(option);
		} else if (option.toLowerCase() == currentOption.toLowerCase()) {
			currentOption = option;
		}
	});

	selectOptionElements.forEach((e) => {
		console.log(e);
		e.addEventListener('click', () => {
			console.log('bite');
		});
	});

	const selectFilter = `
    <div class="select__current">${currentOption}</div>
	<ul class="select__options">
    <li class="select__option">${otherOptions[0]}</li>
    <li class="select__option">${otherOptions[1]}</li>
    </ul>
    `;
	select.innerHTML = selectFilter;
}

async function populateInfos(photographers) {
	photographers.forEach((photographer) => {
		if (urlParameter == photographer.id) {
			photographerId.setAttribute(
				'src',
				`${PHOTOGRAPHERS_ID_PICTURES_PATH}/${photographer.portrait}`
			);
			photographerName.textContent = photographer.name;
			photographerLocation.textContent = `${photographer.city}, ${photographer.country}`;
			photographerTagline.textContent = photographer.tagline;
		}
	});
}

async function populateMedias(medias) {
	medias = 'bite';
	return medias;
	// medias.forEach((media) => {
	// 	if (media.photographerId == urlParameter) {
	// 		console.log(media);
	// 	}
	// });
}
