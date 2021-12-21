export function displayModal(modalBlock, photographerName) {
	modalBlock.style.display = 'flex';
	displayPhotographerName(photographerName);
}

export function closeModal(modalBlock) {
	modalBlock.style.display = 'none';
}

function displayPhotographerName(name) {
	const modal = document.querySelector('.modal');
	modal.querySelector('header').querySelector('h3').textContent = name;
}
