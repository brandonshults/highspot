// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom/extend-expect';

// fetch is used for network requests, this will mock fetch for testing purposes so no network request will be made.
// It could be set as opt-in, but to prevent the possibility of accidentally slamming the remote server, it will be
// set to intercept all fetch calls.
import { enableFetchMocks } from 'jest-fetch-mock';

enableFetchMocks();
