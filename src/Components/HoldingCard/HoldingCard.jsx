import "./HoldingCard.css"

export default function HoldingCard({currencyName, currencyAmount, totalPaid, currentValue, change}){

    return <div className="holding-card">
        <h3>Dogecoin: 50</h3>
        <p className="details">Total Paid: $25.00, Current Value: $25.59</p>
        <p className="change up">P/L: $0.00 </p>
    </div>
}