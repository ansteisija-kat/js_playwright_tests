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

// макс. кол-во фоток породы, пока хранятся так для ручки нескольких картинок для контроля ограничений по кол-ву
export const MAX_IMAGES = [
    { breed: 'dalmatian', imagesMaxCount: 2 },
    { breed: 'danish', imagesMaxCount: 4 },
    { breed: 'mastiff', imagesMaxCount: 40 },
    { breed: 'bulldog', imagesMaxCount: 10 },
];

export function getRandomBreed(BREEDS) {
    const randomIndex = Math.floor(Math.random() * BREEDS.length);
    const breed = BREEDS[randomIndex];
    return breed;
}

export const randomBreed = getRandomBreed(BREEDS);

export function getRandomBreedForSubbreed(SUBBREEDS) {
    const randomIndex = Math.floor(Math.random() * SUBBREEDS.length);
    const breed = SUBBREEDS[randomIndex];
    return breed
    // внутри хранится 1 объект из SUBBREEDS: breed и соотв. список subBreed
}

export const randomBreedForSubbreed = getRandomBreedForSubbreed(SUBBREEDS);

export function getRandomBreedForImageCount(MAX_IMAGES) {
    const randomIndex = Math.floor(Math.random() * MAX_IMAGES.length);
    const breedImages = MAX_IMAGES[randomIndex];
    return breedImages
    // внутри хранится 1 объект из MAX_IMAGES: breed и соотв. imagesCount
}

export const randomBreedImageCount = getRandomBreedForImageCount(MAX_IMAGES);


// paths
export const pathGetRandomImage = `${BASE_URL}/breeds/image/random`
export const pathGetOneImageByBreed = `${BASE_URL}/breed/${randomBreed}/images/random`
export const pathGetMultiImagesByBreed = `${BASE_URL}/breed/${randomBreedImageCount.breed}/images/random/${randomBreedImageCount.imagesMaxCount}`
export const pathGetSubbreedByBreed = `${BASE_URL}/breed/${randomBreedForSubbreed.breed}/list`
export const pathGetAllImagesByBreed = `${BASE_URL}/breed/${randomBreed}/images/`


