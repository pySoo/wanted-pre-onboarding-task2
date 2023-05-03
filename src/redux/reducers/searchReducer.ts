type SearchResultType = {
  searchResults: { [key: string]: SearchResultType[] };
};

const initialState: SearchResultType = {
  searchResults: {},
};

const searchReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SET_SEARCH_RESULTS':
      return {
        ...state,
        searchResults: {
          ...state.searchResults,
          [action.payload.searchTerm]: action.payload.searchResults,
        },
      };
    case 'SET_EXPIRE':
      return initialState;

    default:
      return state;
  }
};

export default searchReducer;
