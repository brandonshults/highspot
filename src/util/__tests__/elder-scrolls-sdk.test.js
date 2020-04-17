/**
 * This test tests the elder scrolls sdk inside of this package.  It does not integrate with
 * elderscrollslegends.io, instead it makes use of stubs and mocks that are setup in
 * "/__tests__/testing-util/mock-cards-response."  If the elderscrollslegends.io changes, this will not detect that.
 */
import fetchMock from "jest-fetch-mock";
import makeFetchMockCardResponse, { makeFetchMock500Response } from "../../../__tests__/testing-util/card-responses.stub";
import { getCardsGenerator, isCardsPage, isErrorPage, CARD_QUERY_URL } from "../elder-scrolls-sdk";

describe('The elder scrolls sdk', () => {
  beforeEach(() => {
    fetchMock.mockIf(new RegExp(CARD_QUERY_URL));
    fetch.resetMocks();
  });

  test('The cards generator only returns one page of result when the remote api only has one page.', async () => {
    fetch.mockResponses(makeFetchMockCardResponse({ _pageSize: 20, page: 1, numberOfPages: 1 }));
    const cardsGenerator = getCardsGenerator();
    const firstPage = await cardsGenerator.next();
    expect(isCardsPage(firstPage.value)).toBe(true);
    expect(firstPage.done).toBe(true);
  });

  test('The cards generator returns two pages of results when the remote api has two pages.', async () => {
    fetch.mockResponses(
      makeFetchMockCardResponse({ _pageSize: 20, page: 1, numberOfPages: 2 }),
      makeFetchMockCardResponse({ _pageSize: 20, page: 2, numberOfPages: 2 })
    );

    const cardsGenerator = getCardsGenerator();
    const firstPage = await cardsGenerator.next();
    const secondPage = await cardsGenerator.next();
    expect(isCardsPage(firstPage.value)).toBe(true);
    expect(firstPage.done).toBe(false);

    expect(isCardsPage(secondPage.value)).toBe(true);
    expect(secondPage.done).toBe(true);
  });

  test('The cards generator should not produce more results when a non-ok response is received', async () => {
    fetch.mockResponses(
        makeFetchMockCardResponse({ _pageSize: 20, page: 1, numberOfPages: 2 }),
        makeFetchMock500Response()
    );

    const cardsGenerator = getCardsGenerator();
    const firstPage = await cardsGenerator.next();
    const secondPage = await cardsGenerator.next();
    expect(isCardsPage(firstPage.value)).toBe(true);
    expect(firstPage.done).toBe(false);

    expect(isErrorPage(secondPage.value)).toBe(true);
    expect(secondPage.done).toBe(true);
  });
})