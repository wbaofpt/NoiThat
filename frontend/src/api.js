const base = import.meta.env.VITE_API_URL || 'http://localhost:4000';
export async function api(path, options = {}) {
  const response = await fetch(`${base}/api${path}`, {
    ...options, credentials: 'include',
    headers: { 'Content-Type': 'application/json', 'X-Nep-Request': '1', ...options.headers },
  });
  if (response.status === 204) return null;
  const result = await response.json();
  if (!response.ok) {
    const error = new Error(result.error || 'Không thể xử lý yêu cầu.');
    error.status = response.status;
    throw error;
  }
  return result;
}
