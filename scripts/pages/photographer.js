//Mettre le code JavaScript lié à la page photographer.html
import {closeModal, displayModal} from '../utils/contactForm.js';
import {
	DATA_FILE_PATH,
	DATA_FILE_NAME,
	PHOTOGRAPHERS_ID_PICTURES_PATH,
} from '../utils/variables.js';

import {getPhotographers} from '../utils/retrieveData.js';

const openModalButton = document.querySelector('.contact_button');
const closeModalButton = document.querySelector('.close_button');
const modalBlock = document.getElementById('contact_modal');
const urlParameter = new URLSearchParams(window.location.search).get('id');
const photographerName = document.querySelector('.photographer__name');
const photographerLocation = document.querySelector('.photographer__location');
const photographerTagline = document.querySelector('.photographer__tagline');
const photographerId = document.querySelector('.photographer__id');

const photographers = await getPhotographers();
console.log(urlParameter);

populateInfos();

openModalButton.addEventListener('click', () => displayModal(modalBlock));
closeModalButton.addEventListener('click', () => closeModal(modalBlock));

async function populateInfos() {
	photographers.forEach((photographer) => {
		if (urlParameter == photographer.id) {
			console.log(`found ${photographer.id}`);
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
