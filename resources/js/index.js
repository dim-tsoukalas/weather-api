var input = document.querySelector('#cityinput')
var btn = document.querySelector('#search')
var city = document.querySelector('#city')
var temp = document.querySelector('#temp')
var description = document.querySelector('#description')

var msg = document.getElementsByClassName('#msg')

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

/*  --Event Listerers Search Button--
    When user press search button or 'Enter' calls function searchAction().*/
btn.addEventListener('click', function () {searchAction();})
input.addEventListener('keypress', function(event){
    if (event.key == 'Enter') {searchAction()}});

//Search city
function searchAction() {
    /*The url that takes data. -input.value->city, -apiKey->key */ 
    fetch('https://api.openweathermap.org/data/2.5/weather?q=' + input.value + '&appid=' + apiKey)
        .then(response => {
            //handle response            
            if (response.ok) {
                delmess();
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
            var iconcode = data['weather'][0]['icon']
            var getCountry = data['sys']['country']

            //Send to Html
            document.getElementById("city").innerHTML = getName
            document.getElementById("temp").innerHTML = `${toCelcius(getTemp)}&#8451`
            document.getElementById("description").innerHTML = getDes
            var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png"
            show_icon(iconurl)
            show_country(getCountry)
        })
        .catch(error => {
            //handle error
                showmess();
          
        });
}


