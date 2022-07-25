import './App.css';
import DrescriptionContainer from './DescriptionContainer/DrescriptionContainer';
import CurrencyContainer from './CurrencyContainer/CurrencyContainer';
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
    CURRENCY_TYPE: "currency-type",
    INPUT_VALUE: "input-value-record",
    TRANSACTION: "transaction",
    DISPLAY_ERROR:"display-error"
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
        case ACTION.CURRENCY_TYPE:
      return { ...state, currencyType: action.payload.name, currentPrice: action.payload.price }
        case ACTION.INPUT_VALUE:
            return { ...state, inputValue: action.payload }
        case ACTION.TRANSACTION:
            let currDateAndTime = action.payload
            let currency = state.currencyType
            let amountOfCoins = Number(state.inputValue)
            let priceAtTransactionTime = state.currentPrice
            let typeOfTransaction = state.transactionType
            let dollarsToBePaid = amountOfCoins * priceAtTransactionTime
            let tempWallet = state.walletBalance
            //To update transactions
            let tempTransactionArr = state.transactions.slice()
            let newTransaction = {
                name: currency,
                coinsAmount: amountOfCoins,
                price: priceAtTransactionTime,
                type: typeOfTransaction,
                dollarsAmount: dollarsToBePaid,
                time: currDateAndTime
            }
            tempTransactionArr.push(newTransaction)
            //To update holdings
            let tempHoldingObject = JSON.parse(JSON.stringify(state.holdings)) 
            if (!tempHoldingObject.hasOwnProperty(`${currency}`)) {
                tempHoldingObject[`${currency}`] = {
                    name: currency,
                    coinsInHolding: amountOfCoins,
                    dollarsPaid: dollarsToBePaid,
                }
            }
            else {
                let tempDollarPaid;
                let tempCoinInHolding;
                if (typeOfTransaction === "buy") {
                    //To update wallet
                    tempWallet = tempWallet-dollarsToBePaid
                    tempDollarPaid = state.holdings[`${currency}`].dollarsPaid + dollarsToBePaid
                    tempCoinInHolding = state.holdings[`${currency}`].coinsInHolding + amountOfCoins
                }
                else {
                    //TO update wallet
                    tempWallet = tempWallet+dollarsToBePaid
                    tempDollarPaid = state.holdings[`${currency}`].dollarsPaid - dollarsToBePaid
                    tempCoinInHolding = state.holdings[`${currency}`].coinsInHolding - amountOfCoins
                }
                console.log(tempCoinInHolding,amountOfCoins)
                //Bug is here. In console.log above tempCoinsInHolding shows correct amount but when I re-assign it it changes in object
                tempHoldingObject[`${currency}`].dollarsPaid = tempDollarPaid
                tempHoldingObject[`${currency}`].coinsInHolding = tempCoinInHolding
            }
            return { ...state, transactions: tempTransactionArr, holdings: tempHoldingObject,walletBalance:tempWallet }
            case ACTION.DISPLAY_ERROR:
                let tempDisplayError;
                if(action.payload==="option-changed"){
                    tempDisplayError="none"
                }
                else {
                    tempDisplayError="block"
                }
                return { ...state, displayError:tempDisplayError}
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
    currencyType: null,
    currentPrice: null,
    inputValue: null,
    displayError:"none"
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
                        <CurrencyContainer dispatch={dispatch} coinList={state.coins}/>

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
                                    : <div style={state.transactions.length>3?{overflowY:"scroll"}:{overflowY:'hidden'} }className="holdings-list">
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
