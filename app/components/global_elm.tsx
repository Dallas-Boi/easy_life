// Made Wednesday, December 20th, 2023

import React from 'react';

// Returns the Header
const GetHeader: React.FC = () => {
  return (
    <div id="header">
      <div id="links">
          <a href="/">Home</a>
          <a href="/games/solitaire">Solitaire</a>
          <a href="/games/blackjack">BlackJack</a>
          <a href="/games/yahtzee">Yahtzee</a>
        </div>
    </div>
  );
};

export default GetHeader