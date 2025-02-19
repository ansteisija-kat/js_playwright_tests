// https://dog.ceo/dog-api/documentation/

export const BASE_URL = 'https://dog.ceo/api';

export const BREEDS = ['african', 'ovcharka', 'pug', 'mastiff', 'bulldog', 'bullterrier', 'danish', 'chow', 'dalmatian'];

export const SUBBREEDS = [
    { breed: 'mastiff', subBreed: [ 'bull', 'english', 'indian', 'tibetan' ]},
    { breed: 'bulldog', subBreed: [ 'boston', 'english', 'french' ]},
    { breed: 'bullterrier', subBreed: [ 'staffordshire' ]},
    { breed: 'danish', subBreed: [ 'swedish' ]},
    { breed: 'chow', subBreed: []},
    { breed: 'dalmatian', subBreed: []}
];

export function getRandomBreed(BREEDS) {
    const randomIndex = Math.floor(Math.random() * BREEDS.length);
    const breed = BREEDS[randomIndex];
    return breed;
}

export const randomBreed = getRandomBreed(BREEDS);

export const pathGetRandomImage = `${BASE_URL}/breeds/image/random`
export const pathGetOneImageByBreed = `${BASE_URL}/breed/${randomBreed}/images/random`
export const pathGetMultiImagesByBreed = `${BASE_URL}/breed/${BREEDS}/images/random/${BREEDS}`
export const pathGetSubbreedByBreed = `${BASE_URL}/breed/${BREEDS}/list`
export const pathGetAllImagesByBreed = `${BASE_URL}/breed/${randomBreed}/images/`


