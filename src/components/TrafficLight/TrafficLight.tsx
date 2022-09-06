import { TrafficLightColor, TRAFFIC_LIGHTS } from '../../const/traffic-light-settings';
import { useTrafficLightContext } from '../../context/TrafficLightContext';
import { Section } from './Section/Section';
import styles from './TrafficLight.module.scss';

export const TrafficLight = (): JSX.Element => {
  const { activies, } = useTrafficLightContext();

  return (
    <div className={styles.case}>
      {TRAFFIC_LIGHTS.map((light: TrafficLightColor) => (
        <Section
          key={light}
          color={light}
          active={activies.indexOf(light) >= 0}
        />
      ))}
    </div>
  );
};
