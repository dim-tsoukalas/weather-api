var input = document.querySelector('#cityinput')
var btn = document.querySelector('#search')
var city = document.querySelector('#city')
var temp = document.querySelector('#temp')
var description = document.querySelector('#description')

// key from openweathermap
apiKey = '1ad0a30a3b2d659a6271b81f871d1861'

/*
    --Kelvin to Celsius--
    Function to convert inserted Kelvin temperature to
    Celsius temperature.
*/
function toCelcius(temper) {
    return Math.trunc(temper - 273);
}

/*
    --Event Listerer Search Button--
    When user press search button this function is called.
*/

btn.addEventListener('click', function () {
    
    /*The url that takes data. -input.value->city, -apiKey->key */ 
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + input.value + '&appid=' + apiKey)
        .then(response => {
            //handle response            
            if (response.ok) {
                return response.json()
            }

            else {
                throw new Error("NETWORK RESPONSE ERROR");
            }
        })
        .then(data => {

            //handle data
            var getName = data['name']
            var getTemp = data['main']['temp']
            var getDes = data['weather']['0']['description']
            
            //Send to Html
            document.getElementById("city").innerHTML = `Weather of <span>${getName}</span>`
            document.getElementById("temp").innerHTML = `Temperature: <span>${toCelcius(getTemp)}&#8451</span>`
            document.getElementById("description").innerHTML = `Description: <span>${getDes}</span>`

        })
        .catch(error => {
            //handle error
            alert(error)
        });
})
