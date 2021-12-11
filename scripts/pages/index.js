import {createUserCard} from '../factories/photographer.js';

const DATA_FILE_PATH = './data';
const DATA_FILE_NAME = 'photographers.json';
const ASSETS_PATH = './assets';
const PHOTOGRAPHERS_PATH = `${ASSETS_PATH}/photographers`;
const PHOTOGRAPHERS_ID_PICTURES_PATH = `${PHOTOGRAPHERS_PATH}/Ids`;

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
	const data = await fetch(`${DATA_FILE_PATH}/${DATA_FILE_NAME}`)
		.then((data) => data.json())
		.catch((error) => console.log(error));

	return data.photographers;
}

async function displayData(photographers) {
	const photographersSection = document.querySelector('.photographer_section');

	photographers.forEach((photographer) => {
		const userCardDOM = createUserCard(
			photographer,
			PHOTOGRAPHERS_ID_PICTURES_PATH
		);
		photographersSection.appendChild(userCardDOM);
	});
}
