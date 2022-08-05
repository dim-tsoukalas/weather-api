var input = document.querySelector('#cityinput')
var btn = document.querySelector('#search')
var temp = document.querySelector('#temp')

apiKey = '1ad0a30a3b2d659a6271b81f871d1861'

btn.addEventListener('click', function() {
    
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+ input.value +'&appid=3045dd712ffe6e702e3245525ac7fa38')
  .then(response => {
    //handle response            
    if (response.ok){
        return response.json()
    }
    
    else {
        throw new Error("NETWORK RESPONSE ERROR");
      }
  })
  .then(data => {
    //handle data
    document.getElementById("temp").innerHTML = data['main']['temp']-273.15
    console.log(data['name']);
    
  })
  .catch(error => {
    //handle error
  });
})