/**
 * This test tests the elder scrolls sdk inside of this package.  It does not integrate with
 * elderscrollslegends.io, instead it makes use of stubs and mocks that are setup in
 * "/__tests__/testing-util/mock-cards-response."  If the elderscrollslegends.io changes, this will not detect that.
 */
import fetchMock from 'jest-fetch-mock';
import makeFetchMockCardResponse, {
  makeDelayedMockCardResponse,
  makeFetchMock500Response
} from '../../__tests__/testing-util/card-responses.stub';
import { makeCardsPager, CARD_QUERY_URL } from './elder-scrolls-sdk';

const isCardsPage = (page) => Array.isArray(page.cards);

const isErrorPage = (page) => !!page?.error;

describe('The elder scrolls sdk', () => {
  beforeEach(() => {
    fetchMock.mockIf(new RegExp(CARD_QUERY_URL));
    fetch.resetMocks();
  });

  test('The cards page only returns one page of result when the remote api only has one page.', async () => {
    fetch.mockResponses(makeFetchMockCardResponse({ _pageSize: 20, page: 1, numberOfPages: 1 }));
    const cardsPager = makeCardsPager();
    const firstPage = await cardsPager.getNextPage();
    expect(isCardsPage(firstPage.value)).toBe(true);
    expect(firstPage.done).toBe(true);
  });

  test('The cards pager returns two pages of results when the remote api has two pages.', async () => {
    fetch.mockResponses(
      makeFetchMockCardResponse({ _pageSize: 20, page: 1, numberOfPages: 2 }),
      makeFetchMockCardResponse({ _pageSize: 20, page: 2, numberOfPages: 2 }),
    );

    const cardsPager = makeCardsPager();
    const firstPage = await cardsPager.getNextPage();
    const secondPage = await cardsPager.getNextPage();
    expect(isCardsPage(firstPage.value)).toBe(true);
    expect(firstPage.done).toBe(false);

    expect(isCardsPage(secondPage.value)).toBe(true);
    expect(secondPage.done).toBe(true);
  });

  test('The cards pager should not produce more results when a non-ok response is received', async () => {
    fetch.mockResponses(
      makeFetchMockCardResponse({ _pageSize: 20, page: 1, numberOfPages: 3 }),
      makeFetchMock500Response(),
      makeFetchMockCardResponse({ _pageSize: 20, page: 3, numberOfPages: 3 }),
    );

    const cardsPager = makeCardsPager();
    const firstPage = await cardsPager.getNextPage();
    const secondPage = await cardsPager.getNextPage();
    expect(isCardsPage(firstPage.value)).toBe(true);
    expect(firstPage.done).toBe(false);

    expect(isErrorPage(secondPage.value)).toBe(true);
    expect(secondPage.done).toBe(true);

    const thirdPage = await cardsPager.getNextPage();
    expect(thirdPage.value).toBe(undefined);
    expect(thirdPage.done).toBe(true);
  });

  test('The cards pager should tell us when it is still fetching.', async () => {
    fetch.mockResponse(makeDelayedMockCardResponse({ _pageSize: 20, page: 1, numberOfPages: 1 }));
    const cardsPager = makeCardsPager();
    cardsPager.getNextPage();
    expect(cardsPager.getIsFetching()).toBe(true);
  });
});
