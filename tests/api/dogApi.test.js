import { test, expect } from "@playwright/test";
import * as dogData from "../../api_data/dogApi.js";



test(`get a random image of doggo`, async ({ request }) => {
    const response = await request.get(dogData.pathGetRandomImage);
    const responseData = await response.json();

    await expect(response).toBeOK();
    await expect(responseData).toMatchObject(
        expect.objectContaining({
            status: 'success'
        }),
        expect(responseData.message).not.toBeNull, // в message приходит линк на изображение
    );
});


test(`get a 1 random image of breed`, async ({ request }) => {
    const response = await request.get(dogData.pathGetOneImageByBreed);
    const responseData = await response.json();
    await expect(response).toBeOK();
    await expect(responseData).not.toBeNull();
    await expect(responseData).toMatchObject(
        expect.objectContaining({
            status: 'success',
        }),
        expect(responseData.message).toMatch(`${dogData.randomBreed}`)
    );
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
        const response = await request.get(`${dogData.BASE_URL}/breed/${breed}/list`);
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
    { breed: 'dalmatian', imagesCount: 2 }, // макс. кол-во фоток породы
    { breed: 'danish', imagesCount: 4 },  // макс. кол-во фоток породы
    { breed: 'mastiff', imagesCount: 40 },
    { breed: 'bulldog', imagesCount: 10 },
    // тут оставляем параметры, потому что у пород разное макс. кол-во фоток
].forEach(({ breed, imagesCount }) => {
    test(`get multiple random images by breed: whole ${imagesCount} ${breed}s (valid)`, async ({ request }) => {
        const response = await request.get(`${dogData.BASE_URL}/breed/${breed}/images/random/${imagesCount}`);
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
    { breed: 'dalmatian', imagesCount: 0 },
    { breed: 'mastiff', imagesCount: null },
].forEach(({ breed, imagesCount }) => {
    test(`multiple random images by breed: whole ${imagesCount} ${breed}s (invalid, get 1 doggo anyway)`, async ({ request }) => {
        const response = await request.get(`${dogData.BASE_URL}/breed/${breed}/images/random/${imagesCount}`);
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


test(`get all images by breed`, async ({ request }) => {
    const response = await request.get(dogData.pathGetAllImagesByBreed);
    const responseData = await response.json();

    await expect(response).toBeOK();
    await expect(responseData).not.toBeNull();
    await expect(responseData).toMatchObject(
        expect.objectContaining({
            status: 'success',
        }),
    );
});