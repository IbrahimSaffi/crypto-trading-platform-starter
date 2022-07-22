
import './App.css';
import DrescriptionContainer from './DescriptionContainer/DrescriptionContainer';
import CoinsContainer from './CoinsContainer/CoinsContainer';
import BuySell from './BuySell/BuySell';
function App() {
  return (
    <div className="App">
      <BuySell/>
      <DrescriptionContainer/>
      <CoinsContainer/>
      <div className='holdings-transactions'></div>
    </div>
  );
}

export default App;
