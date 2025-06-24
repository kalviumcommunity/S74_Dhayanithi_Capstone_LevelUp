import React, { useEffect, useState } from 'react';

const quotes = [
  { text: "The habit of persistence is the habit of victory.", author: "Herbert Kaufman", category: "persistence" },
  { text: "Your net worth to the world is usually determined by what remains after your bad habits are subtracted from your good ones.", author: "Benjamin Franklin", category: "habits" },
  { text: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Aristotle", category: "excellence" },
  { text: "Motivation is what gets you started. Habit is what keeps you going.", author: "Jim Rohn", category: "motivation" },
  { text: "Habits are the compound interest of self-improvement.", author: "James Clear", category: "habits" },
  { text: "A habit cannot be tossed out the window; it must be coaxed down the stairs a step at a time.", author: "Mark Twain", category: "change" },
  { text: "First we make our habits, then our habits make us.", author: "Charles C. Noble", category: "habits" },
  { text: "The chains of habit are too light to be felt until they are too heavy to be broken.", author: "Warren Buffett", category: "change" },
  { text: "Good habits are worth being fanatical about.", author: "John Irving", category: "habits" },
  { text: "Habit is either the best of servants or the worst of masters.", author: "Nathaniel Emmons", category: "habits" },
  { text: "The only way to make a habit is to work at it.", author: "Unknown", category: "persistence" },
  { text: "Your daily habits define your long-term success.", author: "Unknown", category: "habits" }
];

const QuoteBox = () => {
  const [quote, setQuote] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    const savedQuote = localStorage.getItem('bookmarkedQuote');
    const todayIndex = new Date().getDate() % quotes.length;
    const todayQuote = quotes[todayIndex];

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
      localStorage.removeItem('bookmarkedQuote');
      const todayIndex = new Date().getDate() % quotes.length;
      setQuote(quotes[todayIndex]);
    } else {
      localStorage.setItem('bookmarkedQuote', JSON.stringify(quote));
    }
    setIsBookmarked(!isBookmarked);
  };

  const handleNewQuote = () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * quotes.length);
    } while (quotes[randomIndex].text === quote?.text);

    setQuote(quotes[randomIndex]);
    setIsBookmarked(false);
  };

  if (!quote) return null;

  const getCategoryColor = () => {
    switch (quote.category) {
      case 'persistence': return 'bg-yellow-500';
      case 'habits': return 'bg-indigo-500';
      case 'excellence': return 'bg-green-500';
      case 'motivation': return 'bg-pink-500';
      case 'change': return 'bg-purple-500';
      default: return 'bg-blue-500';
    }
  };

  return (
    <div className={`${getCategoryColor()} text-white p-6 rounded-lg shadow-md min-w-[300px] max-w-md min-h-[260px] transition-all duration-300`}>
      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div className="text-xs font-bold uppercase px-2 py-1 bg-white bg-opacity-30 text-black rounded">
          Daily Wisdom
        </div>
        <div className="flex space-x-2 text-lg">
          <button onClick={() => setShowInfo(!showInfo)} className="hover:opacity-100 opacity-70" title="Toggle Info">ℹ️</button>
          <button onClick={handleBookmark} className="hover:opacity-100 opacity-70" title="Bookmark">
            {isBookmarked ? '🔖' : '📌'}
          </button>
        </div>
      </div>

      {/* Quote */}
      <p className="text-xl italic leading-relaxed mb-4">"{quote.text}"</p>

      {/* Footer */}
      <div className="flex justify-between items-center mt-auto">
        <div>
          <p className="font-semibold">{quote.author && `— ${quote.author}`}</p>
          {showInfo && (
            <span className="text-xs uppercase mt-1 inline-block bg-white text-black bg-opacity-30 px-2 py-0.5 rounded">
              {quote.category}
            </span>
          )}
        </div>
        <button
          onClick={handleNewQuote}
          className="text-sm bg-white text-black px-3 py-1 rounded hover:bg-gray-200 transition"
        >
          🔄 New Quote
        </button>
      </div>
    </div>
  );
};

export default QuoteBox;
