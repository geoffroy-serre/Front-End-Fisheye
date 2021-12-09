// this.{name, portrait, city, country, tagline, price} = this.data;
// const picture = `./assets/photographers/Photographers ID Photos/${portrait}`;

export const getUserCardDOM = ({
	name,
	portrait,
	city,
	country,
	tagline,
	price,
}) => {
	const picture = `./assets/photographers/Photographers ID Photos/${portrait}`;
	const article = document.createElement('article');
	const img = document.createElement('img');
	const h2 = document.createElement('h2');
	const location = document.createElement('div');
	const taglineEl = document.createElement('cite');
	const showPrice = document.createElement('div');

	img.setAttribute('src', picture);
	img.setAttribute('alt', name);
	h2.textContent = name;
	location.textContent = `${city}, ${country}`;
	taglineEl.textContent = tagline;
	showPrice.textContent = `${price}€/jour`;

	article.appendChild(img);
	article.appendChild(h2);
	article.appendChild(location);
	article.appendChild(taglineEl);
	article.appendChild(showPrice);

	return article;
};

export default getUserCardDOM;
