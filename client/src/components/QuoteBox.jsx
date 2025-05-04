import React, { useEffect, useState } from 'react';

// Expanded quotes array with categories and authors
const quotes = [
  {
    text: "The habit of persistence is the habit of victory.",
    author: "Herbert Kaufman",
    category: "persistence"
  },
  {
    text: "Your net worth to the world is usually determined by what remains after your bad habits are subtracted from your good ones.",
    author: "Benjamin Franklin",
    category: "habits"
  },
  {
    text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    author: "Aristotle",
    category: "excellence"
  },
  {
    text: "Motivation is what gets you started. Habit is what keeps you going.",
    author: "Jim Rohn",
    category: "motivation"
  },
  {
    text: "Habits are the compound interest of self-improvement.",
    author: "James Clear",
    category: "habits"
  },
  {
    text: "A habit cannot be tossed out the window; it must be coaxed down the stairs a step at a time.",
    author: "Mark Twain",
    category: "change"
  },
  {
    text: "First we make our habits, then our habits make us.",
    author: "Charles C. Noble",
    category: "habits"
  },
  {
    text: "The chains of habit are too light to be felt until they are too heavy to be broken.",
    author: "Warren Buffett",
    category: "change"
  },
  {
    text: "Good habits are worth being fanatical about.",
    author: "John Irving",
    category: "habits"
  },
  {
    text: "Habit is either the best of servants or the worst of masters.",
    author: "Nathaniel Emmons",
    category: "habits"
  },
  {
    text: "The only way to make a habit is to work at it.",
    author: "Unknown",
    category: "persistence"
  },
  {
    text: "Your daily habits define your long-term success.",
    author: "Unknown",
    category: "habits"
  }
];

const QuoteBox = () => {
  const [quote, setQuote] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  
  useEffect(() => {
    // Load any saved bookmarked quote
    const savedQuote = localStorage.getItem('bookmarkedQuote');
    
    // Get today's quote
    const todayIndex = new Date().getDate() % quotes.length;
    const todayQuote = quotes[todayIndex];
    
    // Set the saved quote if available and user hasn't seen today's quote
    if (savedQuote) {
      const parsedQuote = JSON.parse(savedQuote);
      setQuote(parsedQuote);
      setIsBookmarked(true);
    } else {
      setQuote(todayQuote);
      setIsBookmarked(false);
    }
  }, []);

  const handleBookmark = () => {
    if (isBookmarked) {
      // Remove bookmark
      localStorage.removeItem('bookmarkedQuote');
      
      // Set to today's quote
      const todayIndex = new Date().getDate() % quotes.length;
      setQuote(quotes[todayIndex]);
    } else {
      // Add bookmark
      localStorage.setItem('bookmarkedQuote', JSON.stringify(quote));
    }
    
    setIsBookmarked(!isBookmarked);
  };

  const handleNewQuote = () => {
    // Get a random quote different from current
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * quotes.length);
    } while (quotes[randomIndex].text === quote?.text);
    
    setQuote(quotes[randomIndex]);
    setIsBookmarked(false);
  };

  if (!quote) return null;

  // Get category color
  const getCategoryColor = () => {
    switch (quote.category) {
      case 'persistence': return 'bg-amber-600';
      case 'habits': return 'bg-indigo-600';
      case 'excellence': return 'bg-emerald-600';
      case 'motivation': return 'bg-rose-600';
      case 'change': return 'bg-violet-600';
      default: return 'bg-blue-600';
    }
  };

  return (
    <div className={`${getCategoryColor()} text-white p-6 rounded-xl shadow-lg relative overflow-hidden group`}>
      {/* Pattern overlay for visual interest */}
      <div className="absolute inset-0 opacity-10">
        <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%">
          <pattern id="pattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M0 20 L40 20 M20 0 L20 40" stroke="currentColor" strokeWidth="1" fill="none" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#pattern)" />
        </svg>
      </div>
      
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-4">
          <div className="uppercase text-xs font-bold tracking-wider text-green-800 bg-white bg-opacity-20 px-3 py-1 rounded-full">
            Daily Wisdom
          </div>
          <div className="flex space-x-2">
            <button 
              onClick={() => setShowInfo(!showInfo)}
              className="text-white opacity-70 hover:opacity-100 transition-opacity p-1"
              aria-label="Show information"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
              </svg>
              
            </button>
            <button 
              onClick={handleBookmark}
              className="text-white opacity-70 hover:opacity-100 transition-opacity p-1"
              aria-label={isBookmarked ? "Remove bookmark" : "Bookmark quote"}
            >
              {isBookmarked ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                  <path fillRule="evenodd" d="M10 2c-1.716 0-3.408.106-5.07.31A1.75 1.75 0 003 4.042V17.95a.75.75 0 001.06.67l5.94-2.84 5.94 2.84a.75.75 0 001.06-.67V4.043a1.75 1.75 0 00-1.93-1.732A41.213 41.213 0 0010 2z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
                </svg>
              )}
            </button>
          </div>
        </div>
        
        <div className="text-2xl font-serif italic mb-4 leading-relaxed">"{quote.text}"</div>
        
        <div className="flex justify-between items-center">
          <div>
            {quote.author && (
              <p className="font-medium">— {quote.author}</p>
            )}
            {showInfo && quote.category && (
              <span className="text-xs uppercase tracking-wider bg-white bg-opacity-20 px-2 py-0.5 rounded mt-2 inline-block">
                {quote.category}
              </span>
            )}
          </div>
          <button 
            onClick={handleNewQuote}
            className=" text-blue-900 bg-opacity-20 hover:bg-opacity-30 transition-all bg-white px-3 py-1 rounded text-sm flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-1">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
            </svg>
            New Quote
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuoteBox;