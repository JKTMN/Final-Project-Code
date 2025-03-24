import axios from "axios";

/**
 * This function handles the API call to the Axe server.
 * By passing a url as a parameter and receiving the response from the server, it sets the loading state, error state, and url state.
 * @param {*} url - The URL to be audited.
 * @param {*} setLoading - The loading state.
 * @param {*} setError - The error state
 * @returns The server response.
 * 
 * Based on {@link https://axios-http.com/docs/post_example} 
 */
export const handleAxeApiCall = async (url, setLoading, setError) => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post("http://localhost:3001/api/audit", { url });
      return {violations: response.data.violations, testsRan: response.data.testsRun};
    } catch (err) {
      setError("Error fetching the violations");
    } finally {
      setLoading(false);
    }
  };