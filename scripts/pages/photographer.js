import {
	closeModal,
	displayModal,
	submitContactForm,
} from '../utils/contactForm.js';
import {PHOTOGRAPHERS_ID_PICTURES_PATH} from '../utils/variables.js';
import {getPhotographers, getMedias} from '../utils/retrieveData.js';
import {mediaFactory} from '../factories/media.js';

// DOM Elements
const closeModalButton = document.querySelector('.close_button');
const modalBlock = document.getElementById('contact_modal');
const urlParameter = new URLSearchParams(window.location.search).get('id');
const infoSection = document.querySelector('.photograph-header');

let totalLikes = 0;
let filteredMedias = [];
let photographerPrice = 0;
let photographerFullName = '';

/*
 * If there is no urlParameter with Id, or id=0, redirect user to home page.
 */
if (!urlParameter || urlParameter == 0) {
	document.location.href = './index.html';
}

const photographers = async () => await getPhotographers();
const medias = async () => await getMedias();

init();

/**
 * Initialize page.
 * Retrieve and show content of information block.
 * Populate the filterMenu options.
 * Retrieve and display medias.
 * Create event listeners for contact form and button.
 */
async function init() {
	populateInfos(await photographers());
	filterMenu('popularité');
	populateMedias(await medias(), 'popularité');

	document
		.querySelector('#contact_button')
		.addEventListener('click', () =>
			displayModal(modalBlock, photographerFullName)
		);
	closeModalButton.addEventListener('click', () => closeModal(modalBlock));

	document
		.querySelector('#btn-contact-submit')
		.addEventListener('click', (e) => submitContactForm(e, modalBlock));
}

/**
 * Populate the filter menu.
 * It display first the selectedOption, and then put the other options in dropdown menu
 * Menu options are in a const filterOptions in the function.
 * @param String selectedOption
 */
async function filterMenu(selectedOption) {
	const mediaList = await medias();
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
    <div class="select__current"><button type="button" role ="button"  aria-haspopup ="listbox" aria-expanded="false" aria-label="Tri actuel par ${currentOption}">${currentOption}<button></div>
		<ul class="select__options" role ="listbox">
    		<li class="select__option" ><button type="button" aria-label="Trier par ${otherOptions[0]}">${otherOptions[0]}</button></li>
    		<li class="select__option" ><button type="button" aria-label="Trier par ${otherOptions[1]}">${otherOptions[1]}</button></li>
    </ul>
    `;
	select.innerHTML = selectFilter;

	const selectCurrent = document.querySelector('.select__current');
	const selectOptions = document.querySelector('.select__options');

	selectCurrent.querySelector('button').addEventListener('click', () => {
		if (
			window.getComputedStyle(selectOptions).getPropertyValue('display') ===
			'none'
		) {
			selectOptions.style.display = 'block';
			selectCurrent.querySelector('button').setAttribute('aria-expanded', true);
		} else {
			selectOptions.style.display = 'none';
			selectCurrent
				.querySelector('button')
				.setAttribute('aria-expanded', false);
		}
	});

	document.querySelectorAll('.select__option').forEach((e) => {
		e.querySelector('button').addEventListener('click', () => {
			const wantedChoice = e.textContent;
			document.querySelector('.gallery').innerHTML = '';
			selectOptions.style.display = 'none';
			selectCurrent
				.querySelector('button')
				.setAttribute('aria-expanded', false);
			filterMenu(wantedChoice);
			populateMedias(mediaList, wantedChoice);
		});
	});
}

/**
 * When a photographer from the given array match the url parameter, it display the informations(name, city etc..).
 * @param Array photographers
 */
async function populateInfos(photographers) {
	photographers.forEach((photographer) => {
		if (urlParameter == photographer.id) {
			const infos = `
			<div class="photographer__info">
				<h1 class="photographer__name"  aria-label="Nom du photographe: ${photographer.name}">${photographer.name}</h1>
				<div class="photographer__location" role="text" aria-label="Lieu de résidence du photographe: ">${photographer.city}, ${photographer.country}</div>
				<cite class="photographer__tagline" role="text" aria-label="Slogan du photographe">${photographer.tagline}</cite>
			</div>
			<button id="contact_button" class="contact_button">Contactez-moi</button>
			<img class="photographer__id" aria-label="Photo portrait de ${photographer.name}" src="${PHOTOGRAPHERS_ID_PICTURES_PATH}/${photographer.portrait}">
			`;

			infoSection.innerHTML = infos;
			photographerFullName = photographer.name;
			photographerPrice = photographer.price;
		}
	});
}

/**
 * Display the medias depending on the order wanted.
 * The media Array is browsed and ordered dependenng the order wanted: likes, date, from a to z.
 * For each media found, the media factory is called to create the card
 * @param Array medias
 * @param String orderWanted
 */
async function populateMedias(medias, orderWanted) {
	totalLikes = 0;
	const userMedias = medias.filter(
		(m) => m.photographerId === parseInt(urlParameter)
	);
	orderWanted = orderWanted.toLowerCase();

	// Switch use to set the compare method depending on orderWanted
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
				return dateA > dateB ? -1 : dateA < dateB ? 1 : 0;
			});
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
	filteredMedias = userMedias;

	const gallerySection = document.querySelector('.gallery');
	const mediaSection = document.querySelector('#media-section');
	userMedias.forEach((media, index) => {
		totalLikes += media.likes;
		const mediaCard = mediaFactory(media, index, filteredMedias);
		gallerySection.appendChild(mediaCard);
		mediaSection.appendChild(gallerySection);
	});
	totalLikesAndPrice();
}

/**
 * Compute the total likes of all medias for the current photographer page.
 * Show photographer price.
 */
function totalLikesAndPrice() {
	const container = document.createElement('div');
	container.className = 'likesAndPrice';
	const content = `
	<span aria-label="${totalLikes} likes sur l'ensemble des médias">${totalLikes} <i class="fas fa-heart"></i></span>
	<span aria-label="${photographerPrice} euros par jour">${photographerPrice}€/jour</span>
	`;
	container.innerHTML = content;

	document.querySelector('main').appendChild(container);
}

/**
 * Add 1 to total likes counter
 */
export function incrementTotalLikes() {
	totalLikes += 1;
	totalLikesAndPrice();
}

/**
 * Substract 1 to total likes counter
 */
export function decrementTotalLikes() {
	totalLikes -= 1;
	totalLikesAndPrice();
}
