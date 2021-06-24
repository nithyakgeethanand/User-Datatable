let dataList;
let page = 0;
let pageno = 0;

function pagination(list) {
    // const no = parseInt(document.getElementById('page').value);
    const no = Math.floor(dataList.length/3);
    pageno = Math.floor(dataList.length/3);
    // console.log("length lenth ++++++",Math.floor(no/8));
        const start = page * no;
        const end = page * no + no;
        const action = list.slice(start, end);
        displayTable(action);
}

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
            <td><button id="delete-${id}" class="delete-btn btn blue lighten-2" onclick="onDeleterow(this)"><i class="far fa-trash-alt"></i></button>
            &nbsp <button id="edit-${id}" class="edit-btn btn blue lighten-2" onclick="onEditrow(this);"><i class="far fa-edit"></i></button></td>
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
        // const no = parseInt(document.getElementById('page').value);
        // const start = page * no;
        // const end = page * no + no;
        // const action = dataList.slice(start, end);
        
        // displayTable(action);
        pagination(dataList);
    })


document.getElementById("previ").addEventListener("click", function () {
    // alert("Hai");
    // const no = parseInt(document.getElementById('page').value);
    const no = Math.floor(dataList.length/3);
    const start = page * no; //0
    const end = page * no + no; //8
    console.log('pagination',start,end);
    const action = dataList.slice(start, end);
    // if(end <= dataList.length){
    //     document.getElementById("next").style.display = 'block';
    // }
    document.getElementById("next").style.display = 'block';
    pageno = Math.floor(dataList.length/3);
    console.log(action);
    displayTable(action);
})
document.getElementById("next").addEventListener("click", function () {
    // const no = parseInt(document.getElementById('page').value);
    // const no = Math.floor(dataList.length/3);
    const start = pageno;
    pageno = pageno + pageno;
    const end = pageno;
    const action = dataList.slice(start, end);
    if(dataList.length-end < 0 ) {
        document.getElementById("next").style.display = 'none';
    }
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
        pagination(filterList);
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
            // Ternary Operator (if, it will check the condition ) then -1 else if()
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
    pagination(dataList);
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
    pagination(dataList);
})

// Delete Row
function onDeleterow(data) {  
    //delete-1 => 1 
    const confirm = window.confirm("Do you want to Delete?");
    if(confirm) {
        const idForDelete = (data.id).substring(7,10);
        console.log(idForDelete);
        const filterList = dataList.filter(data => (data.id) !== parseInt(idForDelete));  
        deletemsg();
        // window.confirm("Deleted Successfully!!!!");
        pagination(filterList);   
        
           
    }
    // console.log("click on this button" , data.id);
    
}
let idToDelete;
// Edit Row
function onEditrow(data) {
    //edit-1 => 1 
    const confirm = window.confirm("Do you want to Edit details?");
    if(confirm) {
        const idForEdit = (data.id).substring(5,10);
        console.log(idForEdit);
        const dataToEdit = dataList.filter(data => (data.id) === parseInt(idForEdit)); 
        // console.log("hi",dataToEdit[0]);
        const editUser = dataToEdit[0];
        idToDelete = editUser.id;
        // fetch a object

        document.getElementById('reg-id').value = editUser.id;
        document.getElementById('reg-salutation').value = editUser.salutation;
        document.getElementById('reg-firstname').value =editUser.firstName;
        document.getElementById('reg-lastname').value = editUser.lastName;
        document.getElementById('reg-email').value = editUser.email;
        document.getElementsByName('gender').value = editUser.gender;
        document.getElementById('reg-phoneNo').value = editUser.phoneNo;
        document.getElementById('reg-sel1').value = editUser.country;
        document.getElementById('reg-sel2').value = editUser.state;
        document.getElementById('reg-city').value = editUser.city;
        show();
       
           
    }   
}

// Hide the data onLoad

function hide() {
    document.getElementById('popup').style.display = 'none';
    document.getElementById('popup').reset();
};
function show() {
    document.getElementById('popup').style.display = 'block';
};

// Add User Save 

function saveForm() {
   
    

    if(idToDelete !== '') {
        dataList = dataList.filter(data => (data.id) !== parseInt(idToDelete));
        idToDelete = '';
    } 
    
    const id = document.getElementById('reg-id').value;
  
    const salutation = document.getElementById('reg-salutation').value;
    
    const firstName = document.getElementById('reg-firstname').value;
   
    const lastName = document.getElementById('reg-lastname').value;
   
    const email = document.getElementById('reg-email').value;
   
    const phoneNo = document.getElementById('reg-phoneNo').value;
   
    let newEntry = {};
    
    newEntry.id = id;
    newEntry.salutation = salutation;
    newEntry.firstName = firstName;
    newEntry.lastName = lastName; 
    newEntry.email = email;
    newEntry.phoneNo = phoneNo;

    var date = new Date();
    var dd = String(date.getDate()).padStart(2, '0');
    var mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = date.getFullYear();
    date = mm + '/' + dd + '/' + yyyy;
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
    pagination(dataList);
    console.log(dataList);
    addAlert();
    document.getElementById('popup').reset();
    hide();
}


