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

    /** Draw card: change the state & effect will kick in. */
    async function draw() {
        try {
            const drawRes = await axios.get(`${API_BASE_URL}/${deck.deck_id}/draw/`);

            if (drawRes.data.remaining === 0) throw new Error("Deck empty!");

            const card = drawRes.data.cards[0];

            setDrawn(d => [
                ...d,
                {
                    id: card.code,
                    name: card.suit + " " + card.value,
                    image: card.image,
                },
            ]);
        } catch (err){
            alert(err);
        }
    }

    /** Shuffle: change the state & effect will kick in */
    async function startShuffling() {
        setIsShuffling(true);
        try {
            await axios.get(`${API_BASE_URL}/${deck.deck_id}/shuffle/`);
            setDrawn([]);
        } catch (err) {
            alert(err);
        } finally {
            setIsShuffling(false);
        }
    }

    /** Return draw button (disabled if shuffling) */
    function renderDrawBtnIfOk() {
        if (!deck) return null;
    

    return (
        <button
            className="Deck-gimme"
            onCLick={draw}
            disabled={isShuffling}>
            DRAW
        </button>
        );
    }

};

export default Deck;