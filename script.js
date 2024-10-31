// Declare doingAS outside the DOMContentLoaded to maintain its scope
let doingAS = false;

// Wait for the DOM to fully load before running any scripts
document.addEventListener("DOMContentLoaded", function () {
    const checkbox = document.getElementById('myCheckbox');
    const AStarContainer = document.getElementById("AStarContainer");
    const AStarInput = document.getElementById("AStar");
    const dropdown = document.getElementById("course");

    // Toggle visibility of the A* field based on the checkbox state
    checkbox.addEventListener('change', function () {
        doingAS = checkbox.checked; // Update doingAS based on checkbox state
        updateAStarVisibility();
    });

    // Load JSON data and populate the dropdown
    loadJSON("data.json");

    // Attach event to dropdown to populate fields when an option is selected
    dropdown.addEventListener("change", populateAttributes);
});

// Fetch JSON data from the specified file path
function loadJSON(filePath) {
    fetch(filePath)
        .then(response => {
            if (!response.ok) throw new Error(`Failed to load JSON: ${response.status}`);
            return response.json();
        })
        .then(data => populateDropdown(data))
        .catch(error => console.error("Error loading JSON:", error));
}

// Populate dropdown with JSON data options
function populateDropdown(data) {
    const dropdown = document.getElementById("course");

    // Clear previous options
    dropdown.innerHTML = '<option value="">Select a code</option>';

    data.forEach(item => {
        const option = document.createElement("option");
        option.value = item.Code;
        option.textContent = item.Code;
        dropdown.appendChild(option);
    });

    // Store data in a dataset attribute for access in other functions
    dropdown.dataset.rows = JSON.stringify(data);
}

// Populate the form fields based on the selected dropdown item
function populateAttributes() {
    const dropdown = document.getElementById("course");
    const selectedCode = dropdown.value;
    const data = JSON.parse(dropdown.dataset.rows);

    // Find the item with the selected code
    const selectedItem = data.find(item => item.Code === selectedCode);

    if (selectedItem) {
        // Update doingAS based on the AS attribute
        doingAS = selectedItem.AS === "true";

        // Populate each attribute field
        document.getElementById("highest").value = selectedItem.Highest;
        document.getElementById("AStar").value = selectedItem.AStar;
        document.getElementById("A").value = selectedItem.A;
        document.getElementById("B").value = selectedItem.B;
        document.getElementById("C").value = selectedItem.C;
        document.getElementById("D").value = selectedItem.D;
        document.getElementById("E").value = selectedItem.E;

        // Update checkbox state based on AS attribute
        const checkbox = document.getElementById('myCheckbox');
        checkbox.checked = doingAS; // Reflect the AS status on the checkbox

        // Update visibility of the A* container based on AS attribute
        updateAStarVisibility();

        // Debugging: Log to console to track state
        console.log(`Selected Code: ${selectedCode}`);
        console.log(`doingAS: ${doingAS}`);
        console.log(`Checkbox checked: ${checkbox.checked}`);
    } else {
        // Handle case where no item was found
        console.error(`No item found for selected code: ${selectedCode}`);
    }
}

// Function to update the visibility of the A* input based on the checkbox state
function updateAStarVisibility() {
    const AStarContainer = document.getElementById("AStarContainer");
    const AStarInput = document.getElementById("AStar");

    if (doingAS) {
        AStarContainer.style.visibility = 'hidden';
        AStarInput.value = "1";
    } else {
        AStarContainer.style.visibility = 'visible';
        AStarInput.value = "";
    }
}
