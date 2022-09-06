import { TrafficLight } from '../TrafficLight/TrafficLight';
import styles from './Street.module.scss';

export const Street = (): JSX.Element => {
  return (
    <div className={styles.street}>
      <TrafficLight />
    </div>
  );
};
