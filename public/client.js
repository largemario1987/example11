console.log('Client-side code running');

const button = document.getElementById('myButton');
button.addEventListener('click', function(e) {
  console.log('button was clicked');
  console.log(document.getElementById("us").value);
  console.log(document.getElementById("pw").value);
    fetch('/clicked', {
      method: 'POST',    
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
      user: {
            name: document.getElementById("us").value,
            pw: document.getElementById("pw").value
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