import { CARD_WITH_ALL_FIELDS } from '../../../__tests__/testing-util/card-responses.stub';
import getMoreInfoFields, { FIELDS_TO_SHOW, formatFieldForDisplay } from '../get-more-info-fields';

describe('getMoreInfoFields', () => {
  test('should return only fields that exist in the defined list of fields to show.', async () => {
    const sampleCard = CARD_WITH_ALL_FIELDS;
    const moreInfoFields = getMoreInfoFields(sampleCard);
    moreInfoFields.forEach(([key]) => {
      expect(FIELDS_TO_SHOW.some((field) => formatFieldForDisplay(field) === key)).toBe(true);
    });
  });
});
