// Sample array of contacts
var contacts = [
    { id: 1, name: 'John Doe', email: "kajaldalai1@gmail.com" },
    { id: 2, name: 'Jane Smith' },
    { id: 3, name: 'Bob Johnson' },
    // Add more contacts as needed
];

// Function to display the contacts in the UI
function displayContacts() {
    var contactList = document.getElementById('contact-list');
    contactList.innerHTML = '';

    for (var i = 0; i < contacts.length; i++) {
        var contact = contacts[i];
        var contactItem = document.createElement('div');
        contactItem.className = 'contact-item';

        var contactName = document.createElement('span');
        contactName.innerText = contact.name;

        var deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('data-id', contact.id);
        deleteButton.addEventListener('click', deleteContact);

        contactItem.appendChild(contactName);
        contactItem.appendChild(deleteButton);
        contactList.appendChild(contactItem);
    }
}

// Function to delete a contact
function deleteContact(event) {
    var contactId = parseInt(event.target.getAttribute('data-id'));

    // Find the contact index in the array
    var contactIndex = contacts.findIndex(function(contact) {
        return contact.id === contactId;
    });

    if (contactIndex !== -1) {
        // Remove the contact from the array
        contacts.splice(contactIndex, 1);
        // Update the UI
        displayContacts();
        // Save the updated contact list in the local storage
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }
}

// Load contacts from local storage on page load
window.onload = function() {
    var storedContacts = localStorage.getItem('contacts');
    if (storedContacts) {
        contacts = JSON.parse(storedContacts);
    }
    displayContacts();
};