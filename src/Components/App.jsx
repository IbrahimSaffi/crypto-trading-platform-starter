import './App.css';
import DrescriptionContainer from './DescriptionContainer/DrescriptionContainer';
import CoinsContainer from './CoinsContainer/CoinsContainer';
import BuySell from './BuySell/BuySell';
import HoldingCard from './HoldingCard/HoldingCard';
import TransactionCard from './TransactionCard/TransactionCard';

function App() {
    return (
        <div className="app">
            <BuySell/>
            <DrescriptionContainer/>
            <CoinsContainer/>
            
            <div className='holdings-transactions'>
                <div className="holdings">
                    <h2>Current Holdings</h2>
                    <p>Go buy some</p>
                    <div className="holdings-list">
                        <HoldingCard />
                    </div>

                </div>
                <div className="transactions">
                    <h2>Transactions</h2>
                    <p>No transactions yet...</p>
                    <div className="holdings-list">
                        <TransactionCard/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;
