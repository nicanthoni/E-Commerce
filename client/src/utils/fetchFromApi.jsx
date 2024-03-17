let baseUrl = "https://fakestoreapi.com";

export default async function fetchFromApi(path) {
  const res = await fetch(`${baseUrl}/${path}`);
  const data = await res.json();
  return data;
}