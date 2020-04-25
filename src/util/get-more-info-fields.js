const FIELDS_TO_SHOW = ['cost', 'power', 'health', 'soulSummon', 'soulTrap', 'attributes'];

function formatFieldForDisplay(field) {
  const formatted = field.replace(/([A-Z])/g, ' $1'); // Add a space before every uppercase letter
  return formatted.charAt(0).toUpperCase() + formatted.slice(1); // Upper the first letter
}

function formatValueForDisplay(value) {
  return [].concat(value).join(', ');
}

export default function getMoreInfoFields(card) {
  return FIELDS_TO_SHOW
    .filter((field) => field in card)
    .map((field) => ([formatFieldForDisplay(field), formatValueForDisplay(card[field])]));
}
