/**
 * Student Information
 * Name: Abhishek Gupta
 * Student ID: 21810094
 */

// Waiting for the DOM content to be fully loaded before executing the loadMap function
document.addEventListener("DOMContentLoaded", function () {
  loadMap();
});

// Function to load the map
function loadMap() {
  // Setting the slug of the map we want to load
  const mapSlug = "f1d66fbf-3fae-457d-9adf-9086aa634779";

  // Preparing a GET request to fetch map data from the Cartes.io API
  const request = new XMLHttpRequest();
  request.open("GET", `https://cartes.io/api/maps/${mapSlug}`, true);
  request.setRequestHeader("Accept", "application/json");
  // Handling the response from the server
  request.onload = function () {
    // Checking if the response status is successful (200)
    if (request.status === 200) {
      // Parsing the JSON response containing map data
      const mapData = JSON.parse(request.responseText);
      // Construct the URL to load the map based on the slug retrieved from the response
      const mapUrl = `https://cartes.io/api/maps/${mapData.slug}`;

      // Creating an iframe element to display the map
      const iframe = document.createElement("iframe");
      iframe.src = mapUrl; // Set the source URL of the iframe to the map URL

      // Clearing any existing content in the map container before appending the iframe
      const mapContainer = document.getElementById("mapContainer");
      mapContainer.innerHTML = "";

      // Appending the iframe element to the map container to display the map
      mapContainer.appendChild(iframe);
    } else {
      // Handling errors in case the request fails
      console.error("Failed to load map:", request.status, request.statusText);
    }
  };
  // Sending the GET request to fetch map data
  request.send();
}
