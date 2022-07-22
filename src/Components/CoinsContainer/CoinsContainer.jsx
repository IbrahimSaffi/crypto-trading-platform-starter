import React from 'react'
import "../CoinsContainer/CoinsContainer.css"
export default function CoinsContainer() {
  return (
    <div className='coins-container' >
        <div className='coin-card' >
            <img src="../images/bc.png" alt="" />
            <div className='coin-card-text' > 
              <h1>
              $12345
              </h1>
              <h2>
                Bitcoin
              </h2>
              <h3 className='won' >
                Last 24h: -23456%
              </h3>
            </div>
        </div>
        <div className='coin-card' >
            <img src="../images/eth.png" alt="" />
            <div className='coin-card-text' > 
              <h1>
              $12345
              </h1>
              <h2>
                Bitcoin
              </h2>
              <h3 className='won' >
                Last 24h: -23456%
              </h3>
            </div>
        </div>
        <div className='coin-card' >
            <img src="../images/dc.png" alt="" />
            <div className='coin-card-text' > 
              <h1>
              $12345
              </h1>
              <h2>
                Bitcoin
              </h2>
              <h3 className='won' >
                Last 24h: -23456%
              </h3>
            </div>
        </div>
    </div>
  )
}
