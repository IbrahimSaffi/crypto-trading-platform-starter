import "./TransactionCard.css"

export default function TransactionCard(props){
    let currCardData = props.transactionData 
    console.log(props.transactionData)
    return <div className={`transaction-card ${currCardData.type}`}>
        <h3>{currCardData.name} - {currCardData.coinsAmount} @ ${currCardData.price}</h3>
        <p className="details">{currCardData.type==="buy"?"Paid":"Recieved"}: ${currCardData.dollarsAmount}</p>
        <p className="date">Bought on {currCardData.time}</p>
    </div>
}