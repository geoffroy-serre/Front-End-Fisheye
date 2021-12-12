import {DATA_FILE_PATH, DATA_FILE_NAME} from '../utils/variables.js';

/**
 * Get data from file.
 * @returns Array of photographers only.
 */
export async function getPhotographers() {
	const data = await fetch(`${DATA_FILE_PATH}/${DATA_FILE_NAME}`)
		.then((data) => data.json())
		.catch((error) => console.log(error));

	return data.photographers;
}
