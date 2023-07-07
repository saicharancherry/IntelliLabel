const BASE_URL = 'https://example.com/api';

export async function fetchDomains() {
    const domains = ['Agriculture', 'Vehicles', 'Sports', 'Healthcare', 'Education'];

    try {
    const response = await fetch(`${BASE_URL}/domains`);
    if (!response.ok) {
        return domains;
      throw new Error('Failed to fetch domains');
    }
    const data = await response.json();
    return data.domains;
  } catch (error) {
    return domains;
    console.error('Error fetching domains:', error);
    return [];
  }
}
