document.querySelector('#restaurantForm').addEventListener('submit', addUser);
function addUser(event) {
  event.preventDefault();

  const price = document.querySelector('#price').value;
  const dish = document.querySelector('#dish').value;
  const tableNumber = document.querySelector('#tableNo').value;

  const user = {
    price,
    dish,
    tableNumber
  };
  axios.post('https://crudcrud.com/api/18919ab1dbb946e39c166698467be3d9/usersData', user)
    .then(() => {
      displayUsers();
      
    })
}


document.addEventListener("DOMContentLoaded", displayUsers)
function displayUsers() {
  const tableBody = document.querySelector("#restaurantTable tbody")
  // Clear table body
  tableBody.innerHTML = '';
  axios.get('https://crudcrud.com/api/18919ab1dbb946e39c166698467be3d9/usersData')
    .then((res) => {
     

      res.data.forEach((user) => {
        const row = document.createElement('tr');
        row.innerHTML = `
           <td>${user.price}</td>
           <td>${user.dish}</td>
           <td>${user.tableNumber}</td>
           <td class="actions">
             
             <button class="delete-btn" onclick="deleteUser('${user._id}')">Delete Order</button>
           </td>
         `;

        tableBody.appendChild(row);
      });
    })
    .catch((error) => {
      console.error(error);
    })
}

function deleteUser(index) {



  axios.delete(`https://crudcrud.com/api/18919ab1dbb946e39c166698467be3d9/usersData/${index}`)
    .then(() => {
      
      displayData();
    })
    .catch((error) => {
      displayUsers();
    })
}