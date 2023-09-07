const orderForm = document.getElementById("orderForm");
const billList = document.getElementById("billList");
let editing = false;

// Function to add an item to the bill
function addToBill(event) {
    event.preventDefault();
    const dish = document.getElementById("dish").value;
    const table = document.getElementById("table").value;
    const price = parseFloat(document.getElementById("price").value);

    if (!editing) {
        const listItem = document.createElement("li");
        listItem.innerHTML = `${dish} - ${table} - $${price.toFixed(2)} <button class="edit" onclick="editOrder(this)">Edit</button> <button class="delete" onclick="deleteOrder(this)">Delete</button>`;
        billList.appendChild(listItem);
    } else {
        const editedItem = document.querySelector(".editing");
        editedItem.innerHTML = `${dish} - ${table} - $${price.toFixed(2)} <button class="edit" onclick="editOrder(this)">Edit</button> <button class="delete" onclick="deleteOrder(this)">Delete</button>`;
        editing = false;
        editedItem.classList.remove("editing");
    }

    orderForm.reset();
}

// Function to edit an order
function editOrder(button) {
    editing = true;
    const listItem = button.parentNode;
    listItem.classList.add("editing");

    const parts = listItem.textContent.split(" - ");
    const dish = parts[0];
    const table = parts[1];
    const price = parseFloat(parts[2].replace("$", ""));
    
    document.getElementById("dish").value = dish;
    document.getElementById("table").value = table;
    document.getElementById("price").value = price;
}

// Function to delete an order
function deleteOrder(button) {
    const listItem = button.parentNode;
    listItem.remove();
}


// Load the bill from localStorage
window.addEventListener("DOMContentLoaded", () => {
    const savedBill = JSON.parse(localStorage.getItem("bill")) || [];
    savedBill.forEach((item) => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `Dish: ${item.dish} - Table: ${item.table} - Price: $${item.price.toFixed(2)} <button class="edit" onclick="editOrder(this)">Edit</button> <button class="delete" onclick="deleteOrder(this)">Delete</button>`;
        billList.appendChild(listItem);
    });
});

// Function to save the bill to localStorage
function saveBillToLocalStorage() {
    const billItems = Array.from(billList.children).map((item) => {
        const parts = item.textContent.split(" - ");
        const dish = parts[0].replace("Dish: ", "");
        const table = parts[1].replace("Table: ", "");
        const price = parseFloat(parts[2].replace("Price: $", ""));
        return { dish, table, price };
    });
    localStorage.setItem("bill", JSON.stringify(billItems));
}

// Add event listener for form submission
orderForm.addEventListener("submit", addToBill);

// Add event listener for window unload to save the bill
window.addEventListener("beforeunload", saveBillToLocalStorage);

