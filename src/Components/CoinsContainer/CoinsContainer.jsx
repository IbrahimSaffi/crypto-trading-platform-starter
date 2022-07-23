import React from 'react'
import "../CoinsContainer/CoinsContainer.css"
export default function CoinsContainer( {dispatch, coinList }) {

    return (
        <div className='coins-container' >
            {coinList.map((coin) => {
                let change = coin.market_data.price_change_percentage_24h <= 0 ? "down" : "up"
                return <div 
                onClick={()=>{dispatch({type:"brightness-display"})
                dispatch({type:"coin-type",payload:{name:coin.name,price:coin.market_data.current_price.usd}})
                
            }
                    
            } 
                key={coin.id} className='coin-card' >
                    <img src={coin.image.large} alt="" />
                    <div className='coin-card-text' >
                        <h2>
                            ${coin.market_data.current_price.usd}
                        </h2>
                        <h3>
                            {coin.name}
                        </h3>
                        <h4 className={change} >
                            Last 24h: {coin.market_data.price_change_percentage_24h}%
                        </h4>
                    </div>
                </div>
            }
            )}
        </div>
    )
}