// Display State based On COUNTRY 
    
    const selectedCountry = document.getElementById('reg-sel1');
    selectedCountry.addEventListener('click', (e) => {
        let displayState = '';
        console.log(displayState);
        if(selectedCountry.value === 'India') {
            document.getElementById('reg-sel2').value = '';
            const indiaState = ['Kerala','Tamil Nadu','Karnataka',
                           'Telangana','Andhra Pradesh','Arunachal Pradesh',
                           'Assam','Bihar', 'Chhattisgarh', 'Goa', 'Gujarat'];
           
            indiaState.forEach( state => {
                displayState += `
                <option>${state}</option>`
            }); 
            console.log(displayState);
            document.getElementById("reg-sel2").innerHTML = displayState;

        } 
        if(selectedCountry.value === 'Australia') {
            document.getElementById('reg-sel2').value = '';
            const australiaState = ['Victoria','New South Wales','Queensland','South Australia','Tasmania','Western Australia'];
            australiaState.forEach( state => {
                displayState += `
                <option>${state}</option> `
            }); 
            console.log(displayState);
            document.getElementById("reg-sel2").innerHTML = displayState;
        }
        
    }) 

        const id = document.getElementById('reg-id');
        id.addEventListener('blur',(e) => {
           
                const re = /^[0-9]{2}$/;
                const errorid = document.getElementById('error-id');
                const errormessageunique = document.getElementById('error-unique');
                errormessageunique.style.display = 'none'; 

                if(!re.test(id.value)) {

                    errorid.style.display = 'block';
                    errormessageunique.style.display = 'none'; 
                } else {
                   
                    errorid.style.display = 'none';
                   const user = dataList.filter(data => data.id === parseInt(id.value));
                   console.log("idddd",user[0]);
                   if(user.length > 0  ) {
                       errormessageunique.style.display = 'block';
                   }              
                }
            }
            );
 
        const firstName = document.getElementById('reg-firstname');

        firstName.addEventListener('blur',(e) => {
           
            const re = /^[a-zA-Z]{2,15}$/;
            const errorfn = document.getElementById('error-fn');
            console.log("eroooooooooooooooooooooooo",errorfn);
            if(!re.test(firstName.value)) {
                
                errorfn.style.display = 'block';
                
            } else {
                errorfn.style.display = 'none';
            }
        } );  

        const lastName = document.getElementById('reg-lastname');

        lastName.addEventListener('blur',(e) => {
           
            const re = /^[a-zA-Z]{2,15}$/;
            const errorln = document.getElementById('error-ln');
            if(!re.test(lastName.value)) {
                
                errorln.style.display = 'block';
                
            } else {
                errorln.style.display = 'none';
            }
        } );  
 
        const email = document.getElementById('reg-email');
        email.addEventListener('blur',(e) => {
           
            const re =  /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
            const erroremail = document.getElementById('error-email');
           
            if(!re.test(email.value)) {
                
                erroremail.style.display = 'block';
                
            } else {
                erroremail.style.display = 'none';
            }
        } );  
  
        const phoneNo = document.getElementById('reg-phoneNo');
        phoneNo.addEventListener('blur',(e) => {
           
            const re =  /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
            const errorphoneno = document.getElementById('error-phoneno');
           
            if(!re.test(phoneNo.value)) {
                
                errorphoneno.style.display = 'block';
                
            } else {
                errorphoneno.style.display = 'none';
            }
        } );  
  
        const city = document.getElementById('reg-city');
        city.addEventListener('blur',(e) => {
           
            const re = /^[a-zA-Z]{2,15}$/;
            const errorcity = document.getElementById('error-city');
            if(!re.test(city.value)) {
                
                errorcity.style.display = 'block';
                
            } else {
                errorcity.style.display = 'none';
            }
        } );  
   
    function deletemsg() {
        document.querySelector(".removed").style.visibility = "visible";
        setTimeout(function () {
            document.querySelector(".removed").style.visibility = "hidden";
        }, 2000);
    };
    function addAlert() {
        document.querySelector(".addalert").style.visibility = "visible";
        setTimeout(function () {
            document.querySelector(".addalert").style.visibility = "hidden";
        }, 3000);
    };

 

