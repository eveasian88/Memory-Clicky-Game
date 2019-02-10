import React, { Component } from "react";
import DisplayCard from "./components/DisplayCard";
import Jumbotron from "./components/Jumbotron";
import Wrapper from "./components/Wrapper";
import cards from "./cards.json";
import "./App.css";


let correctGuesses = 0;
let bestScore = 0;
let clickMessage = "Click on an image to earn points, but don't click on the same one twice!";


class App extends Component {
  // Setting this.state.friends to the friends json array
  state = {
    cards,
    correctGuesses,
    bestScore,
    clickMessage
  };

  setClicked = id => {

    // Make a copy of the state friends array to work with
    const cards = this.state.cards;

    // Filter for the clicked Friend
    const clickedCard = cards.filter(card => card.id === id);

    // If the Friended image's clicked value is already true, 
    // do the game over actions
    if (clickedCard[0].clicked) {

      console.log("Correct Guesses: " + correctGuesses);
      console.log("Best Score: " + bestScore);

      correctGuesses = 0;
      clickMessage = "Better luck next time... Thank's for Playing!"

      for (let i = 0; i < cards.length; i++) {
        cards[i].clicked = false;
      }

      this.setState({ clickMessage });
      this.setState({ correctGuesses });
      this.setState({ cards });

      // Otherwise, if clicked = false, and the user hasn't finished
    } else if (correctGuesses < 11) {

      // Set its value to true
      clickedCard[0].clicked = true;

      // increment the appropriate counter
      correctGuesses++;

      clickMessage = "Keep going, you're doing great.";

      if (correctGuesses > bestScore) {
        bestScore = correctGuesses;
        this.setState({ bestScore });
      }

      // Shuffle the array to be rendered in a random order
      cards.sort(function (a, b) { return 0.5 - Math.random() });

      // Set this.state.friends equal to the new friends array
      this.setState({ cards });
      this.setState({ correctGuesses });
      this.setState({ clickMessage });
    } else {

      // Set its value to true
      clickedCard[0].clicked = true;

      // restart the guess counter
      correctGuesses = 0;

      // Egg on the user to play again
      clickMessage = "Great Job, you got them all.";
      bestScore = 12;
      this.setState({ bestScore });

      for (let i = 0; i < cards.length; i++) {
        cards[i].clicked = false;
      }

      // Shuffle the array to be rendered in a random order
      cards.sort(function (a, b) { return 0.5 - Math.random() });

      // Set this.state.friends equal to the new friends array
      this.setState({ cards });
      this.setState({ correctGuesses });
      this.setState({ clickMessage });

    }
  };

  // Map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (

      <Wrapper>


        <Jumbotron >
        <h1>Clicky Game!</h1>

          <span  className="scoreSummary">
              {this.state.clickMessage} 
              <hr/>
            Correct Guesses: {this.state.correctGuesses}
            <br />
            Best Score: {this.state.bestScore}
          </span  >
          <br />
          
        </Jumbotron>





        {this.state.cards.map(card => (
          <DisplayCard
            setClicked={this.setClicked}
            id={card.id}
            key={card.id}
            image={card.image}

          />
        ))}
      </Wrapper>
    );
  }
}

export default App;