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
		const news = await fetch(`https://newsapi.org/v2/everything?q=${userdata.value}&apiKey=018ab408da4a42bab061e6729b149d43`)
		if (results.status !== 200){
			div.innerText = 'Please make sure city spelling is correct'
			throw new Error('Error, results are not 200')
		}else {
			let weatherResults = await results.json();
			let newsResults = await news.json();

			

	//This section appends the weatherResults and teleportResults to the div class div
	div.style.display = 'block';
	let icon = document.createElement('icon')
	let src = weatherResults.current.condition.icon;
	let https = 'https:'
	let final = https.concat(src);
	let img = `<img src=${final}></img>`;
	
	
	div.innerHTML = 
	(`
		${weatherResults.location.name} 
		${weatherResults.location.region} ${img} 
		Condition: ${weatherResults.current.condition.text} 
		Current Temperature: ${weatherResults.current.temp_f} Degrees Farenheit
		`)
	



	//All news information to the div class news
	let newsDiv1 = document.querySelector('.news1');
	let newsDiv2 = document.querySelector('.news2');
	

	let newsArticleTitle1 = newsResults.articles[0].title;
	let newsArticleDescription1 = newsResults.articles[0].description;
	let newsArticleImage1 = newsResults.articles[0].urlToImage;
	let newsImage1 = `<img src=${newsArticleImage1}></img>`;

	
	let newsArticleTitle2 = newsResults.articles[1].title;
	let newsArticleDescription2 = newsResults.articles[1].description;
	let newsArticleImage2 = newsResults.articles[1].urlToImage;
	let newsImage2 = `<img src=${newsArticleImage2}></img>`;


//News articles are posted to div inner HTML
newsDiv1.innerHTML = `${newsArticleTitle1}${newsImage1}
${newsArticleDescription1}`;

newsDiv2.innerHTML = `${newsArticleTitle2}${newsImage2}
${newsArticleDescription2}`;



//Event listeners that take you to the article url when clicked

newsDiv1.addEventListener('click', goToArticle1);
function goToArticle1(){
	window.location = newsResults.articles[0].url

}

newsDiv2.addEventListener('click', goToArticle1)
function goToArticle1(){
	window.location = newsResults.articles[1].url

}


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
