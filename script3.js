var contacts = [
    { id: 1, name: 'John John', email: 'john@example.com' },
    { id: 2, name: 'Jane Jane', email: 'jane@example.com' },
    { id: 3, name: 'Bob Bob', email: 'bob@example.com' },
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

        var contactEmail = document.createElement('span');
        contactEmail.innerText = ' (' + contact.email + ')';

        var editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.setAttribute('data-id', contact.id);
        editButton.addEventListener('click', editContact);

        var deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.setAttribute('data-id', contact.id);
        deleteButton.addEventListener('click', deleteContact);

        contactItem.appendChild(contactName);
        contactItem.appendChild(contactEmail);
        contactItem.appendChild(editButton);
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

// Function to edit a contact's email
function editContact(event) {
    var contactId = parseInt(event.target.getAttribute('data-id'));

    // Find the contact index in the array
    var contactIndex = contacts.findIndex(function(contact) {
        return contact.id === contactId;
    });

    if (contactIndex !== -1) {
        var newEmail = prompt('Enter the new email address:');
        if (newEmail) {
            // Update the contact's email
            contacts[contactIndex].email = newEmail;
            // Update the UI
            displayContacts();
            // Save the updated contact list in the local storage
            localStorage.setItem('contacts', JSON.stringify(contacts));
        }
    }
}
