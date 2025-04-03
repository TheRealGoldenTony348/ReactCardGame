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
    

    const fetchDeckOnClick = async () => {
        await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
            .then((response) => response.json())
            .then((result) => setDeckData(result))
            .catch((error) => console.error("Error fetching data: ", error));
        setIsDeckShuffled(true);
    }

    const fetchCardFromDeck = async () => {
        await fetch(`https://deckofcardsapi.com/api/deck/${deckData.deck_id}/draw/?count=4`)
            .then((response) => response.json())
            .then((result) => setDrawnCards(result))
            .catch((error) => console.error("Error fetching data: ", error));
        SetIsCardDone(true);
    }

    return(
        <>
        <h1>welcome</h1>
        <button onClick={fetchDeckOnClick}>Shuffle a Deck</button>
        {deckData ? <pre>{JSON.stringify(deckData, null, 2)}</pre> : <p>Shuffle a deck</p>}
        {isDeckShuffled ? <button onClick={fetchCardFromDeck}>Draw a Card from the Deck</button> : <div></div>}
        {isCardDone ? drawnCards.cards.map((card, i) => (
            <Card key={i} image={card.image} value={card.value} suit={card.suit}></Card>
        )) : <p>Draw a card</p>}

        <button onClick={console.log(cardValue, drawnCards, deckData)}>CHECK</button>
        </>
    );
}