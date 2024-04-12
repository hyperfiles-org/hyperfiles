// Function to construct a GitHub API URL given a file path in a repository
const githubUrl = (filePath) =>
  `https://api.github.com/repos/your-username/your-repository/contents/${filePath}`;

// Function to retrieve data from GitHub given a file path
function get(filePath) {
  return fetch(githubUrl(filePath), {
    headers: {
      Accept: "application/vnd.github.v3.raw", // Set Accept header to get raw content of the file
      Authorization: "token YOUR_GITHUB_TOKEN", // Authorization header with your GitHub token
    },
  }).then((response) => {
    if (!response.ok) {
      throw new Error("Failed to fetch data");
    }
    return response.text(); // Use .text() for raw content, not .json()
  });
}

// Function to create and upload data to GitHub, returning a promise with the URL of the uploaded content
function create(filePath, data) {
  // Added filePath to the parameters
  return new Promise((resolve, reject) => {
    if (data.length) {
      const content = btoa(data); // Convert data to Base64 for GitHub API
      fetch(githubUrl(filePath), {
        method: "PUT",
        headers: {
          Accept: "application/vnd.github.v3+json", // Set Accept header to expect JSON responses
          Authorization: "token YOUR_GITHUB_TOKEN", // Authorization header with your GitHub token
          "Content-Type": "application/json", // Set the Content-Type header
        },
        body: JSON.stringify({
          message: `Upload ${filePath}`, // Commit message
          content: content, // Base64 encoded content
        }),
      })
        .then((response) => response.json()) // Parse the JSON response
        .then((data) => {
          if (data.content && data.content.html_url) {
            resolve({ url: data.content.html_url }); // Resolve the promise with the HTML URL of the new content
          } else {
            throw new Error("Invalid response from GitHub");
          }
        })
        .catch((error) => {
          console.error("Error in create function:", error);
          reject(error); // Reject the promise in case of an error
        });
    } else {
      reject("No data provided"); // Reject the promise if no data is provided
    }
  });
}

// Return the get and create functions for use elsewhere
return { get, create };
