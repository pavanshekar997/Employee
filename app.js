// JavaScript source code

$(document).ready(function () {

    //
    var resources = [
            { username: "admin", password: "9035Pavan" },
            { username: "mariotti", password: "Peperone1" },
            { username: "orpelli", password: "spazio" },
            { username: "castagnetti", password: "skype" },
            { username: "campagna", password: "blues" }
    ];

    //**button handlers**
    $("#container input[type=text], #container input[type=password], #container button").button();

    $("#btn_signin").on("click", goToLoginScreen);
    function goToLoginScreen() {
        console.log("login screen");

        $("#splashscreen").hide();
        $("#login").show("fade", "fast");
    };

    $("#btn_submit").on("click", onSubmit);
    function onSubmit() {
        document.getElementById("notify").textContent = "";

        //stop submit button behaviour
        $(this).off("click");
        //input handler
        validateInput();
    };

    $("#btn_cancel").on("click", onCancel);
    function onCancel() {
        document.getElementById("notify").textContent = "";
        resetLoginInput();

        console.log("splashscreen");

        $("#login").hide();
        $("#splashscreen").show("fade", "fast");
    };

    $("#btn_logout").on("click", onLogout);
    function onLogout() {
        document.getElementById("status").textContent = "Logging out";

        //stop logout button behaviour
        $(this).off("click");

        //server delay simulation
        var rand = Math.floor((Math.random() * 3000));
        setTimeout(function () {
            console.log("splashscreen");

            $("#loggedin").hide();
            $("#splashscreen").show("fade", "fast");

            document.getElementById("status").textContent = "Not logged in";

            document.getElementById("hellouser").textContent = "";
            //restore logout button behaviour
            $("#btn_logout").on("click", onLogout);
        }, rand);
    };
    //

    function validateInput() {
        document.getElementById("status").textContent = "Logging in";

        var _user, _password;

        _user = document.getElementById("text_username").value;
        _password = document.getElementById("text_password").value;

        console.log("user " + _user + " password " + _password);

        var char = new RegExp(/^[a-zA-Z0-9- ]*$/);//("\\/,.^");

        if (char.test(_user) == false || char.test(_password) == false) {
            //unvalid input
            document.getElementById("notify").textContent = "Wrong username/password.";
            console.log("login error");

            document.getElementById("status").textContent = "Not logged in";
        }
        else {
            //server delay simulation
            var rand = Math.floor((Math.random() * 2000)+1000);
            setTimeout(function () {
                var srv_answer = server(_user, _password);
                if (srv_answer.success) {
                    $("#login").hide();
                    $("#loggedin").show("fade", "fast");

                    document.getElementById("status").textContent = "Logged in";

                    resetLoginInput();
                }
                else {
                    document.getElementById("notify").textContent = srv_answer.errorMessage;
                    console.log("login error");

                    document.getElementById("status").textContent = "Not logged in";
                }

                document.getElementById("hellouser").textContent = "Hello, " + _user;

                //restore submit button behaviour
                $("#btn_submit").on("click", onSubmit);
            }, rand);
            
        };
    };

    function server(_user, _password) {
        var _userInfo = false;

        for (var i = 0; i < resources.length; i++) {
            if (resources[i].username == _user && resources[i].password == _password) {
                //valid input
                console.log("user authenticated");

                _userInfo = true;

                break;
            }
        };

        switch (_userInfo) {
            case true:
                return { success: true, errorMessage: "" };
                break;
            case false:
                return { success: false, errorMessage: "Wrong username/password." };
                break;
        }
    };



    function resetLoginInput() {
        document.getElementById("text_username").value = "";
        document.getElementById("text_password").value = "";
    };
});






var myInput = document.getElementById("text_password");
var letter = document.getElementById("letter");
var capital = document.getElementById("capital");
var number = document.getElementById("number");
var length = document.getElementById("length");

// When the user clicks on the password field, show the message box
myInput.onfocus = function() {
    document.getElementById("message").style.display = "block";
}

// When the user clicks outside of the password field, hide the message box
myInput.onblur = function() {
    document.getElementById("message").style.display = "none";
}

