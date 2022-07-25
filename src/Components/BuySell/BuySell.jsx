import React from 'react'
import "./BuySell.css"
export default function BuySell(props) {
  //Maximum coins that can bought
  let maxCoins = props.state.walletBalance/props.state.currentPrice
  function handleBuySellClick(){
       let date = Date().split(" ").slice(2,5)
            date.unshift(new Date().getMonth()+1)
            let time = date.pop() 
            date = date.join("/")
            props.dispatch({type:"transaction",payload:`${date} ${time}`})
            console.log(props.state.transactions,props.state.holdings)
  }
  return (
    <div style={{display:props.state.dialogDisplay}} className='buy-sell' >
        {/* State component */}
        <div className='buy-sell-label' >
        <h1 style={{textTransform:"capitalize"}} >{props.state.transactionType} {props.state.currencyType}</h1>
        <button onClick={()=>{
          props.dispatch({type:"brightness-display"})
        }}  className='rem' >X</button>
        </div>
        <div className='sub-container' >

        <h2>Current Price ${props.state.currentPrice}</h2>
        <div className='input-capacity' >
            <input onChange={((e)=>{
              props.dispatch({type : "input-value-record",payload:e.target.value})
            }
              )} 
              onKeyDown={(e)=>{
                if(e.key==="Enter"){
                  if(props.state.walletBalance/props.state.currentPrice){
                    if(e.target.value>0&&e.target.value<maxCoins){
                      handleBuySellClick()
                    }
                    else {
                      props.dispatch({type:"display-error"})
                    }
                  }
                }
               }}
              type="number"  max={maxCoins}/>
            <h2>Max :{props.state.transactionType==="buy"?
              maxCoins:(props.state.holdings.hasOwnProperty(props.state.currencyType)?props.state.holdings[props.state.currencyType].coinsInHolding:0)}</h2>
        </div>
        <p>You will {props.state.transactionType==="buy"?"charged":"recieve"}  ${props.state.currentPrice*props.state.inputValue}</p>
        <p style={{color:"red" , display:props.state.displayError}} className='Error' >Not enough {props.state.transactionType==="buy"?"balance":"holdings"}</p>
        <div className='buy-input' >
        <input onClick={()=>{
          props.dispatch({type:"transaction-type",payload:"buy"})
          //To hide error
          props.dispatch({type:"display-error",payload:"option-changed" })
          }} type="radio" name="transaction" id="" checked={props.state.transactionType==="buy"} />
         <h2>Buy</h2>
        </div>
        <div className='sell-input' >
        <input onClick={()=>{
        props.dispatch({type:"transaction-type",payload:"sell"})
        //To hide error
        props.dispatch({type:"display-error",payload:"option-changed"})
        }
      }
         type="radio" name="transaction" id="" checked={props.state.transactionType==="sell"} />
        <h2>Sell</h2>
        </div>
        <button style={{textTransform:"capitalize"}} onClick={()=>{
          if(props.state.inputValue>0&&props.state.inputValue<maxCoins){
            handleBuySellClick()
          }
          else {
            props.dispatch({type:"display-error"})
          }
        }}  className='buy-btn' >
         {props.state.transactionType}
        </button>
        </div>
    </div>
  )
}
