let input = document.querySelector('#cityinput')
let btn = document.querySelector('#search')
let city = document.querySelector('#city')
let temp = document.querySelector('#temp')
let description = document.querySelector('#description')

// Send error message to page
var msg = document.getElementsByClassName('#msg')

//focus to user input
input.focus()

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
            var iconurl = "http://openweathermap.org/img/w/" + iconcode + ".png"

            //Create content to add values to html
            const content = `<div class='ch' id=we-${i}>
            <p id="city">${getName + ' ' + getCountry}</p>
            <p id="temp">${toCelcius(getTemp)}&#8451</p>
            <div id="icon"><img src='${iconurl}' id="wicon"></div>
            <p id="description">${getDes.toUpperCase()}</p>
            </div>
            `;
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


