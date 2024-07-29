/**
 * Student Information
 * Name: Abhishek Gupta
 * Student ID: 21810094
 */

/**
 * Function to display a modal with information about a hiking trail.
 * @param {Object} hike - The object containing information about the hiking trail.
 */
function showModal(hike) {
  // Getting the modal element by ID
  const modal = document.getElementById("modal");

  // Array containing IDs of elements in the modal
  const modalElements = [
    "park",
    "trailName",
    "difficultyLevel",
    "length",
    "activity",
    "shortDescription",
    "longDescription",
    "source",
  ];

  // Getting the container for images in the modal
  const modalImages = document.getElementById("images");

  // Updating text content of modal elements with hike information
  modalElements.forEach((element) => {
    document.getElementById(element).textContent = hike[element];
  });

  // Generating HTML for images and appending them to the modal
  modalImages.innerHTML = hike.images
    .map((image) => `<img src="${image}" />`)
    .join("");

  // Displaying the modal
  modal.style.display = "block";

  // Adding event listener to close button to hide the modal when clicked
  document
    .querySelector(".close")
    .addEventListener("click", () => (modal.style.display = "none"));

  // Adding event listener to hide the modal when clicking outside of it
  window.addEventListener("click", (event) =>
    event.target === modal ? (modal.style.display = "none") : null
  );
}

// Fetching data from the 'hikes.json' file
fetch("./../../json/hikes.json")
  // Parsing the response as JSON
  .then((response) => response.json())
  // Processing the JSON data
  .then((data) => {
    // Extracting the 'hikes' array from the received data
    const hikes = data.hikes;

    // Getting the table body element to which hike data will be appended
    const tableBody = document.getElementById("hikesTableBody");

    // Delay between appending each hike data
    const delay = 1000; // 1 second

    // Function to append hike data with delay
    function appendHikeDataWithDelay(index) {
      // Getting the hike object at the specified index
      const hike = hikes[index];

      // Creating a new table row for the hike data
      const row = document.createElement("tr");
      // Filling the row with hike data
      row.innerHTML = `
        <td><a href="#" class="hikeLink">${hike.park}</a></td>
        <td>${hike.trailName}</td>
        <td>${hike.difficultyLevel}</td>
        <td>${hike.length}</td>
        <td>${hike.activity}</td>
        <td>${hike.shortDescription}</td>
        <td>${hike.source}</td>
      `;
      // Appending the row to the table body
      tableBody.appendChild(row);

      // Removing loader if all data has been appended
      if (index === hikes.length - 1) {
        // Finding and removing the loader row
        const loaderRow = tableBody.querySelector("tr");
        loaderRow.parentNode.removeChild(loaderRow);
      }

      // Event listener for the hike links
      const hikeLinks = document.querySelectorAll(".hikeLink");
      hikeLinks.forEach((link) => {
        // Adding click event listener to each hike link
        link.addEventListener("click", function (event) {
          event.preventDefault();
          // Finding the clicked hike by its park name
          const clickedHike = hikes.find((h) => h.park === link.textContent);
          // Displaying modal with clicked hike data
          showModal(clickedHike);
        });
      });
    }

    // Appending each hike data with delay
    for (let i = 0; i < hikes.length; i++) {
      setTimeout(() => {
        appendHikeDataWithDelay(i);
      }, i * delay);
    }
  })
  // Handling errors during data loading or processing
  .catch((error) => console.error("Error loading hikes:", error));
