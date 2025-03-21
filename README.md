# Project Setup Instructions

This guide will walk you through the steps to set up and run the project.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (with npm)
- A terminal or command prompt

## Setup Instructions

Follow these steps to set up and run the project:

1. **Navigate to the React-Extension directory**  
   Open your terminal or command prompt and run the following command:

   ```bash
   cd React-Extension
    ```
2. **Build the React Project**
    Run the following command to build the React project:
    ```bash
    npm run build
    ```
3. **Return to the root folder**
    Navigate back to the root folder of the project:
    ```bash
    cd ..
    ```
4. **Copy the build files to the public directory**
    Use the following command to copy the contents of the build folder to the public directory:
    ```bash
    xcopy /E /I React-Extension\build\* public/
    ```
5. **Navigate to the aXe-engine directory**
    Change to the aXe-enginer directory:
    ```bash
    cd aXe-engine
    ```
6. **Start the server**
    Start the server by running:
    ```bash
    node server.js
    ```
7. **Open the extension manager**
    Open the extension manager in your browser using this link, and     toggle Developer mode in the top right:
    ```
    chrome://extensions/
    ```
8. **Load unpacked**
    Load an unpacked extension by clicking the button
    Open the **public/** folder in the root of the directory