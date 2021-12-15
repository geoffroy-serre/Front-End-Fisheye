export const createUserCard = (
	{name, portrait, city, id, country, tagline, price},
	PHOTOGRAPHERS_ID_PICTURES_PATH
) => {
	const picture = `${PHOTOGRAPHERS_ID_PICTURES_PATH}/${portrait}`;
	const article = document.createElement('article');
	const img = document.createElement('img');
	const h2 = document.createElement('h2');
	const location = document.createElement('div');
	const taglineEl = document.createElement('cite');
	const showPrice = document.createElement('div');
	const link = document.createElement('a');

	article.className = 'photographer-card';
	h2.className = 'photographer-card__name';
	img.className = 'photographer-card__photo';
	location.className = 'photographer-card__location';
	taglineEl.className = 'photographer-card__tagline';
	showPrice.className = 'photographer-card__price';

	img.setAttribute('src', picture);
	img.setAttribute('alt', name);
	link.setAttribute('href', `./photographer.html?id=${id}`);

	h2.textContent = name;
	location.textContent = `${city}, ${country}`;
	taglineEl.textContent = tagline;
	showPrice.textContent = `${price}€/jour`;
	link.appendChild(img);
	article.appendChild(link);
	article.appendChild(h2);
	article.appendChild(location);
	article.appendChild(taglineEl);
	article.appendChild(showPrice);

	return article;
};

export default createUserCard;
