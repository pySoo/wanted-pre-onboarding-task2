export const setSearchResults = (searchTerm: string, searchResults: SearchResultType[]) => ({
  type: 'SET_SEARCH_RESULTS',
  payload: {
    searchTerm,
    searchResults,
  },
});

export const setPurge = () => ({
  type: 'SET_PURGE',
});
