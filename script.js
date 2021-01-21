const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// show loading
function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;

}
// hide load
function complete(){
    if(!loader.hidden){
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// get quote from api
async function getQuote(){
    loading();
    // we need to use  a proxy URL to make our API call in order to avoid
    const proxyUrl = 'https://whispering-tor-04671.herokuapp.com/';
    const apiUrl = "https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json";

try{
    const response = await fetch(proxyUrl + apiUrl);
    const data = await response.json();

    //  if author is blank , add 'unknown'
    if(data.quoteAuthor === ''){
        authorText.innerText = 'Unknown';
    }
    else{
        authorText.innerText = data.quoteAuthor;
    }
    // reduce the length of the quote

    if(data.quoteText.length > 120){
        quoteText.classList.add('long-quote');
    }
    else{
        quoteText.classList.remove('long-quote');
    }
    
    quoteText.innerText = data.quoteText;

    // stop loader , show quote
    complete();
}
catch(error){
    
    getQuote();
}
}
// tweet quote function
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = "https://twitter.com/home";
    window.open(twitterUrl, '_blank');
}
// event listner
newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click',tweetQuote);

// on load
 getQuote();
