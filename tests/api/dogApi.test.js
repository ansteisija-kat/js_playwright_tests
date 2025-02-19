import { test, expect } from "@playwright/test";

// https://dog.ceo/dog-api/documentation/random

const BASE_URL = 'https://dog.ceo/api';


test(`get a random image of doggo`, async ({ request }) => {
    const response = await request.get(`${BASE_URL}/breeds/image/random`);
    const responseData = await response.json();

    await expect(response).toBeOK();
    await expect(responseData).toMatchObject(
        expect.objectContaining({
            status: 'success'
        }),
        expect(responseData.message).not.toBeNull, // в message приходит линк на изображение
    );
});

[
    { breed: 'african' },
    { breed: 'ovcharka' },
    { breed: 'pug' },
].forEach(({ breed }) => {
    test(`get a 1 random image of ${breed} by breed`, async ({ request }) => {
        const breed = 'african'

        const response = await request.get(`${BASE_URL}/breed/${breed}/images/random`);
        const responseData = await response.json();

        await expect(response).toBeOK();
        await expect(responseData).not.toBeNull();
        await expect(responseData).toMatchObject(
            expect.objectContaining({
                status: 'success',
            }),
            expect(responseData.message).toMatch(`${breed}`)
        );
    });
});

[
    { breed: 'mastiff', subBreed: [ 'bull', 'english', 'indian', 'tibetan' ]},
    { breed: 'bulldog', subBreed: [ 'boston', 'english', 'french' ]},
    { breed: 'bullterrier', subBreed: [ 'staffordshire' ] },
    { breed: 'danish', subBreed: [ 'swedish' ]},
    { breed: 'chow', subBreed: []},
    { breed: 'dalmatian', subBreed: []},
].forEach(({ breed, subBreed }) => {
    test(`get a sub-breed by breed: the ${subBreed} ${breed}`, async ({ request }) => {
        const response = await request.get(`${BASE_URL}/breed/${breed}/list`);
        const responseData = await response.json();

        await expect(response).toBeOK();
        await expect(responseData).not.toBeNull();
        await expect(responseData).toMatchObject(
            expect.objectContaining({
                status: 'success',
                message: subBreed
            }),
        );
    });
});

[
    { breed: 'dalmatian', imagesCount: 2}, // макс. кол-во фоток породы
    { breed: 'danish', imagesCount: 4},  // макс. кол-во фоток породы
    { breed: 'mastiff', imagesCount: 40},
    { breed: 'bulldog', imagesCount: 10},
].forEach(({ breed, imagesCount }) => {
    test(`get multiple random images by breed: whole ${imagesCount} ${breed}s (valid)`, async ({ request }) => {
        const response = await request.get(`${BASE_URL}/breed/${breed}/images/random/${imagesCount}`);
        const responseData = await response.json();

        await expect(response).toBeOK();
        await expect(responseData).not.toBeNull();
        await expect(responseData).toMatchObject(
            expect.objectContaining({
                status: 'success',
            }),
            expect(responseData.message).toHaveLength(imagesCount)
        );
    });
});

[
    { breed: 'dalmatian', imagesCount: 0},
    { breed: 'mastiff', imagesCount: null},
].forEach(({ breed, imagesCount }) => {
    test(`multiple random images by breed: whole ${imagesCount} ${breed}s (invalid, get 1 doggo anyway)`, async ({ request }) => {
        const response = await request.get(`${BASE_URL}/breed/${breed}/images/random/${imagesCount}`);
        const responseData = await response.json();

        await expect(response).toBeOK();
        await expect(responseData).not.toBeNull();
        await expect(responseData).toMatchObject(
            expect.objectContaining({
                status: 'success',
            }),
            expect(responseData.message).toHaveLength(1) // по дефолту будет 1 изображение
        );
    });
});

[
    { breed: 'dalmatian' },
    { breed: 'mastiff' },
    { breed: 'bulldog' },
].forEach(({ breed }) => {
    test(`get all images of ${breed}s by breed`, async ({ request }) => {
        const response = await request.get(`${BASE_URL}/breed/${breed}/images/`);
        const responseData = await response.json();

        await expect(response).toBeOK();
        await expect(responseData).not.toBeNull();
        await expect(responseData).toMatchObject(
            expect.objectContaining({
                status: 'success',
            }),
        );
    });
});