import React , {useEffect, useState } from "react";
import Card from "./Card";
import axios from "axios";

const API_BASE_URL = "https://deckofcardsapi.com/api/deck";
/** Deck: uses deck API, allows drawing card at a time. */

function Deck() {
    const [deck, setDeck] = useState(null);
    const [drawn, setDrawn] = useState([]);
    const [isShuffling, setIsShuffling] = useState(false);

    useEffect(function loadDeckFromAPI() {
        async function fetchData() {
            const d = await axios.get(`${API_BASE_URL}/new/shuffle`);
            setDeck(d.data);
        }
        fetchData();
    }, []);

    
    return (
        <div>
            <h1>Hello there</h1>
        </div>
    )
};

export default Deck;