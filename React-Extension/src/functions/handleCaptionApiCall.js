import axios from 'axios';

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

  try {
    const response = await axios.post('http://localhost:3001/api/caption/file', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'generate caption from file');
  }
};
  
/**
 * The GenerateCaptionFromUrl function
 * This function takes a URL as input and sends it to the server to generate a caption.
 * It uses the Fetch API to send a POST request to the server with the URL data.
 * @param {String} url - The URL to be sent to the server.
 * @returns The generated caption as a JSON object.
 */
export const generateCaptionFromUrl = async (url) => {
  try {
    const response = await axios.post('http://localhost:3001/api/caption/source', { url });
    return response.data;
  } catch (error) {
    handleAxiosError(error, 'generate caption from URL');
  }
};

  /**
   * The GenerateCaptionsFromWebsiteURL function
   * This function takes a website URL as input and sends it to the server to generate captions for all images on the page.
   * It uses the Fetch API to send a POST request to the server with the website URL data.
   * @param {String} url - The website URL to be sent to the server.
   * @returns The generated captions as a JSON object.
   */
  export const generateCaptionsFromWebsiteURL = async (url) => {
    try {
      const response = await axios.post('http://localhost:3001/api/captions/website', { url });
      return response.data;
    } catch (error) {
      handleAxiosError(error, 'generate captions from website URL');
    }
  };

  const handleAxiosError = (error, context) => {
    if (error.response) {
      // Server responded with a non-2xx status
      throw new Error(
        `Failed to ${context}: ${error.response.status} - ${error.response.data?.message || error.response.statusText}`
      );
    } else if (error.request) {
      // Request was made but no response received
      throw new Error(`Failed to ${context}: No response received from server.`);
    } else {
      // Something else happened while setting up the request
      throw new Error(`Failed to ${context}: ${error.message}`);
    }
  };

// /**
//  * GenerateCaptionFromFile function
//  * This function takes a file as input and sends it to the server to generate a caption.
//  * It uses the Fetch API to send a POST request to the server with the file data.
//  * @param {file} file - The file to be sent to the server.
//  * @returns The generated caption as a JSON object.
//  */
// export const generateCaptionFromFile = async (file) => {
//   const formData = new FormData();
//   formData.append('image', file);

//   const response = await fetch('http://localhost:3001/api/caption/file', {
//     method: 'POST',
//     body: formData,
//   });

//   if (!response.ok) {
//     throw new Error('Failed to generate caption from file');
//   }

//   return response.json();
// };

// /**
// * The GenerateCaptionFromUrl function
// * This function takes a URL as input and sends it to the server to generate a caption.
// * It uses the Fetch API to send a POST request to the server with the URL data.
// * @param {String} url - The URL to be sent to the server.
// * @returns The generated caption as a JSON object.
// */
// export const generateCaptionFromUrl = async (url) => {
//   const formData = new FormData();
//   formData.append('url', url);

//   const response = await fetch('http://localhost:3001/api/caption/source', {
//     method: 'POST',
//     body: formData,
//   });

//   if (!response.ok) {
//     throw new Error('Failed to generate caption from URL');
//   }

//   return response.json();
// };

// /**
//  * The GenerateCaptionsFromWebsiteURL function
//  * This function takes a website URL as input and sends it to the server to generate captions for all images on the page.
//  * It uses the Fetch API to send a POST request to the server with the website URL data.
//  * @param {String} url - The website URL to be sent to the server.
//  * @returns The generated captions as a JSON object.
//  */
// export const generateCaptionsFromWebsiteURL = async (url) => {
//   const formData = new FormData();
//   formData.append('url', url);

//   const response = await fetch('http://localhost:3001/api/captions/website', {
//       method: 'POST',
//       body: formData,
//   });

//   if (!response.ok) {
//       throw new Error('Failed to generate captions from website URL');
//   }

//   return response.json();
// };