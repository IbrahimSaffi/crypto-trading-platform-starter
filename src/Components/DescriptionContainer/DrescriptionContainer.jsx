import React from 'react'
import "../DescriptionContainer/DescriptionContainer.css"
export default function DrescriptionContainer() {
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
            <h3>Wallet:$100</h3>
         </div>
         <h2>
            Portfolio Value:$50.80
         </h2>
        </div>

  )
}
