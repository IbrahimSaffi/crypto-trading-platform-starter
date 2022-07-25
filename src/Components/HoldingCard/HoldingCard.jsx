import "./HoldingCard.css"

export default function HoldingCard(props){
        let currCardData = props.holdingData
        //currPrices of each coin
        let currPricesObj = {}
        props.coinsData.forEach(ele=>{
            currPricesObj[ele.name] =ele.market_data.current_price.usd
        })
        //price of currCardCoin
        let currCoinPrice = currCardData.coinsInHolding*currPricesObj[currCardData.name]
        //curr value of each card is need for portfolio value
        let coinsValue ={}
        coinsValue[currCardData.name] = currCoinPrice
    return <div className="holding-card">
        <h3>{currCardData.name}: {currCardData.coinsInHolding}</h3>
        <p className="details">Total Paid: ${currCardData.dollarsPaid}, Current Value: ${currCoinPrice}</p>
        <p className={`change ${currCoinPrice-currCardData.dollarsPaid>1?"up":"down"}`}>P/L: ${currCoinPrice-currCardData.dollarsPaid} </p>
    </div>
}