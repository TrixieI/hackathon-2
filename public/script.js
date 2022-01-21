//This creates the button and locates necessary items from the HTML file

let body = document.body
let userdata = document.querySelector('.userdata')
let button = document.querySelector('.submit')
// let button = document.createElement('button')
// let textNode1 = document.createTextNode('Look up Weather')
// button.classList.add('submit')
// button.appendChild(textNode1)
// body.appendChild(button)
button.addEventListener('click', lookupWeather)
let div = document.querySelector('.div')

function lookupWeather(){
	//This function is linked to the button through click and runs the weather API function to fetch data
	weatherApi();
	
}



async function weatherApi(){
	//This function fetches the weather api and appends to the div (class div)
	try {
		const results = await fetch(`http://api.weatherapi.com/v1/current.json?key=1529a6c2d12742cea19173139220601&q=${userdata.value}`)
		if (results.status !== 200){
			div.innerText = 'Please make sure city spelling is correct'
			throw new Error('Error, results are not 200')
		}else {
			let weatherResults = await results.json();
			console.log(weatherResults)

	//This section appends the weatherResults to the div inner text
	div.innerText = 
	(`${weatherResults.location.name}, ${weatherResults.location.region} 
		Current Temperature Farenheit: ${weatherResults.current.temp_f} 
		Description: ${weatherResults.current.condition.text} 
		Humidiy: ${weatherResults.current.humidity}`)

		//This section adds background images depending on current weather temperature

		if  (`${weatherResults.current.temp_f}` >= 90){
			div.classList.add('hot')
			div.classList.remove('moderate', 'sunny', 'freezing')
		} 	
		else if
			(`${weatherResults.current.temp_f}` < 90 && `${weatherResults.current.temp_f}` >= 65){
				div.classList.add('moderate')
				div.classList.remove('hot', 'sunny', 'freezing')
			}
			else if
				(`${weatherResults.current.temp_f}` < 65 && `${weatherResults.current.temp_f}` >= 32){
					div.classList.add('sunny')
					div.classList.remove('hot', 'moderate', 'freezing')
				}
				else if
					(`${weatherResults.current.temp_f}` < 32){
						div.classList.add('freezing')
						div.classList.remove('moderate', 'sunny', 'sunny')
					}

				}

			} catch(e) {
				console.log(e);
			}
		}

		