// When the user starts to type something inside the password field
myInput.onkeyup = function() {
  // Validate lowercase letters
  var lowerCaseLetters = /[a-z]/g;
  if(myInput.value.match(lowerCaseLetters)) {  
    letter.classList.remove("invalid");
    letter.classList.add("valid");
  } else {
    letter.classList.remove("valid");
    letter.classList.add("invalid");
  }
  
  // Validate capital letters
  var upperCaseLetters = /[A-Z]/g;
  if(myInput.value.match(upperCaseLetters)) {  
    capital.classList.remove("invalid");
    capital.classList.add("valid");
  } else {
    capital.classList.remove("valid");
    capital.classList.add("invalid");
  }

  // Validate numbers
  var numbers = /[0-9]/g;
  if(myInput.value.match(numbers)) {  
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }
  
  // Validate length
  if(myInput.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
}















var jsonDataEmployee = [
    {
        "Id": 1,
        "EmployeeName": "test1",
        "EmployeeAge": "11",
        "EmployeeGender": "male",
        "EmployeeE-mail": "test1@gmail.com",
        "EmployeePhoneNo": "9191919191"
      },
      {
        "Id": 2,
        "EmployeeName": "test2",
        "EmployeeAge": "12",
        "EmployeeGender": "male",
        "EmployeeE-mail": "test2@gmail.com",
        "EmployeePhoneNo": "9292929292"
      },
      {
        "Id": 3,
        "EmployeeName": "test3",
        "EmployeeAge": "13",
        "EmployeeGender": "male",
        "EmployeeE-mail": "test3@gmail.com",
        "EmployeePhoneNo": "9393939393"
      },  
      {
        "Id": 4,
        "EmployeeName": "test1",
        "EmployeeAge": "11",
        "EmployeeGender": "male",
        "EmployeeE-mail": "test1@gmail.com",
        "EmployeePhoneNo": "9191919191"
      },
      
]

window.onload = JSONToHTMLTable(jsonDataEmployee, "tblEmployee");

function JSONToHTMLTable(jsonData, elementToBind) {

 //This Code gets all columns for header   and stored in array col
 var col = [];
 for (var i = 0; i < jsonData.length; i++) {
     for (var key in jsonData[i]) {
         if (col.indexOf(key) === -1) {
             col.push(key);
         }
     }
 }

 //This Code creates HTML table
 var table = document.createElement("table");


 //This Code getsrows for header creader above.
 var tr = table.insertRow(-1);

 for (var i = 0; i < col.length; i++) {
     var th = document.createElement("th");
     th.innerHTML = col[i];
     tr.appendChild(th);
 }

 //This Code adds data to table as rows
 for (var i = 0; i < jsonData.length; i++) {

     tr = table.insertRow(-1);

     for (var j = 0; j < col.length; j++) {
         var tabCell = tr.insertCell(-1);
         tabCell.innerHTML = jsonData[i][col[j]];
     }
 }

 //This Code gets the all columns for header
 var divContainer = document.getElementById(elementToBind);
 divContainer.innerHTML = "";
 divContainer.appendChild(table);
}









function showTime(){
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var session = "AM";
    
    if(h == 0){
        h = 12;
    }
    
    if(h > 12){
        h = h - 12;
        session = "PM";
    }
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    var time = h + ":" + m + ":" + s + " " + session;
    document.getElementById("MyClockDisplay").innerText = time;
    document.getElementById("MyClockDisplay").textContent = time;
    
    setTimeout(showTime, 1000);
    
}

showTime();

function showTime1(){
    var date = new Date();
    var h = date.getHours(); // 0 - 23
    var m = date.getMinutes(); // 0 - 59
    var s = date.getSeconds(); // 0 - 59
    var session = "AM";
    
    if(h == 0){
        h = 12;
    }
    
    if(h > 12){
        h = h - 12;
        session = "PM";
    }
    
    h = (h < 10) ? "0" + h : h;
    m = (m < 10) ? "0" + m : m;
    s = (s < 10) ? "0" + s : s;
    
    var time = h + ":" + m + ":" + s + " " + session;
    document.getElementById("MyClockDisplay1").innerText = time;
    document.getElementById("MyClockDisplay1").textContent = time;
    
    setTimeout(showTime, 1000);
    
}

showTime();