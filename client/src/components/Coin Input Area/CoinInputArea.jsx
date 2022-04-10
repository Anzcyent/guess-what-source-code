import React, { useState } from "react"
import "./CoinInputArea.css"

const CoinInputArea = ({ user, num, generate_number, play_game, token, setGuessCardNumber, alert }) => {
    const [data, setData] = useState({ guess_number: null, number: num, bet: null });

    const handleChange = e => {
        const { name, value } = e.target;
        setData({ ...data, [name]: value });
        if (e.target.name === "guess_number") setGuessCardNumber(e)
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (data.guess_number && data.bet && +data.guess_number <= 10 && +data.bet <= user?.coins) {
            play_game({ guess_number: +data.guess_number, number: num, bet: +data.bet }, token, user, +data.bet);
            setTimeout(() => generate_number(token), 5500);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="coin-input-area">
            <div className="coin-input-area-inputs">
                <input
                    type="number"
                    placeholder="Guess the number"
                    name="guess_number"
                    onChange={handleChange}
                    defaultValue={data.guess_number}
                    style={{ borderColor: `${+data.guess_number > 10 ? "red" : "var(--primary-color)"}`, outlineColor: `${+data.guess_number > 10 ? "red" : "var(--primary-color)"}` }}
                />
                <input
                    type="number"
                    placeholder="Enter your bet"
                    style={{ margin: "0 7px", borderColor: `${+data.bet > user?.coins ? "red" : "var(--primary-color)"}`, outlineColor: `${+data.bet > user?.coins ? "red" : "var(--primary-color)"}` }}
                    name="bet"
                    onChange={handleChange}
                    defaultValue={data.bet}

                />
            </div>

            <button type="submit" disabled={alert.showing_result_card_process} style={{ marginTop: 10 }}>Submit</button>

            {alert.showing_result_card_process && <span style={{ fontWeight: 700, marginTop: 7 }}>Wait for it...</span>}
        </form>
    )
}

export default CoinInputArea