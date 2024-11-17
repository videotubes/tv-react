// Fetch more videos, used and trigger by Home page component
const FetchMore = async (apiUrl) => {
  try {
    const response = await fetch(apiUrl);
    const jsonData = await response.json();
    return jsonData;
  }
  catch (error) {
    console.error(`Error fetching data from ${apiUrl}:`, error);
    throw error;
  }
};

export default FetchMore;
