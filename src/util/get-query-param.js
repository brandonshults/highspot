/**
 * @param filters - filters as they exist in GlobalState
 * @returns {Object.<string, string>} - An object that can be turned into a query string
 */
export default function getQueryParamObjectFromFilters(filters) {
  return filters.reduce((paramObject, filter) => {
    if (filter.values.length > 0) {
      return {
        ...paramObject,
        [filter.apiParameter]: filter.values.join('|'),
      };
    }
    return paramObject;
  }, {});
}
