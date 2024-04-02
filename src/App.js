import React, {useLayoutEffect, useState} from 'react';
import './App.scss';
import { useEffect } from 'react';
import COLORS_ARRAY from './colorsArray';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTwitter } from '@fortawesome/free-brands-svg-icons';

let quoteDBUrl = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"

function App() {
  const [quote, setQuote] = useState("Be yourself%%; everyone else is already taken.")
  const [author, setAuthor] = useState("Oscar Wilde")
  const [randomColorNumber, setRandomColorNumber] = useState(0)
  const [randomQuoteNumber, setRandomQuoteNumber] = useState(0)
  const [randomNumber, setRandomNumber] = useState(0)
  const [quotesArray, setQuotesArray] = useState(null)
  const [accentColor, setAccentColor] = useState('#282c34')


  // Function that takes an array and returns a random integr
  // based on the array length
  const getRandomNumber = ([arr]) => {
    return Math.floor(arr.length*Math.random())
  } 

  const getRandomQuote = () => {
    let randomQuoteInteger = getRandomNumber([quotesArray])
    setRandomQuoteNumber(randomQuoteInteger)
    setQuote(quotesArray[randomQuoteInteger].quote)
    setAuthor(quotesArray[randomQuoteInteger].author)

    console.log(randomQuoteInteger)
    let randomColorInteger = getRandomNumber([COLORS_ARRAY])
    setRandomColorNumber(randomColorInteger)
    setAccentColor(COLORS_ARRAY[randomColorInteger])
  }

  const fetchQuotes = async (url) => {
    const response = await fetch(url)
    const parsedJSON = await response.json()
    setQuotesArray(parsedJSON.quotes)
    //console.log(parsedJSON.quotes)
  }

  useEffect(() => {
    fetchQuotes(quoteDBUrl)    
  }, [quoteDBUrl])
  
  return (
    <div className="App">
      <header className="App-header" style={{backgroundColor: accentColor}}>
        <div id="quote-box" style={{color: accentColor}}>
          <h1 className="heading-text">Quote Generator</h1>
          <p id="text">
            "{quote}"
          </p>
          <p id="author">
            - {author}
          </p>
          <div className="buttons">
            <a 
            id="tweet-quote" 
            style={{backgroundColor: accentColor}}
            href={('https://twitter.com/intent/tweet?text="' + encodeURIComponent(quote) + '" - '+ encodeURIComponent(author))} 
            ><FontAwesomeIcon icon={faTwitter} /></a>        
          <button 
          id="new-quote"
          style={{backgroundColor: accentColor}} 
          onClick={()=>getRandomQuote()}>Generate Quote</button>
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
