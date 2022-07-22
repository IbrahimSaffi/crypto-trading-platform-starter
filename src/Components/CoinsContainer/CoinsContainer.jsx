import React from 'react'
import "../CoinsContainer/CoinsContainer.css"
export default function CoinsContainer({ coinList }) {


    return (
        <div className='coins-container' >
            {coinList.map((coin) => {
                let change = coin.market_data.price_change_percentage_24h <= 0 ? "down" : "up"

                return <div key={coin.id} className='coin-card' >
                    <img src={coin.image.large} alt="" />
                    <div className='coin-card-text' >
                        <h1>
                            ${coin.market_data.current_price.usd}
                        </h1>
                        <h2>
                            {coin.name}
                        </h2>
                        <h3 className={change} >
                            Last 24h: {coin.market_data.price_change_percentage_24h}%
                        </h3>
                    </div>
                </div>
            }
            )}
        </div>
    )
}
