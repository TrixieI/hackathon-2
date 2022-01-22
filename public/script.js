//This creates the button and locates necessary items from the HTML file

let body = document.body;
let userdata = document.querySelector(".userdata");
let button = document.querySelector(".submit");
button.addEventListener("click", lookupWeather);
let div = document.querySelector(".div");

function lookupWeather() {
  //This function is linked to the button through click and runs the weather API function to fetch data
  weatherApi();
}

async function weatherApi() {
  //This function fetches the weather api and appends to the div (class div)
  try {
    const results = await fetch(
      `https://api.weatherapi.com/v1/current.json?key=1529a6c2d12742cea19173139220601&q=${userdata.value}`

      );
    const news = await fetch(`https://newsdata.io/api/1/news?apikey=pub_389202a05ea03b4b50c3834f8089ea29cf9b&q=${userdata.value}`)


    if (results.status !== 200) {
      div.innerText = "Please make sure city spelling is correct";
      throw new Error("Error, results are not 200");
    } else {
      let weatherResults = await results.json();
      let newsResults = await news.json();
      let newApiResults = await newApi.json();

      console.log(newApiResults);

      //This section appends the weatherResults and teleportResults to the div class div
      div.style.display = "block";
      let icon = document.createElement("icon");
      let src = weatherResults.current.condition.icon;
      let https = "https:";
      let final = https.concat(src);
      let img = `<img src=${final}></img>`;

      div.innerHTML = `
      ${weatherResults.location.name} 
      ${weatherResults.location.region} ${img} 
      Condition: ${weatherResults.current.condition.text} 
      Current Temperature: ${weatherResults.current.temp_f} Degrees Farenheit
      `;

      //All news information to the div class news
      let newsDiv1 = document.querySelector(".news1");
      let newsDiv2 = document.querySelector(".news2");

      let newsArticleTitle1 = newsResults.results[0].title;
      let newsArticleDescription1 = newsResults.results[0].description;
      let newsArticleImage1 = newsResults.results[0].image_url;
      let newsImage1 = `<img src=${newsArticleImage1}></img>`;

      let newsArticleTitle2 = newsResults.results[2].title;
      let newsArticleDescription2 = newsResults.results[2].description;
      let newsArticleImage2 = newsResults.results[2].image_url;
      let newsImage2 = `<img src=${newsArticleImage2}></img>`;

      //News articles are posted to div inner HTML
      newsDiv1.innerHTML = `${newsArticleTitle1}${newsImage1}
      ${newsArticleDescription1}`;

      newsDiv2.innerHTML = `${newsArticleTitle2}${newsImage2}
      ${newsArticleDescription2}`;

      //Event listeners that take you to the article url when clicked

      newsDiv1.addEventListener("click", goToArticle1);
      function goToArticle1() {
        window.location = newsResults.articles[0].link;
      }

      newsDiv2.addEventListener("click", goToArticle1);
      function goToArticle1() {
        window.location = newsResults.articles[2].link;
      }

      //This section adds background images depending on current weather temperature
    }
  } catch (e) {
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

// (function store() {
//   let user = document.querySelector(".username");
//   console.log(user.value);

//   let username = {
//     user: user.value,
//   };
//   window.localStorage.setItem(JSON.stringify(username));
//   console.log(username);
// })();
