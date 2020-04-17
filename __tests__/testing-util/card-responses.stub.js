/**
 * Setup some data to test against.
 *
 * These are very simple stubs and can't possibly cover the nuances of the entire
 * remote api.  They should, however, be sufficient to determine if code in this package is functioning as intended
 * assuming that the remote api does not change.
 */

/**
 * Just some cards as they were actually returned from the remote api
 * @type {Array<ElderScrollsCard>}
 */
const CARD_STUBS = [
  Object.freeze({
    "name": "Raise Dead",
    "rarity": "Legendary",
    "type": "Action",
    "cost": 2,
    "set": {
      "id": "cs",
      "name": "Core Set",
      "_self": "https://api.elderscrollslegends.io/v1/sets/cs"
    },
    "collectible": false,
    "text": "Summon a random creature from each discard pile.",
    "attributes": ["Endurance"],
    "unique": false,
    "imageUrl": "https://images.elderscrollslegends.io/cs/raise_dead.png",
    "id": "ce7be2e72d6b06a52e50bed01952801ca4ecfade"
  })
];

/**
 * Generate some stub data for the _links property that appears in an ElderScrollsCardPage.
 * If the page is the only page then there won't be a _links property
 * @param page
 * @param numberOfPages
 * @returns {{}|{_links:ElderScrollsPaginationData}}
 */
function makePaginationStub(page, numberOfPages) {
  const prev = page !== 1 ? 'http://a.url.com' : undefined;
  const next = page !== numberOfPages ? 'http://a.url.com' : undefined;

  if (!prev && !next) {
    return {};
  }

  return {
    _links: {
      ...prev && { prev },
      ...next && { next }
    }
  };
}

/**
 * Generate some stub data that can be used as a response body to approximate a response from the remote api
 * @param pageSize
 * @param page
 * @return ElderScrollsCardsPage
 */
function makeCardsPageStub({_pageSize, page, numberOfPages}) {
  return {
    cards: Array.from(Array(_pageSize), () => CARD_STUBS[0]),
    _pageSize,
    _totalCount: _pageSize * numberOfPages, // No partial pages for now
    ...makePaginationStub(page, numberOfPages)
  };
}

/**
 * Mock a valid card page response from the remote api in a format that jest-fetch-mock understands
 * @param _pageSize
 * @param page
 * @param numberOfPages
 * @returns {[string, {status: number}]}
 */
export default function makeFetchMockCardResponse({_pageSize = 20, page = 1, numberOfPages = 10}) {
  return [
    JSON.stringify(makeCardsPageStub({_pageSize, page, numberOfPages })),
    {status: 200}
  ]
}

/**
 * Mock an error response from the remote api in a format that jest-fetch-mock understands
 * @returns {(string|{status: number})[]}
 */
export function makeFetchMock500Response() {
  return [
    'We had a problem with our server. Please try again later',
    {status: 500}
  ]
}