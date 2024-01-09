const getSearchProducts = async (search: string, page: number) => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/data?search=${search}&page=${page}`,
      {
        method: 'GET',
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    // Handle the error or rethrow it as needed
    throw error;
  }
};

export default () => {
  return {
    getSearchProducts,
  };
};
