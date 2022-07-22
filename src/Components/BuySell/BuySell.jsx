import React from 'react'
import "./BuySell.css"
export default function BuySell() {
  return (
    <div className='buy-sell' >
        {/* State component */}
        <div className='buy-sell-label' >
        <h1>Sell Dogecoin</h1>
        <button>X</button>
        </div>
        <div className='sub-container' >

        <h2>Current Price $1234</h2>
        <div className='input-capacity' >
            <input type="text" />
            <h2>Max :50</h2>
        </div>
        <p>You will recieve $10</p>
        <div className='buy' >
        <input type="radio" name="buy" id="" />
         <h2>Buy</h2>
        </div>
        <input type="radio" name="sell" id="" />
        <h2>Sell</h2>
        </div>
    </div>
  )
}
