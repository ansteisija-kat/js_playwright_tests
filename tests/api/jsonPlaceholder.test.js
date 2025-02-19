import { test, expect } from "@playwright/test";

// https://jsonplaceholder.typicode.com/guide/

const BASE_URL = 'https://jsonplaceholder.typicode.com';


test(`get all posts`, async ({ request }) => {
    const response = await request.get(`${BASE_URL}/posts`);
    const responseData = await response.json();

    await expect(response).toBeOK();
    await expect(responseData.body).not.toBeNull;
    await expect.objectContaining({
        id: expect.any(Number),
        title: expect.any(String),
        body: expect.any(String),
        userId: expect.any(Number),
    });
});

test(`get 1 post`, async ({ request }) => {
    const id = 1;

    const response = await request.get(`${BASE_URL}/posts/${id}`);
    const responseData = await response.json();

    await expect(response).toBeOK();
    await expect(responseData.message).not.toBeNull;
    await expect.objectContaining({
        id: id,
        title: expect.any(String),
        body: expect.any(String),
        userId: expect.any(Number),
    });
});

test(`create 1 post`, async ({ request }) => {
    const requestData = {
        body: ({
            title: 'yay!',
            body: 'just test',
            userId: 1,
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    };
    const response = await request.post(`${BASE_URL}/posts/`, requestData);
    const responseData = await response.json();

    await expect(response).toBeOK();
    await expect(responseData.message).not.toBeNull;
    await expect.objectContaining({
        title: requestData.title,
        body: requestData.body.body,
        userId: requestData.userId,
    },
        expect(responseData.id).not.toBeNull() // заранее id не знаем, поэтому просто проверка, что он присвоился
    );
});

test(`edit 1 post`, async ({ request }) => {
    const id = 1;
    const requestData = {
        body: ({
            body: 'just test (edit post)',
        }),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        }
    };
    const response = await request.patch(`${BASE_URL}/posts/${id}`, requestData);
    const responseData = await response.json();

    await expect(response).toBeOK();
    await expect(responseData.message).not.toBeNull;
    await expect.objectContaining({
        title: 'yay!',
        body: requestData.body.body,
        userId: 1,
        id: id
    });
});

[
    { param: 'userId=1', expectedParam: 'userId', expectedValue: 1 },
    { param: 'title=test', expectedParam: 'title', expectedValue: 'test' },
    { param: 'id=1', expectedParam: 'id', expectedValue: 1 },
].forEach(({ param, expectedParam, expectedValue }) => {
    test(`filter posts by ${param}`, async ({ request }) => {
        const response = await request.get(`${BASE_URL}/posts/?${param}`);
        const responseData = await response.json();

        await expect(response).toBeOK();
        await expect(responseData.body).not.toBeNull;
        await expect.objectContaining({
            expectedParam: expectedValue,
        });
    });
});

[
    { route: 'posts', folder: 'comments', postId: 1 },
    { route: 'albums', folder: 'photos', postId: 20 },
    { route: 'users', folder: 'albums', postId: 37 },
    { route: 'users', folder: 'todos', postId: 999 },
    { route: 'users', folder: 'posts', postId: 0 },
].forEach(({ route, folder, postId }) => {
    test(`nested routes are available : ${route}/${folder}`, async ({ request }) => {
        const response = await request.get(`${BASE_URL}/${route}/${postId}/${folder}`);
        const responseData = await response.json();

        await expect(response).toBeOK();
        await expect(responseData.body).not.toBeNull;
        await expect(responseData.id).not.toBeNull();
    });
});