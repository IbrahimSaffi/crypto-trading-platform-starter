import React from 'react'
import "../DescriptionContainer/DescriptionContainer.css"
export default function DrescriptionContainer({portfolioValue, walletBalance}) {
    return (
        <div className='description-container'>
            <div className="main-label">
                <h1>
                    Earn some virtual money
                    💰
                </h1>
            </div>
            <div className="food">
                <p>To buy virtual food 🍕</p>
            </div>
            <div className="wallet">
                {/* State Component */}
                <h3>💸 Wallet: ${walletBalance}</h3>
            </div>
            <h2 className='portfoilio'>
                Portfolio Value: ${portfolioValue}
            </h2>
        </div>
    )
}
