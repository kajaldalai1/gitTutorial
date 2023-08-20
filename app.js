// JavaScript (app.js)
const expenseForm = document.getElementById('expenseForm');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const categoryInput = document.getElementById('category');
const expensesList = document.getElementById('expensesList');

let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

function renderExpenses() {
  expensesList.innerHTML = '';
  expenses.forEach((expense, index) => {
    const expenseItem = document.createElement('div');
    expenseItem.innerHTML = `
      <span>${expense.description}: $${expense.amount} (${expense.category})</span>
      <button class="edit" data-index="${index}">Edit</button>
      <button class="delete" data-index="${index}">Delete</button>
    `;
    expensesList.appendChild(expenseItem);
  });
}

function addExpense(description, amount, category) {
    expenses.push({ description, amount, category });
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
  }
  
  function editExpense(index, description, amount, category) {
    expenses[index] = { description, amount, category };
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
  }
  
  function deleteExpense(index) {
    expenses.splice(index, 1);
    localStorage.setItem('expenses', JSON.stringify(expenses));
    renderExpenses();
  }
  
  expenseForm.addEventListener('submit', event => {
    event.preventDefault();
    const description = descriptionInput.value.trim();
    const amount = parseFloat(amountInput.value);
    const category = categoryInput.value.trim();
    if (description && amount && category) {
      const editIndex = expenseForm.dataset.editIndex;
      if (editIndex !== undefined) {
        editExpense(editIndex, description, amount, category);
        delete expenseForm.dataset.editIndex;
      } else {
        addExpense(description, amount, category);
      }
      descriptionInput.value = '';
      amountInput.value = '';
      categoryInput.value = '';
    }
  });
  
  expensesList.addEventListener('click', event => {
    if (event.target.classList.contains('edit')) {
      const index = event.target.dataset.index;
      const expense = expenses[index];
      descriptionInput.value = expense.description;
      amountInput.value = expense.amount;
      categoryInput.value = expense.category;
      expenseForm.dataset.editIndex = index;
    } else if (event.target.classList.contains('delete')) {
      const index = event.target.dataset.index;
      deleteExpense(index);
    }
  });
  
  // Initial rendering of expenses
  renderExpenses();