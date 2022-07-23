import './App.css';
import DrescriptionContainer from './DescriptionContainer/DrescriptionContainer';
import CoinsContainer from './CoinsContainer/CoinsContainer';
import BuySell from './BuySell/BuySell';
import HoldingCard from './HoldingCard/HoldingCard';
import TransactionCard from './TransactionCard/TransactionCard';
import { useEffect, useReducer, useRef } from 'react';
import ThemeSwitch from './ThemeSwitch/ThemeSwitch';

const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

const BTC = "bitcoin"
const ETH = "ethereum"
const DOGE = "dogecoin"
const COINS = [BTC, ETH, DOGE]

const ACTION = {
    UPDATE_COINS: "update-coins",
    TOGGLE_THEME: "toggle-theme",
    CHANGE_BRIGHTNESS: "brightness-display",
    TRANSACTION_TYPE: "transaction-type",
    COIN_TYPE: "coin-type",
    INPUT_VALUE: "input-value-record",
    TRANSACTION: "transaction",
}

function reducer(state, action) {
    switch (action.type) {
        case ACTION.UPDATE_COINS:
            let { coins } = action.payload
            return { ...state, coins: coins, isFetching: false }
        case ACTION.TOGGLE_THEME:
            return { ...state, isDarkTheme: !state.isDarkTheme }
        case ACTION.CHANGE_BRIGHTNESS:
            let newBrightness;
            let newDisplay;
            if (state.dialogBrightness === "brightness(100%)") {
                newBrightness = "brightness(50%)"
                newDisplay = "flex"
            }
            else {
                newBrightness = "brightness(100%)"
                newDisplay = "none"
            }
            return { ...state, dialogBrightness: newBrightness, dialogDisplay: newDisplay }
        case ACTION.TRANSACTION_TYPE:
            let newTransactionType
            if (action.payload === "buy") {
                newTransactionType = "buy"
            }
            else {
                newTransactionType = "sell"
            }
            return { ...state, transactionType: newTransactionType }
        case ACTION.COIN_TYPE:
            return { ...state, coinType: action.payload.name, currentPrice: action.payload.price }
        case ACTION.INPUT_VALUE:
            return { ...state, inputValue: action.payload }
        case ACTION.TRANSACTION:
            let currDateAndTime = action.payload
            let coinToBeBought = state.coinType
            let amountOfCoinsToBeBought = Number(state.inputValue)
            let priceAtTransactionTime = state.currentPrice
            let typeOfTransaction = state.transactionType
            let dollarsToBePaid = amountOfCoinsToBeBought * priceAtTransactionTime
            //To update transactions
            let tempTransactionArr = state.transactions.slice()
            let newTransaction = {
                name: coinToBeBought,
                coinsAmount: amountOfCoinsToBeBought,
                price: priceAtTransactionTime,
                type: typeOfTransaction,
                dollarsAmount: dollarsToBePaid,
                time: currDateAndTime
            }
            tempTransactionArr.push(newTransaction)
            //To update holdings
            let tempHoldingObject = { ...state.holdings }
            if (!tempHoldingObject.hasOwnProperty(`${coinToBeBought}`)) {
                tempHoldingObject[`${coinToBeBought}`] = {
                    name: coinToBeBought,
                    coinsInHolding: amountOfCoinsToBeBought,
                    dollarsPaid: dollarsToBePaid,
                }
            }
            else {
                let tempDollarPaid;
                let tempCoinInHolding;
                if (typeOfTransaction === "buy") {
                    tempDollarPaid = tempHoldingObject[`${coinToBeBought}`].dollarsPaid + dollarsToBePaid
                    tempCoinInHolding = tempHoldingObject[`${coinToBeBought}`].coinsInHolding + amountOfCoinsToBeBought
                }
                else {
                    tempDollarPaid = tempHoldingObject[`${coinToBeBought}`].dollarsPaid - dollarsToBePaid
                    tempCoinInHolding = tempHoldingObject[`${coinToBeBought}`].coinsInHolding - amountOfCoinsToBeBought
                }
                tempHoldingObject[`${coinToBeBought}`].dollarsPaid = tempDollarPaid
                tempHoldingObject[`${coinToBeBought}`].coinsInHolding = tempCoinInHolding
            }
            return { ...state, transactions: tempTransactionArr, holdings: tempHoldingObject }
        default:
            return state
    }
}

const initialState = {
    isDarkTheme: true,
    isFetching: true,
    walletBalance: 1000,
    coins: [],
    holdings: {},
    transactions: [],
    dialogBrightness: "brightness(100%)",
    dialogDisplay: "none",
    transactionType: "buy",
    coinType: null,
    currentPrice: null,
    inputValue: null
}

function App() {
    let intervalId = useRef(null)
    let [state, dispatch] = useReducer(reducer, initialState)

    async function getCoinData() {
        let response = await CoinGeckoClient.coins.all()

        let coins = response.data.filter((coin) => COINS.indexOf(coin.id) >= 0)

        dispatch({ type: ACTION.UPDATE_COINS, payload: { coins } })
    }

    useEffect(() => {
        getCoinData()
        intervalId.current = setInterval(getCoinData, 60000)

        return () => clearInterval(intervalId.current)
    }, [])

    let theme = state.isDarkTheme ? "app dark" : "app"
    let bgImage = state.isDarkTheme ? "url('./images/bg-dark.svg')" : "url('./images/bg-light.svg')"
    
    return (
        <div>
        <ThemeSwitch isDark={state.isDarkTheme} dispatch={dispatch}/>
        <BuySell state={state} dispatch = {dispatch} />

        <div className={theme} style={{backgroundImage: bgImage, filter:`${state.dialogBrightness}`}}>
            <div className='main-container' >
                <DrescriptionContainer state={state} />

                {
                    state.isFetching
                    ? <p className="fetching">Fetching...</p>
                    : <>
                        <CoinsContainer dispatch={dispatch} coinList={state.coins}/>

                        <div className='holdings-transactions'>
                            <div className="holdings">
                                <h2>Current Holdings</h2>
                                {
                                    Object.keys(state.holdings).length === 0
                                    ? <p>Go buy some</p>
                                    : <div className="holdings-list">
                                        {Object.keys(state.holdings).map(ele=>{
                                           return  <HoldingCard 
                                             updatePortfolio={dispatch}
                                             coinsData={state.coins}
                                             holdingData={state.holdings[ele]} 
                                             />                                           
                                        })}
                                        </div>
                                }
                            </div>
                            <div className="transactions">
                                <h2>Transactions</h2>
                                {
                                    state.transactions.length === 0
                                    ? <p>No transactions yet...</p>
                                    : <div className="holdings-list">
                                        {state.transactions.map(ele=>{
                                          return  <TransactionCard transactionData={ele} />

                                        })}
                                    </div>
                                }
                            </div>
                        </div>
                    </>
                }
            </div>
        </div>
        </div>
    );
}

export default App;
