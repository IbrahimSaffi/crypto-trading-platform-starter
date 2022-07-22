import React from 'react'
import "./BuySell.css"
export default function BuySell() {
  // let amount = 0
  return (
    <div className='buy-sell' >
        {/* State component */}
        <div className='buy-sell-label' >
        <h1>Sell Dogecoin</h1>
        <button onClick={()=>{
          // dispatch({type:"brightness"})
        }}  className='rem' >X</button>
        </div>
        <div className='sub-container' >

        <h2>Current Price $1234</h2>
        <div className='input-capacity' >
            <input onChange={((e)=>{
              // amount = e.target.value

            }
              )} type="number" />
            <h2>Max :50</h2>
        </div>
        <p>You will recieve $10</p>
        <div className='buy-input' >
        <input onClick={()=>{
          // dipatch({type:"transactionType",payload:"buy"})
          }} type="radio" name="transaction" id="" />
         <h2>Buy</h2>
        </div>
        <div className='sell-input' >
        <input onClick={()=>{
        // dipatch({type:"transactionType",payload:"sell"})
        }
      }
         type="radio" name="transaction" id="" />
        <h2>Sell</h2>
        </div>
        <button onClick={()=>{
          // dispatch({type:"transactionAmount",payload:amount})
        }}  className='buy-btn' >
          Buy
        </button>
        </div>
    </div>
  )
}
