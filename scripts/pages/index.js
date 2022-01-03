import {createUserCard} from '../factories/photographer.js';
import {PHOTOGRAPHERS_ID_PICTURES_PATH} from '../utils/variables.js';
import {getPhotographers} from '../utils/retrieveData.js';

init();

/**
 * Initialize index page.
 * Retrieve photographers list, and display datas.
 */
async function init() {
	const photographers = await getPhotographers();
	displayData(photographers);
}

/**
 * For each photographers in given array, call the photographer factory.
 * @see createUserCard()
 * @param Array photographers
 */
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
