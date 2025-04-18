import React, { useEffect, useState } from 'react';
import quotes from '../data/quoteData';

const QuoteBox = () => {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    const todayIndex = new Date().getDate() % quotes.length;
    setQuote(quotes[todayIndex]);
  }, []);

  return (
    <div className="bg-indigo-600 text-white p-4 rounded-xl mb-4 shadow-md">
      <p className="text-lg italic">“{quote}”</p>
    </div>
  );
};

export default QuoteBox;
