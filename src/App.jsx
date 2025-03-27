import { useEffect, useState } from "react";
import Card from "./components/Card";


export default function App(){
    const [deckData, setDeckData] = useState({
        "success": Boolean,
        "deck_id": String,
        "shuffled": Boolean,
        "remaining": Number
    });
    const [cardImage, setCardImage] = useState({
        "code": "0N",
        "image": "https://placehold.co/600x400",
        "images": {
            "svg": "https://placehold.co/600x400",
            "png": "https://placehold.co/600x400"
        },
        "value": "0",
        "suit": "none"
    });
    const [drawnCard, setDrawnCard] = useState({
        "success": Boolean,
        "deck_id": String,
        "cards": [
            cardImage
        ],
        "remaining": Number
    });
    const [isDeckShuffled, setIsDeckShuffled] = useState(false);
    const [isCardDone, SetIsCardDone] = useState(false);
    const [card, setCard] = useState(null);
    

    const fetchDeckOnClick = () => {
        fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
            .then((response) => response.json())
            .then((result) => setDeckData(result))
            .catch((error) => console.error("Error fetching data: ", error));
        setIsDeckShuffled(true);
    }

    const fetchCardFromDeck = () => {
        fetch(`https://deckofcardsapi.com/api/deck/${deckData.deck_id}/draw/?count=1`)
            .then((response) => response.json())
            .then((result) => setDrawnCard(result))
            .catch((error) => console.error("Error fetching data: ", error));
        setCardWhenDoneFetching();
    }
    const setCardWhenDoneFetching = () => {
        setCard(<Card image={cardImage.image} value={cardImage.value} suit={cardImage.suit} />);
        SetIsCardDone(true);
    }

    return(
        <>
        <h1>welcome</h1>
        <button onClick={fetchDeckOnClick}>Shuffle a Deck</button>
        {deckData ? <pre>{JSON.stringify(deckData, null, 2)}</pre> : <p>Shuffle a deck</p>}
        {isDeckShuffled ? <button onClick={fetchCardFromDeck}>Draw a Card from the Deck</button> : <div></div>}
        {isCardDone ? card : <p>Draw a card</p>}

        <button onClick={console.log(cardImage, drawnCard, deckData)}>CHECK</button>
        </>
    );
}