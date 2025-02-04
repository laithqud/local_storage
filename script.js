function validateForm() {
    let name = document.getElementById('name').value;
    let age = document.getElementById('age').value;
    let address = document.getElementById('address').value;
    let email = document.getElementById('email').value;
  
    if (name == "") {
      alert("Name is required.");
      return false;
    }
    if (age == "") {
      alert("Age is required.");
      return false;
    } else if (age < 1) {
      alert("Age must be larger than zero.");
      return false;
    }
    if (address == "") {
      alert("Address is required.");
      return false;
    }
    if (email == "") {
      alert("Email is required.");
      return false;
    } else if (!email.includes("@")) {
      alert("Invalid Email Address.");
      return false;
    }
  
    return true;
  }
  
  var html = "";
  
  function showData() {
    let peopleList;
    if (localStorage.getItem("peopleList") == null) {
      peopleList = [];
    } else {
      peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }
  
    html = ""; // Clear the html variable before appending new rows
    peopleList.forEach(function (element, index) {
      html += `<tr>
        <td>${element.name}</td>
        <td>${element.age}</td>
        <td>${element.address}</td>
        <td>${element.email}</td>
        <td>
          <button onclick="deleteData(${index})" class="btn btn-danger">Delete</button>
          <button onclick="updateData(${index})" class="btn btn-warning m-2">Edit</button>
        </td>
      </tr>`;
    });
  
    document.querySelector("#crudTable tbody").innerHTML = html;
  }
  
  document.addEventListener("DOMContentLoaded", function() {
    showData();
  });
  
  function addData() {
    if (validateForm()) {
      let name = document.getElementById("name").value;
      let age = document.getElementById("age").value;
      let address = document.getElementById("address").value;
      let email = document.getElementById("email").value;
  
      let peopleList;
      if (localStorage.getItem("peopleList") == null) {
        peopleList = [];
      } else {
        peopleList = JSON.parse(localStorage.getItem("peopleList"));
      }
  
      peopleList.push({
        name: name,
        age: age,
        address: address,
        email: email,
      });
  
      localStorage.setItem("peopleList", JSON.stringify(peopleList));
      showData();
  
      // Clear input fields after adding data
      document.getElementById("name").value = "";
      document.getElementById("age").value = "";
      document.getElementById("address").value = "";
      document.getElementById("email").value = "";
    }
  }
  
  function deleteData(index){
    let peopleList;
    if (localStorage.getItem("peopleList") == null) {
      peopleList = [];
    } else {
      peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

    peopleList.splice(index,1);
    localStorage.setItem("peopleList", JSON.stringify(peopleList));
    showData();
  }

  function updateData(index){
    document.getElementById("Submit").style.display="none";
    document.getElementById("Update").style.display="block";

    let peopleList;
    if (localStorage.getItem("peopleList") == null) {
      peopleList = [];
    } else {
      peopleList = JSON.parse(localStorage.getItem("peopleList"));
    }

      document.getElementById("name").value = peopleList[index].name;
      document.getElementById("age").value = peopleList[index].age;
      document.getElementById("address").value = peopleList[index].address;
      document.getElementById("email").value = peopleList[index].email;

      document.getElementById("Update").onclick = function(){
        if(validateForm ()){
            peopleList[index].name = document.getElementById("name").value
            peopleList[index].age = document.getElementById("age").value
            peopleList[index].address = document.getElementById("address").value
            peopleList[index].email = document.getElementById("email").value

            localStorage.setItem("peopleList", JSON.stringify(peopleList));

            showData();

            document.getElementById("name").value = "";
            document.getElementById("age").value = "";
            document.getElementById("address").value = "";
            document.getElementById("email").value = "";


            document.getElementById("Submit").style.display="block";
            document.getElementById("Update").style.display="none";
        }
      }

  }