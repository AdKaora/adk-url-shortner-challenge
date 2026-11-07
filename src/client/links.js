export async function createLink(url) {
  const response = await fetch('/api/links', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ url })
  });
  const link = await response.json();
  // fetch non considera 400 e 503 errori di rete
  // li trasformo in errori da mostrare nel form
  if (!response.ok) {
    throw new Error(link.error);
  }
  return link;
}
