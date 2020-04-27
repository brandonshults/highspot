export const FIELDS_TO_SHOW = ['cost', 'power', 'health', 'soulSummon', 'soulTrap', 'attributes'];

/**
 * Basically just take camel case and turn it into title case.
 * @param field
 * @returns {string}
 */
export function formatFieldForDisplay(field) {
  const formatted = field.replace(/([A-Z])/g, ' $1'); // Add a space before every uppercase letter
  return formatted.charAt(0).toUpperCase() + formatted.slice(1); // Upper the first letter
}

/**
 * Most values are a string, but some are an array.  If it's an array, join the entries with a comma.
 * @param value
 * @returns {string}
 */
function formatValueForDisplay(value) {
  return [].concat(value).join(', ');
}

/**
 * Given a card, return an array of attribute/value pair arrays in a fixed order.
 * Make sure that only attributes that exist on the card are returned.
 * @param card
 * @returns {[[string, string]]}
 */
export default function getMoreInfoFields(card) {
  return FIELDS_TO_SHOW
    .filter((field) => field in card)
    .map((field) => ([formatFieldForDisplay(field), formatValueForDisplay(card[field])]));
}
