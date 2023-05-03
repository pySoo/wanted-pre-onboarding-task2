import { API_URL } from '@/constants/config';
import { setSearchResults } from '@/redux/actions/searchAction';
import { store } from '@/redux/store';
import apiClient from '@/services/apiClient';

export const searchAPI = async (searchTerm: string) => {
  try {
    const cachedResult = store.getState().searchReducer.searchResults[searchTerm];
    console.log('cache: ', store.getState().searchReducer.searchResults);

    if (cachedResult) {
      console.log('already cached!');
      return cachedResult;
    } else {
      console.info('calling api');
      const response = await apiClient.get(`${API_URL}/?name=${searchTerm}`);
      const searchResults = response.data;
      if (searchResults.length > 0) {
        store.dispatch(setSearchResults(searchTerm, searchResults.slice(0, 7)));
      }
      return response.data;
    }
  } catch (e) {
    console.error(e);
    alert('API 요청에 실패했습니다.');
    return undefined;
  }
};
