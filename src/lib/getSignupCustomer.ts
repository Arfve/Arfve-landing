export async function fetchCustomers() {
    // const baseURL = process.env.NEXT_PUBLIC_BASE_URL
    try {
      const response = await fetch(`/api/crowdfunding`);
      if (!response.ok) {
        throw new Error('Failed to fetch customers');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching customers:', error);
      throw error;
    }
  }
  