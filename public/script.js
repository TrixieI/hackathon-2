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


	//This section appends the weatherResults to the div inner text
	// let div = document.getElementById("info");
	// let icon = document.getElementById("icon");
	// let src = weatherResults.current.condition.icon;
	// let img = `<img src=${src}></img>`;
	// icon.innerHTML = img;


	div.innerText = 
	(`${weatherResults.location.name}, ${weatherResults.location.region} 
		Current Temperature Farenheit: ${weatherResults.current.temp_f} 
		Description: ${weatherResults.current.condition.text} 
		Humidiy: ${weatherResults.current.humidity}`)

		//This section adds background images depending on current weather temperature

	}

} catch(e) {
	console.log(e);
}
}






// 		try {
// 	const iconResults = await fetch(`${weatherResults.current.condition.icon}`)
// 	if (iconResults.status !== 200){
// 		div.innerText = 'Please make sure city spelling is correct'
// 		throw new Error('Error, results are not 200')
// 	}else {
// 		let iconData = await results.json();
// 		console.log(iconData)
// 	} catch(e) {
// 	// statements
// 	console.log(e);
// }
