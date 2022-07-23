import React from 'react'
import "../DescriptionContainer/DescriptionContainer.css"
export default function DrescriptionContainer(props) {
  //Updating portfolio
  let totalValue = 0
    let currPricesObj = {}
    props.state.coins.forEach(ele=>{
      currPricesObj[ele.name] =ele.market_data.current_price.usd
    })
    for(let key in props.state.holdings){
      totalValue += props.state.holdings[key].coinsInHolding*currPricesObj[key]
    }
  return (
    <div className='description-container'>
        <div className="main-label">
        <h1>
            Earn some virtual money
            </h1> 
        <img src="../images/money-bag.png" alt="" />
        </div>
        <div className="food">
         <p>To buy virtual food</p>
            <img src="../images/pizza.png" alt="" />

        </div>
         <div className="wallet">
        {/* State Component */}
            <h3>Wallet:${props.state.walletBalance}</h3>
         </div>
         <h2>
            Portfolio Value:${totalValue===0?"0.00":totalValue.toFixed(2)
            }
         </h2>
        </div>

  )
}
