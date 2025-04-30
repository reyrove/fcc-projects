const quotes = [
    {
      text: "Life is what happens when you're busy making other plans.",
      author: "John Lennon"
    },
    {
      text: "The way to get started is to quit talking and begin doing.",
      author: "Walt Disney"
    },
    {
      text: "The purpose of our lives is to be happy.",
      author: "Dalai Lama"
    },
    {
      text: "Get busy living or get busy dying.",
      author: "Stephen King"
    },
    {
      text: "You only live once, but if you do it right, once is enough.",
      author: "Mae West"
    }
  ];
  
  function App() {
    const [quote, setQuote] = React.useState({ text: "", author: "" });
  
    const getRandomQuote = () => {
      const randomIndex = Math.floor(Math.random() * quotes.length);
      setQuote(quotes[randomIndex]);
    };
  
    React.useEffect(() => {
      getRandomQuote();
    }, []);
  
    return (
      <div className="center">
        <div id="quote-box">
          <p id="text">"{quote.text}"</p>
          <p id="author">- {quote.author}</p>
          <div className="buttons">
            <a
              id="tweet-quote"
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(
                `"${quote.text}" - ${quote.author}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Tweet
            </a>
            <button id="new-quote" onClick={getRandomQuote}>
              New Quote
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  ReactDOM.render(<App />, document.getElementById("root"));
  