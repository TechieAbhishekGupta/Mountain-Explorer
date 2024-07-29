/**
 * Student Information
 * Name: Abhishek Gupta
 * Student ID: 21810094
 */

// Loading initial data when the page loads
document.addEventListener("DOMContentLoaded", function () {
  document.addEventListener("headerLoaded", function () {
    // Calling the function to load hikes data
    loadHikesData().then((hikesData) => {
      // Logging success message and the loaded data
      console.log("Hikes data loaded successfully:", hikesData);

      // Function to handle search inputs and display auto-suggestions
      const searchInput = document.getElementById("searchInput");
      if (searchInput) {
        searchInput.addEventListener("input", function () {
          // Getting search query from input field
          const searchQuery = this.value.trim().toLowerCase();
          // Getting search suggestions container
          const searchSuggestionsContainer =
            document.getElementById("searchSuggestions");

          // Clearing suggestions if search query is empty
          if (searchQuery.length === 0) {
            searchSuggestionsContainer.innerHTML = "";
            searchSuggestionsContainer.style.display = "none";
            return;
          }

          // Loading hikes data and displaying matching hikes as suggestions
          loadHikesData().then((hikesData) => {
            const matchingHikes = searchHikes(hikesData.hikes, searchQuery);
            displaySearchSuggestions(matchingHikes);
          });
        });
      } else {
        console.error("Search input not found!");
      }

      // Function to handle search button click
      const searchButton = document.getElementById("searchButton");
      if (searchButton) {
        searchButton.addEventListener("click", function () {
          // Getting search query from input field
          const searchQuery = document
            .getElementById("searchInput")
            .value.trim()
            .toLowerCase();
          // Loading hikes data and redirecting to search result page with first matching hike
          loadHikesData().then((hikesData) => {
            const matchingHikes = searchHikes(hikesData.hikes, searchQuery);
            if (matchingHikes.length > 0) {
              // Redirecting to search result page with first matching hike
              redirectToSearchResultPage(matchingHikes[0].trailName);
            } else {
              // Logging message when no matching hikes found
              console.log(
                "No matching hikes found for the search query:",
                searchQuery
              );
            }
          });
        });
      } else {
        console.error("Search button not found!");
      }
    });
  });
  });


// Function to load JSON data from hikes.json file
function loadHikesData() {
  // Fetching JSON data from hikes.json file
  return fetch("json/hikes.json")
    .then((response) => {
      // Check if response is ok
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Returning parsed JSON data
      return response.json();
    })
    .catch((error) => {
      // Logging error if fetching data fails
      console.error("Error fetching data:", error);
    });
}

// Function to perform search using Regular Expressions
function searchHikes(hikes, query) {
  // Creating Regular Expression with case-insensitive search
  const regex = new RegExp(query, "i");
  // Filtering hikes based on park or trail name matches
  return hikes.filter(
    (hike) => regex.test(hike.park) || regex.test(hike.trailName)
  );
}

// Function to display search suggestions
function displaySearchSuggestions(hikes) {
  // Getting search suggestions container
  const searchSuggestionsContainer =
    document.getElementById("searchSuggestions");
  // Clearing existing suggestions
  searchSuggestionsContainer.innerHTML = "";

  // Iterate through matching hikes and create list items for suggestions
  hikes.forEach((hike, index) => {
    // Creating list item for each hike
    const listItem = document.createElement("li");
    // Populating list item with park and trail name
    listItem.innerHTML = `
	<span class="park-label">Park:</span> ${hike.park}
	<br>
	<span class="trail-label">Trail:</span> ${hike.trailName}
	`;
    // Setting index of hike as a data attribute
    listItem.dataset.index = index;
    // Adding click event listener to redirect to search result page
    listItem.addEventListener("click", redirectToSearchResultPage);
    // Appending list item to search suggestions container
    searchSuggestionsContainer.appendChild(listItem);
  });

  // Displaying search suggestions container
  searchSuggestionsContainer.style.display = "block";
}

// Function to redirect to Search Result Page
function redirectToSearchResultPage(event) {
  // Retrieving index of hike from clicked list item's data attribute
  const hikeIndex = event.target.dataset.index;
  // Constructing search result URL with hike index as URL parameter
  const searchResultURL = `searchResult.html?hikeIndex=${encodeURIComponent(
    hikeIndex
  )}`;
  // Opening search result page in new tab
  window.open(searchResultURL, "_blank");
}
