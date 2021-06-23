let dataList;
let page = 0;

function displayTable(data) {
    let listOfUser ='';
    data.map((listDetails) => {
        // Destructuring
        const {
            id, 
            salutation, 
            firstName, 
            lastName, 
            email,
            gender,
            phoneNo, 
            country, 
            state,
            city,
            date
        } = listDetails;
      listOfUser += `
        <tr>
            <td>${id}</td>
            <td>${salutation}</td>
            <td>${firstName}</td>
            <td>${lastName}</td>
            <td>${email}</td>
            <td>${gender}</td>
            <td>${phoneNo}</td>
            <td>${country}</td>
            <td>${state}</td>
            <td>${city}</td>
            <td>${date}</td>
            <td><button id="delete-${id}" class="delete-btn btn blue lighten-2" onclick="onDeleterow(this)">DELETE</button>
            &nbsp <button id="edit-${id}" class="edit-btn btn blue lighten-2" onclick="onEditrow(this);show();">EDIT</button></td>
        </tr>`;
    })
    document.getElementById("output").innerHTML = listOfUser;
}

// fetch("list.json")
//     .then(response => response.json())
//     .then(data => {

        // console.log(data);
 
        // if (data.length > 0) {
        //     dataList = data;
        //     displayTable(data);        
        // }
    // })

    fetch("list.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        dataList = data;
        const no = parseInt(document.getElementById('page').value);
        const start = page * no;
        const end = page * no + no;
        const action = dataList.slice(start, end);
        displayTable(data);
        displayTable(action);
    })


document.getElementById("previ").addEventListener("click", function () {
    // alert("Hai");
    const no = parseInt(document.getElementById('page').value);
    const start = page * no;
    const end = page * no + no;
    const action = dataList.slice(start, end);
    console.log(action);
    displayTable(action);
})
document.getElementById("next").addEventListener("click", function () {
    const no = parseInt(document.getElementById('page').value);
    const start = no;
    const end = no + 9;
    const action = dataList.slice(start, end);
    console.log(action);
    displayTable(action);
})
document.getElementById("all").addEventListener("click", function () {
    displayTable(dataList);
})

//  Search input
const searchUser = document.getElementById('search-user');

// Search input Eventlistner
searchUser.addEventListener('keyup', (e) => {
      // Get input text
        const userText = e.target.value;
        const filterList = dataList.filter(data => (data.firstName.toLowerCase()).match(userText.toLowerCase()));         
        console.log(filterList);
        displayTable(filterList);
})

// First Name sort 
let isAscFirstName = true;
// let isAscFirstNameSorted = true;
const firstNameSort = document.getElementById('fname-sort');
firstNameSort.addEventListener('click', (e) => {
   if (isAscFirstName)  {
        dataList.sort((a,b) => {
            isAscFirstName = false;
            var firstName = a.firstName.toLowerCase();
            var secondName = b.firstName.toLowerCase();
            // Ternary Operator (if it will check the condition ) then -1 else if()
            return (firstName < secondName) ? -1 : (firstName > secondName) ? 1 : 0;
    })
    } else {
        dataList.sort((a,b) => {
            isAscFirstName = true;
            var firstName = a.firstName.toLowerCase();
            var secondName = b.firstName.toLowerCase();
            // Ternary Operator (if it will check the condition ) then -1 else if()
            return (firstName < secondName) ? 1 : (firstName > secondName) ? -1 : 0;
        })
    }
    displayTable(dataList);
})

// Date Sorted
let isAscDate = true;
// let isAscDateSorted = true;
const dateSort = document.getElementById('date-sort');
dateSort.addEventListener('click', (e) => {
   if (isAscDate)  {
        dataList.sort((a,b) => {
            isAscDate = false;
            var date = new Date(a.date);
            console.log(date);
            var secondDate = new Date(b.date);
            // Ternary Operator (if it will check the condition ) then -1 else if()
            return (date - secondDate) ;
    })
    } else {
        dataList.sort((a,b) => {
            isAscDate = true;
            var date = new Date(a.date);
            var secondDate = new Date(b.date);
            // Ternary Operator (if it will check the condition ) then -1 else if()
            return (secondDate - date);
        })
    }
    displayTable(dataList);
})


