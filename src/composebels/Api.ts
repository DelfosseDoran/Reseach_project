const baseUrl: string = 'https://api.axesso.de/amz/';

const primerykey: string = import.meta.env.Primery;

const getSearchProducts = async (search: string, page: number) => {
  fetch(
    baseUrl+`amazon-search-by-keyword-asin?domainCode=com&keyword=${search}&page=${page}&sortBy=relevanceblender`,
    {
      method: 'GET',
      // Request headers
      headers: {
        'Cache-Control': 'no-cache',
        'axesso-api-key': primerykey,
      },
    }
  )
    .then((response) => {
      console.log(response.status);
      console.log(response.text());
      return response.json();
    })
    .catch((err) => console.error(err));
};
