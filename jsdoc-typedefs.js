/**
 * Information about an Elder Scrolls card set as it is represented in the remote api
 * @typedef {Object} ElderScrollsCardSet
 * @property {string} name
 * @property {string} id
 * @property {string} _self
 */

/**
 * A single card as it is represented in the remote api
 * @typedef {Object} ElderScrollsCard
 * @property {number} cost
 * @property {ElderScrollsCardSet} set
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
 * @typedef {Object} ElderScrollsPaginationData
 * @property {string|undefined} next
 * @property {string|undefined} prev
 */

/**
 * A page of cards as it comes back from the remote api
 * @typedef {Object} ElderScrollsCardsPage
 * @property {Array<ElderScrollsCard>} cards
 * @property {number} _pageSize
 * @property {number} _totalCount
 * @property {ElderScrollsPaginationData|undefined} _links
 */