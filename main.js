
      function CreateFunction() {
        document.getElementById("demo").innerHTML = "huh";
      }
      function JoinFunction() {
        document.getElementById("demo").innerHTML = "Attempting to Join";
      }

      // Initialize Firebase
      var config = {
        apiKey: "AIzaSyBJSpeiLpsALteamK8s4i86EPbVARLGLi0",
        authDomain: "suggestion-box-c58b1.firebaseapp.com",
        databaseURL: "https://suggestion-box-c58b1.firebaseio.com",
        projectId: "suggestion-box-c58b1",
        storageBucket: "suggestion-box-c58b1.appspot.com",
        messagingSenderId: "608313282468"
      };
      firebase.initializeApp(config);

      var myDatabase = firebase.database().ref();
      var currUser = document.getElementById('currUser');
      //var testBig = document.getElementById('testBig');
      //myDatabase.child('users').on('value', snap => testBig.innerText = snap.val());

      function registerUser(uName, pass) {
      	var usersRef = myDatabase.child("users");
      	var newUser = usersRef.child(uName);
        usersRef.orderByChild("username").equalTo(uName).on("value", function(snapshot) {
          if (snapshot.exists()) {
            console.log("Someone with that username already exists!"); //show taken user message
          } else {
            newUser.set({
          		password: pass,
              username: uName
          	});
            console.log("New user registered"); //take to home page
            currUser.innerHTML = uName;
          }
        });

      }

      function login(uName, pass) {
        var usersRef = myDatabase.child("users");
        usersRef.orderByChild("username").equalTo(uName).on("value", function(snapshot) {
          if (snapshot.exists()) {
            console.log("exists");
            var passWord;
            snapshot.forEach(function(childSnapshot) {
              var key = childSnapshot.key;
              passWord = childSnapshot.val();
            });
            if (passWord.password === pass) {
              console.log("Successful Login"); //take to home page
              currUser.innerHTML = uName;
            } else {
              console.log("Invalid username or password"); //show invalid user/pass message
            }
          } else {
            console.log("Invalid username or password"); //show invalid user/pass message
          }
        });
      }

      function logout() {
        currUser.innerHTML = null;
      }

      function createBox(t, d) {
        var allBoxesRef = myDatabase.child("suggestion boxes");
        var newBox = allBoxesRef.child(currUser.innerText+":"+t);
        newBox.once("value").then(function(snapshot) {
          if (snapshot.exists()) {
            console.log("A box with this title already exists!") //show error message for user trying to create a box they already have
          } else {
            newBox.set({
              title: t,
              description: d,
              owner: currUser.innerText
            });
          }
        });
      }

      function deleteBox(t) {
        
      }
