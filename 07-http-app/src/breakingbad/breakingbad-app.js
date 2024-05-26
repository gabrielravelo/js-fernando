
const getRandomNumber = ( min, max ) => {
    
};


/**
 * @returns {Object} quote information
 */
const fetchQuote = async () => {
    const res = await fetch('https://api.breakingbadquotes.xyz/v1/quotes');
    const data = await res.json();
    
    console.log(data[0]);
    return data[0];
};

/**
 * 
 * @param {HTMLDivElement} element 
 */
export const BreakingBadApp = async ( element ) => {

    document.querySelector('#app-title').innerHTML = 'BreakingBad App';
    element.innerHTML = 'Loading...';
    // await fetchQuote();

    const quoteLabel = document.createElement('blockquote');
    const authorLabel = document.createElement('h3');
    const nextQuoteButton = document.createElement('button');
    nextQuoteButton.innerText = 'Next Quote';
    nextQuoteButton.classList.add('gaborolo')

    const renderQuote = ( data ) => {
        quoteLabel.innerHTML = data.quote;
        authorLabel.innerHTML = data.author;
        element.replaceChildren( quoteLabel, authorLabel, nextQuoteButton );
    };

    nextQuoteButton.addEventListener('click', () => {
        element.replaceChildren('Loading...');

        fetchQuote()
            .then( renderQuote );
        
        return;
    });

    fetchQuote()
        .then( renderQuote );
};