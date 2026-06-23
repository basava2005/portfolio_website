// Helper to fetch with retries for cold start handling
export async function fetchWithRetry(
  url: string,
  options: RequestInit = {},
  maxRetries = 5,
  initialDelay = 2000
): Promise<Response> {
  let lastError: Error | undefined;
  let retriesLeft = maxRetries;

  while (retriesLeft > 0) {
    try {
      const response = await fetch(url, options);
      // 5xx errors are server errors (likely cold start)
      if (response.status >= 500) {
        throw new Error(`Server error: ${response.status}`);
      }
      return response;
    } catch (error) {
      lastError = error as Error;
      retriesLeft--;

      if (retriesLeft > 0) {
        const delay = initialDelay * Math.pow(2, maxRetries - retriesLeft); // Exponential backoff
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }

  throw lastError || new Error("Max retries exceeded");
}
