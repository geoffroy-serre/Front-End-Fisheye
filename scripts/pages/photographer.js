//Mettre le code JavaScript lié à la page photographer.html
import {closeModal, displayModal} from '../utils/contactForm.js';
import {
	// DATA_FILE_PATH,
	// DATA_FILE_NAME,
	PHOTOGRAPHERS_ID_PICTURES_PATH,
} from '../utils/variables.js';

import {getPhotographers, getMedias} from '../utils/retrieveData.js';
import {mediaFactory} from '../factories/media.js';

// DOM Elements
const openModalButton = document.querySelector('.contact_button');
const closeModalButton = document.querySelector('.close_button');
const modalBlock = document.getElementById('contact_modal');
const urlParameter = new URLSearchParams(window.location.search).get('id');
const photographerName = document.querySelector('.photographer__name');
const photographerLocation = document.querySelector('.photographer__location');
const photographerTagline = document.querySelector('.photographer__tagline');
const photographerId = document.querySelector('.photographer__id');
const filterChoices = document.querySelectorAll('.select__option');
const selectOptions = document.querySelector('.select__options');

console.log(urlParameter);

openModalButton.addEventListener('click', () => displayModal(modalBlock));
closeModalButton.addEventListener('click', () => closeModal(modalBlock));

const photographers = async () => await getPhotographers();
const medias = async () => await getMedias();

init();

/**
 *
 */
async function init() {
	populateInfos(await photographers());
	filterMenu('popularité');
	populateMedias(await medias(), 'popularité');
}

function filterMenu(selectedOption) {
	const select = document.querySelector('.select');
	const filterOptions = ['Popularité', 'Date', 'Titre'];
	let currentOption = selectedOption;
	const otherOptions = [];

	filterOptions.forEach((option) => {
		if (option.toLowerCase() != currentOption.toLowerCase()) {
			otherOptions.push(option);
		} else if (option.toLowerCase() == currentOption.toLowerCase()) {
			currentOption = option;
		}
	});

	const selectFilter = `
    <div class="select__current">${currentOption}</div>
	<ul class="select__options">
    <li class="select__option">${otherOptions[0]}</li>
    <li class="select__option">${otherOptions[1]}</li>
    </ul>
    `;

	// const selectCurrentElement = document.createElement('div');
	// selectCurrent.className = 'select-current';
	// selectCurrent.textContent = currentOption;

	// const list = document.createElement('ul');
	// list.className = 'select__options';

	// const optionOne = document.createElement('li');
	// optionOne.className = "select__option";
	// optionOne.textContent = otherOptions[0];

	// const optionTwo = document.createElement('li');
	// optionTwo.className = 'select__option';
	// optionTwo.textContent = otherOptions[1];

	// list.appendChild(optionOne);
	// list.appendChild(optionTwo);
	// select.appendChild(selectCurrentElement);
	// select.appendChild(list);
	select.innerHTML = selectFilter;

	const selectCurrent = document.querySelector('.select__current');
	const selectOptions = document.querySelector('.select__options');

	selectCurrent.addEventListener('click', () => {
		window.getComputedStyle(selectOptions).getPropertyValue('display') ===
		'none'
			? (selectOptions.style.display = 'block')
			: (selectOptions.style.display = 'none');
	});

	filterChoices.forEach((e) => {
		addEventListener('click', () => {
			selectOptions.style.display = 'none';
			const medias = medias().then((data) => {
				console.log('click');
				populateMedias(data, e.textContent);
				filterMenu(e.textContent);
			});
		});
	});
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

async function populateMedias(medias, orderWanted) {
	const userMedias = medias.filter(
		(m) => m.photographerId === parseInt(urlParameter)
	);
	orderWanted = orderWanted.toLowerCase();

	// Switch use to set the comapre method depending on orderWanted
	switch (orderWanted) {
		case 'popularité':
			userMedias.sort((a, b) => {
				return a.likes > b.likes ? -1 : a.likes < b.likes ? 1 : 0;
			});
			break;

		case 'date':
			userMedias.sort((a, b) => {
				const dateA = new Date(a.date);
				const dateB = new Date(b.date);
				console.log(dateA - dateB);
				return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;
			});
			console.log(userMedias);
			break;

		case 'titre':
			userMedias.sort((a, b) => {
				let titleA = '';
				let titleB = '';
				a.image
					? (titleA = a.title)
					: (titleA = a.video.split('.')[0].replaceAll('_', ' '));
				b.image
					? (titleB = b.title)
					: (titleB = b.video.split('.')[0].replaceAll('_', ' '));
				return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
			});
			break;

		default:
			break;
	}
	mediaFactory(userMedias);
}
