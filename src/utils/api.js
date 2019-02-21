export const fetchData = async (url) => {
  const response = await fetch(url);
  if (!response.ok) {
    const errorMessage = await response.json();
    throw new Error(errorMessage);
  }
  return await response;
}