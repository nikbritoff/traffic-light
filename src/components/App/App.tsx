import styles from './App.module.scss';
import { Street } from '../Street/Street';
import { Controls } from '../Controls/Controls';
import { TrafficLightProvider } from '../../context/TrafficLightContext';

function App() {
  return (
    <div className={styles.app}>
      <TrafficLightProvider>
        <Street />
        <Controls />
      </TrafficLightProvider>
    </div>
  );
}

export default App;
