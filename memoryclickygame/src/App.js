import React, { Component } from "react";
import DisplayCard from "./components/DisplayCard";
import Jumbotron from "./components/Jumbotron";
import Wrapper from "./components/Wrapper";
import cards from "./cards.json";
import "./App.css";


let correctGuesses = 0;
let topScore = 0;
let clickMessage = "Click on an image to earn points, but don't click on the same image twice!";


class App extends Component {
  // setting this.state.friends to the friends json array
  state = {
    cards,
    correctGuesses,
    topScore,
    clickMessage
  };

  setClicked = id => {

    // make a copy of the state friends array to work with
    const cards = this.state.cards;

    // filter for the clicked Friend
    const clickedCard = cards.filter(card => card.id === id);

    // if the image's clicked value is already true, do the game over actions
    if (clickedCard[0].clicked) {

      console.log("Score: " + correctGuesses);
      console.log("Best Score: " + topScore);

      correctGuesses = 0;
      clickMessage = "Oh, you suffer from short term memory loss. Thanks for playing!"

      for (let i = 0; i < cards.length; i++) {
        cards[i].clicked = false;
      }

      this.setState({ clickMessage });
      this.setState({ correctGuesses });
      this.setState({ cards });

      // otherwise, if clicked = false, and the user hasn't finished
    } else if (correctGuesses < 11) {

      // set its value to true
      clickedCard[0].clicked = true;

      // increment the appropriate counter
      correctGuesses++;

      clickMessage = "Just keep swimming! You're doing great!";

      if (correctGuesses > topScore) {
        topScore = correctGuesses;
        this.setState({ topScore });
      }

      // shuffle the array to be rendered in a random order
      cards.sort(function (a, b) { return 0.5 - Math.random() });

      // set this.state.friends equal to the new friends array
      this.setState({ cards });
      this.setState({ correctGuesses });
      this.setState({ clickMessage });
    } else {

      // set its value to true
      clickedCard[0].clicked = true;

      // restart the guess counter
      correctGuesses = 0;

      // encourage user to play again
      clickMessage = "AWESOME! YOU GOT THEM ALL!";
      topScore = 12;
      this.setState({ topScore });

      for (let i = 0; i < cards.length; i++) {
        cards[i].clicked = false;
      }

      // shuffle the array to be rendered in a random order
      cards.sort(function (a, b) { return 0.5 - Math.random() });

      // set this.state.friends equal to the new friends array
      this.setState({ cards });
      this.setState({ correctGuesses });
      this.setState({ clickMessage });

    }
  };

  // map over this.state.friends and render a FriendCard component for each friend object
  render() {
    return (

      <Wrapper>


        <Jumbotron >
        <h1>Finding Nemo Memory Game</h1>

          <span  className="scoreSummary">
              {this.state.clickMessage} 
              <hr/>
            Score: {this.state.correctGuesses} |

            Top Score: {this.state.topScore}
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