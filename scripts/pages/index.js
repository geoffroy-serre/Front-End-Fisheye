import {getUserCardDOM} from '../factories/photographer.js';

const DATA_FILE_PATH = '';
const PHOTOGRAPHERS_ID_PICTURE_PATH = '';

init();

async function init() {
	const photographers = await getPhotographers();
	displayData(photographers);
}

/**
 * Get data from file.
 * @returns Array of photographers only.
 */
async function getPhotographers() {
	// const getDatas = await fetch('./data/photographers.json');
	// const response = await getDatas.json();
	// return response.photographers;

	const data = await fetch('./data/photographers.json')
		.then((data) => data.json())
		.catch((error) => console.log(error));

	return data.photographers;
}

async function displayData(photographers) {
	const photographersSection = document.querySelector('.photographer_section');

	photographers.forEach((photographer) => {
		const userCardDOM = getUserCardDOM(photographer);
		photographersSection.appendChild(userCardDOM);
	});
}