function onDeleterow(data) {  
    //delete-1 => 1 
    const confirm = window.confirm("Do you want to Delete?");
    if(confirm) {
        const idForDelete = (data.id).substring(7,10);
        console.log(idForDelete);
        const filterList = dataList.filter(data => (data.id) !== parseInt(idForDelete));  
        alert("Deleted Successfully!!!!");
        displayTable(filterList);   
           
    }
    // console.log("click on this button" , data.id);
    
}

function onEditrow(data) {
    //edit-1 => 1 
    const confirm = window.confirm("Do you want to Edit details?");
    if(confirm) {
        const idForEdit = (data.id).substring(5,10);
        console.log(idForEdit);
        const dataToEdit = dataList.filter(data => (data.id) === parseInt(idForEdit)); 
        console.log(dataToEdit);
        show();
        
      //  displayTable(filterList);      
    }   
}
// Hide the data onLoad

function hide() {
    document.getElementById('popup').style.display = 'none';
};
function show() {
    document.getElementById('popup').style.display = 'block';
};

// Add User Save 

function saveForm() {
    const id = document.getElementById('reg-id').value;
    if (id === '') {
        alert("Please Enter your ID ");
        show();
        return;
    }
    const salutation = document.getElementById('reg-salutation').value;
    if (salutation === '') {
        alert("Please Enter your Salutation");
        show();
        return;
    }
    const firstName = document.getElementById('reg-firstname').value;
    if (firstName === '') {
        alert("Please Enter your First Name ");
        show();
        return;
    }
    const lastName = document.getElementById('reg-lastname').value;
    if (lastName === '') {
        alert("Please Enter your Last Name ");
        show();
        return;
    }
    const email = document.getElementById('reg-email').value;
    if (email === '') {
        alert("Please Enter your Email");
        show();
        return;
    }
    const phoneNo = document.getElementById('reg-phoneNo').value;
    if (phoneNo === '') {
        alert("Please Enter your Phone Number");
        show();
        return;
    }
    let newEntry = {};
    
    newEntry.id = id;
    newEntry.salutation = salutation;
    newEntry.firstName = firstName;
    newEntry.lastName = lastName; 
    newEntry.email = email;
    newEntry.phoneNo = phoneNo;

    // const date = document.getElementById('reg-date').value;
    // const today = Date.now;
    var date = new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();

    date = mm + '/' + dd + '/' + yyyy;
    // document.write(date);
    // const date = new Date(timeElapsed);
    newEntry.date = date;

    const gender = document.querySelector('[name="gender"]:checked').value;
    newEntry.gender = gender;
    const country = document.getElementById('reg-sel1').value;
    newEntry.country = country;
    const state = document.getElementById('reg-sel2').value;
    newEntry.state = state;
    const city = document.getElementById('reg-city').value;
    newEntry.city = city;
    console.log(newEntry);
    dataList.push(newEntry);
    displayTable(dataList);
    console.log(dataList);
    alert("Saved Successfully!!!!");
}


// Display State based On COUNTRY 
    
    const selectedCountry = document.getElementById('reg-sel1');
    selectedCountry.addEventListener('blur', (e) => {
        let displayState = '';
        console.log(displayState);
        if(selectedCountry.value === 'India') {
            const indiaState = ['Kerala','Tamil Nadu','Karnataka',
                           'Telangana','Andhra Pradesh','Arunachal Pradesh',
                           'Assam','Bihar', 'Chhattisgarh', 'Goa', 'Gujarat'];
           
            indiaState.forEach( state => {
                displayState += `
                <option>${state}</option>`
            }); 
            console.log(displayState);
        } else {
            const australiaState = ['Victoria','New South Wales','Queensland','South Australia','Tasmania','Western Australia'];
            australiaState.forEach( state => {
                displayState += `
                <option>${state}</option> `
            }); 
            console.log(displayState);
        }
        document.getElementById("reg-sel2").innerHTML = displayState;
    }) 
   
   