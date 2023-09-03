const quoteContainer = document.getElementById('quote-container');

// getting a new quote from random number + API
async function getQuote() {
  const API_URL = 'https://jacintodesign.github.io/quotes-api/data/quotes.json';

  try {
    await axios(API_URL).then((data) => newQuotes(data));
  } catch (err) {
    // handle the error
    if (err.message == 'Network Error') {
      error('Check your network and refresh');
    }
  }
}
getQuote();

// return a random number
function newRandomQuotes() {
  const quote = Math.floor(Math.random() * 8260);
  return quote;
}

let quoteHTML = '';

function newQuotes(data) {
  quoteHTML = `
  <div class="quote-text">
        <i class="fas fa-quote-left"></i>
        <span id="quote">
          ${data.data[newRandomQuotes()].text}
        </span>
      </div>
      <div class="quote-author">
        <span id="author">~${data.data[newRandomQuotes()].author}</span>
      </div>
      <div class="button-container">
        <button class="twitter-button" id="twitter" title="Tweet this!">
          <i class="fab fa-twitter"></i>
        </button>
        <button id="new-quote">New Quote</button>
      </div>
 
 `;
  quoteContainer.innerHTML = quoteHTML;

  //getting the text content and save it to variable
  const quoteText = document.getElementById('quote');
  quoteText.textContent = data.data[newRandomQuotes()].text;

  //getting the author content and save it to variable
  const authorText = document.getElementById('author');
  authorText.textContent = data.data[newRandomQuotes()].author;

  const twitterBtn = document.getElementById('twitter');
  const newQuoteBtn = document.getElementById('new-quote');

  // get new quote when click
  newQuoteBtn.addEventListener('click', getQuote);

  // tweet a Quote
  function tweetQuote() {
    const twitterUrl = `http://twitter.com/share?text=${quoteText.textContent} - ${authorText.textContent} %20-- [ GET YOUR QUOTES HERE @ https://louiesumayan.github.io/Quote-GeneratorV2/ ] --`;
    window.open(twitterUrl, '_blank');
  }
  twitterBtn.addEventListener('click', tweetQuote);
}

function error(msg) {
  quoteHTML = `
  <div class="quote-text">
       <h1>${msg}</h1>
      </div>
 
 `;
  quoteContainer.innerHTML = quoteHTML;
}
