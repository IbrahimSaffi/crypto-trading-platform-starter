import "./TransactionCard.css"

export default function TransactionCard({currencyName, currencyAmount, buyPrice, paidPrice, date}){

    
    return <div className="transaction-card sell">
        <h3>Dogecoin - 50 @ $0.51234</h3>
        <p className="details">Paid: $25.00</p>
        <p className="date">Bought on 14/05/2021, 10:40:43</p>
    </div>
}