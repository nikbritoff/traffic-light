import { TrafficLightColor } from '../../../const/traffic-light-settings';
import styles from './Section.module.scss';
import cn from 'classnames';

type SectionProps = {
  color: TrafficLightColor,
  active: boolean,
}

export const Section = ({ color, active }: SectionProps): JSX.Element => {
  const classes = cn(
    styles.light,
    styles[color],
    active && styles.active
    );

  return (
    <div className={styles.section}>
      <div className={cn(classes)}></div>
    </div>
  );
};
