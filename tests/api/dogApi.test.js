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


test('get sub-breeds by breed', async ({ request }) => {
    const response = await request.get(dogData.pathGetSubbreedByBreed);
    const subBreeds = dogData.randomBreedForSubbreed.subBreed;

    const responseData = await response.json();

    await expect(response).toBeOK();
    await expect(responseData).not.toBeNull();
    await expect(responseData).toMatchObject(
        expect.objectContaining({
            status: 'success',
            message: subBreeds
        }),
    );
});


test(`get multiple random images by breed (valid)`, async ({ request }) => {
    const response = await request.get(dogData.pathGetMultiImagesByBreed);
    const count = dogData.randomBreedImageCount.imagesMaxCount

    const responseData = await response.json();

    await expect(response).toBeOK();
    await expect(responseData).not.toBeNull();
    await expect(responseData).toMatchObject(
        expect.objectContaining({
            status: 'success',
        }),
        expect(responseData.message).toHaveLength(count)
    );
});


[
    { breed: dogData.randomBreed, imagesCount: 0 },
    { breed: dogData.randomBreed, imagesCount: null },
].forEach(({ breed, imagesCount }) => {
    test(`multiple random images by breed: whole ${imagesCount} doggos (invalid, get 1 doggo anyway)`, async ({ request }) => {
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