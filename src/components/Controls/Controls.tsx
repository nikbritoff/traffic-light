import styles from './Controls.module.scss';
import cn from 'classnames';
import { useTrafficLightContext } from '../../context/TrafficLightContext';
import { TrafficLightMode, TRAFFIC_LIGHTS } from '../../const/traffic-light-settings';

export const Controls = (): JSX.Element => {
  const { setLight, mode, setAutoMode, setManualMode, activies } = useTrafficLightContext();

  return (
    <div className={styles.controls}>
      <button
        className={cn(
          styles.control,
          styles.auto,
          mode === TrafficLightMode.Auto && styles.active
        )}
        onClick={() => {
          setAutoMode();
        }}
      >
        Auto
      </button>
      {TRAFFIC_LIGHTS.map((item) => (
        <button
          key={item}
          className={cn(
            styles.control,
            (mode === TrafficLightMode.Manual && activies.indexOf(item) >= 0) && styles.active
            )}
          onClick={() => {
            setManualMode();
            setLight(item);
          }}
        >
          {item}
        </button>
      ))}
    </div>
  );
};
