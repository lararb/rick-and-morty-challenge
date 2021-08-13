const API_URL = "https://rickandmortyapi.com/api/character/";
const EPISODES_URL = "https://rickandmortyapi.com/api/episode/";

export const getAllCharacters = (setIsApiError) =>
  fetch(API_URL)
    .then((response) => response.json())
    .catch((error) => setIsApiError(true));

export const getSingleCharacter = (id, setIsApiError) =>
  fetch(`${API_URL}${id}`)
    .then((response) => {
      if (!response.ok) throw Error(response.status);
      return response.json();
    })
    .catch((error) => setIsApiError(true));

export const getEpisodes = (episodesIds) =>
  fetch(`${EPISODES_URL}${episodesIds}`);

export const getFilteredCharacters = (filters, setIsApiError, page) => {
  let filterQueryParams = "";

  Object.entries(filters).forEach((filter) => {
    if (filter[1] !== undefined) {
      filterQueryParams += `&${filter[0]}=${filter[1]}`;
    }
  });

  return fetch(`${API_URL}?page=${page}${filterQueryParams}`).then((response) =>
    response.json().catch((error) => setIsApiError(true))
  );
};
