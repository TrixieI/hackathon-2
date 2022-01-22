//This locates necessary items from the HTML file

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
  //This function fetches the weather api and and news api appends to the div (class div)
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
      console.log(newsResults)


      //This section appends the weatherResults to the div class div
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

      //Loops through the articles and if image url is null it doesnt use the image.
      let article = newsResults.results
      let newsArticleImage1;
      let newsArticleTitle1;
      let newsArticleDescription1;
      for (let i = 0; i< article.length; i++){

        if(article[i].image_url != null){
          newsArticleImage1 = article[i].image_url;
          newsArticleTitle1 = article[i].title;
          newsArticleDescription1 = article[i].description;
          break;
        }
      }
      //The image that can be located is put into an img tag
      let newsImage1 = `<img src=${newsArticleImage1}></img>`;
      

     //Now, the same thing for the second article 
     let newsArticleTitle2;
     let newsArticleDescription2;
     let newsArticleImage2;


//For loop starting at the end working to beginning

for (let i = (article.length - 1); i >= 0; i--){
  if(article[i].image_url != null){
    newsArticleImage2 = article[i].image_url;
    newsArticleTitle2 = article[i].title;
    newsArticleDescription2 = article[i].description;
    newsArticleImage2 = article[i].image_url;
    break;
  }

}
      //The image that can be located is put into an img tag
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

    }
  } catch (e) {
    console.log(e);
  }
}