//Mettre le code JavaScript lié à la page photographer.html
import {closeModal, displayModal} from '../utils/contactForm.js';

const openModalButton = document.querySelector('.contact_button');
const closeModalButton = document.querySelector('.close_button');
const modalBlock = document.getElementById('contact_modal');

openModalButton.addEventListener('click', () => displayModal(modalBlock));
closeModalButton.addEventListener('click', () => closeModal(modalBlock));
