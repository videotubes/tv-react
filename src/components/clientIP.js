// Get client IP Address
const ClientIP = async () => {
  try {
    const response = await fetch('https://api.ipify.org/?format=json');
    const jsonData = await response.json();
    return jsonData;
  }
  catch (error) {
    console.error(`Error fetching data:`, error);
    throw error;
  }
};

export default ClientIP;
