import './App.css';
import DrescriptionContainer from './DescriptionContainer/DrescriptionContainer';
import CoinsContainer from './CoinsContainer/CoinsContainer';
import BuySell from './BuySell/BuySell';
import HoldingCard from './HoldingCard/HoldingCard';
import TransactionCard from './TransactionCard/TransactionCard';
import { useEffect, useReducer, useRef, useState } from 'react';

const CoinGecko = require('coingecko-api');
const CoinGeckoClient = new CoinGecko();

const BTC = "bitcoin"
const ETH = "ethereum"
const DOGE = "dogecoin"
const COINS = [BTC, ETH, DOGE]

const ACTION = {
    TOGGLE_FETCH: "toggle-fetch",
    UPDATE_COINS: "update-coins"
}

function reducer(state, action) {
    switch (action.type) {
        case ACTION.TOGGLE_FETCH:
            return {...state, isFetching: !state.isFetching}
        case ACTION.UPDATE_COINS:
            let {coins} = action.payload
            return {...state, coins: coins}
    }
}

const initialState = {
    isFetching: true,
    walletBalance: 1000,
    portfolioValue: 0,
    coins: [],
    holdings: [],
    transactions: []
}

function App() {
    let intervalId = useRef(null)
    let [state, dispatch] = useReducer(reducer, initialState)

    async function getCoinData(){
        let response = await CoinGeckoClient.coins.all()
        
        let coins = response.data.filter((coin) => COINS.indexOf(coin.id) >= 0)

        dispatch({type: ACTION.UPDATE_COINS, payload: {coins}})

        if (state.isFetching){
            dispatch({type: ACTION.TOGGLE_FETCH})
        }
    }

    useEffect(() => {
        intervalId.current = setInterval(getCoinData, 5000)
    }, [])

    return (
        <div className="app" style={{backgroundImage: "url('./images/bg.svg')"}}>
            <div className='main-container' >
                <BuySell />
                <DrescriptionContainer />

                {
                    state.isFetching
                    ? <p className="fetching">Fetching...</p>
                    : <>
                        <CoinsContainer coinList={state.coins}/>

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
