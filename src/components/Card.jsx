import { useState } from "react";
import styles from './Card.module.css'

export default function Card({ value, suit, image }) {
    const [cardValue, setCardValue] = useState(value);
    const [cardSuit, setCardSuit] = useState(suit);
    const [cardImage, setCardImage] = useState(image);

    return(
        <div className={styles.base}>
            <h2>{cardValue} of {cardSuit}</h2>
            <img src={cardImage} />
        </div>
    );
}