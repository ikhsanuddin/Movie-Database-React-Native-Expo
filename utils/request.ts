

export const requestDB = async ({ params }: { params: any }) => {

  const requestParams = new URLSearchParams(params).toString()

  const movieDBKey = 'e320329b'
  const movieDBUrl = 'https://www.omdbapi.com'
  try {
    const response = await fetch(`${movieDBUrl}/?apikey=${movieDBKey}&${requestParams}`);

    const json = await response.json();

    if (json.Error) {
      throw json.Error;
    } else {
      return json;
    }
  } catch (error) {
    return error;
  }
};
