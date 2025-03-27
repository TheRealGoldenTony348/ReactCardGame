import { useState } from "react";


export default function Card({ value, suit, image }) {
    const [cardValue, setCardValue] = useState(value);
    const [cardSuit, setCardSuit] = useState(suit);
    const [cardImage, setCardImage] = useState(image);

    return(
        <>
        <h2>{cardValue} of {cardSuit}</h2>
        <img src={cardImage} />
        </>
    );
}