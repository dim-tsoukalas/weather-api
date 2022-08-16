/*
    ---Weather Class--- 
    Organize weather information
    1.Convert inserted Kelvin temperature to
    Celsius temperature.
    2.Convert description to UpperCase
    3.Add icon url
*/
class Weather {
    constructor(city, temp, desc, icon_code, country) {
      this.city = city;
      this.temp = Math.trunc(temp - 273);
      this.desc = desc.toUpperCase();
      this.icon_code = "http://openweathermap.org/img/w/" + icon_code + ".png";
      this.country = country;
    }

}
  
let input = document.querySelector('#cityinput')
let btn = document.querySelector('#search')
let city = document.querySelector('#city')
let temp = document.querySelector('#temp')

// Send error message to page
var msg = document.getElementsByClassName('#msg')

//focus to user input
input.focus()

// key from openweathermap
apiKey = '1ad0a30a3b2d659a6271b81f871d1861'
const list_weather = []

/*  --Event Listerers Search Button--
    When user press search button or 'Enter' calls function searchAction().*/
btn.addEventListener('click', function () { searchAction(); })
input.addEventListener('keypress', function (event) {
    if (event.key == 'Enter') { searchAction() }
});
let i = 0
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
                throw new Error("Can't find city!");
            }
        })
        .then(data => {
            //Added weather object to list
            list_weather.push(new Weather(data['name'], data['main']['temp'], data['weather']['0']['description'],
            data['weather'][0]['icon'], data['sys']['country']))

            //Create content to add values to html
            const content = getContent();
            i++;

            //Add content to box class at 'index.html'
            { $('.box').append(content); }


        })
        .catch(error => {
            //handle error
            showmess(error);

        });

    input.focus()
    input.value = ""

}

function getContent() {
    return `<div class='ch' id=we-${i}>
    <p id="city">${list_weather[i].city + ' ' + list_weather[i].country}</p>
    <p id="temp">${list_weather[i].temp}&#8451</p>
    <div id="icon"><img src='${list_weather[i].icon_code}' id="wicon"></div>
    <p id="description">${list_weather[i].desc}</p>
    <i id='del'onclick="deleteWeather('we-${i}')" class="gg-trash">
    <span class="delete_hov">Remove</span>
    </i>
    </div>
    `;
}

function deleteWeather(id){
    document.getElementById(id).remove();
}