/**
 * Information about an Elder Scrolls card set as it is represented in the remote api
 * @typedef {Object} ElderScrollsAPICardSet
 * @property {string} name
 * @property {string} id
 * @property {string} _self
 */

/**
 * A single card as it is represented in the remote api
 * @typedef {Object} ElderScrollsAPICard
 * @property {number} cost
 * @property {ElderScrollsAPICardSet} set
 * @property {boolean} collectible
 * @property {boolean} unique
 * @property {string} imageUrl
 * @property {string} name
 * @property {Array<string>} attributes
 * @property {string} text
 * @property {string} id
 * @property {string} type
 * @property {string} rarity
 */

/**
 * An object containing pagination data as it represented in the remote api
 * @typedef {Object} ElderScrollsAPIPaginationData
 * @property {string|undefined} next
 * @property {string|undefined} prev
 */

/**
 * Aan array of cards as it comes back from the remote api
 * @typedef {Object} ElderScrollsAPICardsPage
 * @property {Array<ElderScrollsAPICard>} cards
 * @property {number} _pageSize
 * @property {number} _totalCount
 * @property {ElderScrollsAPIPaginationData|undefined} _links
 */

/**
 * A set of cards and _links from the api, along with meta information that is useful for consuming code.
 * @typedef {Object} PaginationPage
 * @property {Array<ElderScrollsAPICard>} cards
 * @property {string} url
 * @property {string} previousUrl
 * @property {string} nextUrl
 * @property {boolean} shouldIgnore
 * @property {Error} error
 * @property {string} id
 * @property {number} _totalCount
 */

/**
 * @typedef {Object} CardsPager
 * @property {function:boolean} getIsFetching
 * @property {function:boolean} getIsDone
 * @property {function:void} cancel
 * @property {Function<Promise<PaginationPage>>} getNextPage
 */

/**
 * An object containing key/value pairs that can be reduced into a querystring to send to the remote api
 * @typedef {Object.<string,string>} PagingParameters
 */
