import { useEffect, useState } from "react";
import Card from "./components/Card";


export default function App(){
    const [deckData, setDeckData] = useState({
        "success": Boolean,
        "deck_id": String,
        "shuffled": Boolean,
        "remaining": Number
    });
    const [cardValue, setCardValue] = useState({
        "code": String,
        "image": String,
        "images": {
            "svg": String,
            "png": String
        },
        "value": String,
        "suit": String
    });
    const [drawnCards, setDrawnCards] = useState({
        "success": Boolean,
        "deck_id": String,
        "cards": [
            cardValue
        ],
        "remaining": Number
    });
    const [isDeckShuffled, setIsDeckShuffled] = useState(false);
    const [isCardDone, SetIsCardDone] = useState(false);
    const [cardAmount, setCardAmount] = useState(1);
    
    const handleChange = (event) => {
        setCardAmount(event.target.value);
    };

    const fetchDeckOnClick = async () => {
        await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
            .then((response) => response.json())
            .then((result) => setDeckData(result))
            .catch((error) => console.error("Error fetching data: ", error));
        setIsDeckShuffled(true);
    }

    const fetchCardFromDeck = async () => {
        await fetch(`https://deckofcardsapi.com/api/deck/${deckData.deck_id}/draw/?count=${cardAmount}`)
            .then((response) => response.json())
            .then((result) => setDrawnCards(result))
            .catch((error) => console.error("Error fetching data: ", error));
        SetIsCardDone(true);
    }

    return(
        <>
        <h1>Card Game</h1>
        <button onClick={fetchDeckOnClick}>Shuffle a Deck</button>
        {isDeckShuffled ? <p>Deck shuffled!</p> : <p>Shuffle a deck</p>}
        {isDeckShuffled ? <div>input how many cards you want to draw: <input value={cardAmount} onChange={handleChange} type="text" /></div> : <div></div>}
        {isDeckShuffled ? <button onClick={fetchCardFromDeck}>Draw a Card from the Deck</button> : <div></div>}
        {isCardDone ? drawnCards.cards.map((card, i) => (
            <Card key={i} image={card.image} value={card.value} suit={card.suit}></Card>
        )) : <p>Draw a card</p>}
        {isCardDone ? <div>{drawnCards.remaining} out of {deckData.remaining}</div> : <div></div>}
        </>
    );
}