/**
 * GenerateCaptionFromFile function
 * This function takes a file as input and sends it to the server to generate a caption.
 * It uses the Fetch API to send a POST request to the server with the file data.
 * @param {file} file - The file to be sent to the server.
 * @returns The generated caption as a JSON object.
 */
export const generateCaptionFromFile = async (file) => {
    const formData = new FormData();
    formData.append('image', file);
  
    const response = await fetch('http://localhost:3001/api/caption/file', {
      method: 'POST',
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error('Failed to generate caption from file');
    }
  
    return response.json();
  };
  
/**
 * The GenerateCaptionFromUrl function
 * This function takes a URL as input and sends it to the server to generate a caption.
 * It uses the Fetch API to send a POST request to the server with the URL data.
 * @param {String} url - The URL to be sent to the server.
 * @returns The generated caption as a JSON object.
 */
export const generateCaptionFromUrl = async (url) => {
    const formData = new FormData();
    formData.append('url', url);
  
    const response = await fetch('http://localhost:3001/api/caption/source', {
      method: 'POST',
      body: formData,
    });
  
    if (!response.ok) {
      throw new Error('Failed to generate caption from URL');
    }
  
    return response.json();
  };

  /**
   * The GenerateCaptionsFromWebsiteURL function
   * This function takes a website URL as input and sends it to the server to generate captions for all images on the page.
   * It uses the Fetch API to send a POST request to the server with the website URL data.
   * @param {String} url - The website URL to be sent to the server.
   * @returns The generated captions as a JSON object.
   */
export const generateCaptionsFromWebsiteURL = async (url) => {
    const formData = new FormData();
    formData.append('url', url);

    const response = await fetch('http://localhost:3001/api/captions/website', {
        method: 'POST',
        body: formData,
    });

    if (!response.ok) {
        throw new Error('Failed to generate captions from website URL');
    }

    return response.json();
};