
export async function getImages() {
  const response = await fetch('https://picsum.photos/v2/list?page=1&limit=30');
  const payload = await response.json();
  return payload;
}
