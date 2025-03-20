import { useEffect, useState } from "react";


export default function App(){
    const [deckData, setDeckData] = useState(null);


    const fetchACardOnClick = () => {
        fetch("https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1")
            .then((response) => response.json())
            .then((result) => setDeckData(result))
            .catch((error) => console.error("Error fetching data: ", error));
    
    }

    return(
        <>
        <h1>welcome</h1>
        <button onClick={fetchACardOnClick}>Shuffle a Deck</button>
        {deckData ? <pre>{JSON.stringify(deckData, null, 2)}</pre> : <p>Shuffle a deck</p>}
        </>
    );
}