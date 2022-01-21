//This creates the button and locates necessary items from the HTML file

let body = document.body
let userdata = document.querySelector('.userdata')
let button = document.querySelector('.submit')
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
		const teleport = await fetch(`https://api.teleport.org/api/urban_areas/slug:${userdata.value}/images/`)
		const teleport2 = await fetch(`https://api.teleport.org/api/urban_areas/slug:${userdata.value}/scores/`)
		if (results.status !== 200){
			div.innerText = 'Please make sure city spelling is correct'
			throw new Error('Error, results are not 200')
		}else {
			let weatherResults = await results.json();
			let teleportResults = await teleport.json();
			let teleportResults2 = await teleport2.json();
			console.log(teleportResults2)

	//This section appends the weatherResults to the div inner text
	let icon = document.createElement('icon')
	let src = weatherResults.current.condition.icon;
	let https = 'https:'
	let final = https.concat(src);
	let img = `<img src=${final}></img>`;

	let banner = document.querySelector('.banner')
	let pic = teleportResults.photos[0].image.web;
	let finalPic = `<img src=${pic}></img>`;

	banner.innerHTML = `${finalPic}`

	div.innerHTML = 
	(`${weatherResults.location.name}, ${weatherResults.location.region} 
		Current Temperature Farenheit: ${weatherResults.current.temp_f} 
		Description: ${weatherResults.current.condition.text} 
		Humidiy: ${weatherResults.current.humidity} ${img}`)

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
