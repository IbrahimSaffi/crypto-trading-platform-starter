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
    TOGGLE_THEME: "toggle-theme"
}

function reducer(state, action) {
    switch (action.type) {
        case ACTION.UPDATE_COINS:
            let { coins } = action.payload
            return { ...state, coins: coins, isFetching: false }
        case ACTION.TOGGLE_THEME:
            return { ...state, isDarkTheme: !state.isDarkTheme}
        default:
            return state
    }
}

const initialState = {
    isDarkTheme: false,
    isFetching: true,
    walletBalance: 1000,
    portfolioValue: 0,
    coins: [],
    holdings: [1],
    transactions: [1]
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
        <div className={theme} style={{ backgroundImage: bgImage }}>
            <ThemeSwitch isDark={state.isDarkTheme} dispatch={dispatch} />
            <div className='main-container' >
                {/* <BuySell /> */}
                <DrescriptionContainer portfolioValue={state.portfolioValue} walletBalance={state.walletBalance} />

                {
                    state.isFetching
                        ? <p className="fetching">Fetching...</p>
                        : <>
                            <CoinsContainer coinList={state.coins} />

                            <div className='holdings-transactions'>
                                <div className="holdings">
                                    <h2>Current Holdings</h2>
                                    {
                                        state.holdings.length === 0
                                            ? <p>Go buy some</p>
                                            : <div className="holdings-list">
                                                <HoldingCard />
                                            </div>
                                    }
                                </div>
                                <div className="transactions">
                                    <h2>Transactions</h2>
                                    {
                                        state.transactions.length === 0
                                            ? <p>No transactions yet...</p>
                                            : <div className="holdings-list">
                                                <TransactionCard />
                                            </div>
                                    }
                                </div>
                            </div>
                        </>
                }
            </div>
        </div>
    );
}

export default App;
