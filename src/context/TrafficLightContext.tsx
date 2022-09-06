import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { BLINK_OFF_TIME, BLINK_ON_TIME, CONFIGS, TrafficLightColor, TrafficLightMode } from '../const/traffic-light-settings';
import { convertSecToMs } from '../utils/convertSecToMs';

type TrafficLightContextType = {
  mode: TrafficLightMode,
  setAutoMode: () => void,
  setManualMode: () => void,
  setLight: (light: TrafficLightColor) => void,
  activies: TrafficLightColor[],
  currentConfig: number,
};

type TrafficLightContextProps = {
  children: React.ReactNode;
};
  
const TrafficLightContext = createContext<TrafficLightContextType>({} as TrafficLightContextType);
  
export const TrafficLightProvider: React.FC<TrafficLightContextProps> = (
  props: TrafficLightContextProps,
  ) => {
  const [mode, setMode] = useState(TrafficLightMode.Auto);
  const [ currentConfig, setCurrentConfig ] = useState(0);
  const [ lit, setLit ] = useState<TrafficLightColor[]>(CONFIGS[0].lit);
  const [ blink, setBlink ] = useState<TrafficLightColor[]>(CONFIGS[0].blink);
  const [ activies, setActivies ] = useState<TrafficLightColor[]>([...CONFIGS[0].blink, ...CONFIGS[0].lit]);

  const timerIdChangeConfig = useRef<undefined | NodeJS.Timeout>();
  const timerIdTurnLightsOn = useRef<undefined | NodeJS.Timeout>();
  const timerIdTurnBlinkOff = useRef<undefined | NodeJS.Timeout>();

  const setAutoMode = () => {
    setCurrentConfig(0);
    setLit(CONFIGS[0].lit);
    setBlink([]);
    setActivies(CONFIGS[0].lit);
    setMode(TrafficLightMode.Auto);
  };

  const setManualMode = () => {
    setMode(TrafficLightMode.Manual);
    clearInterval(timerIdChangeConfig.current);
    clearInterval(timerIdTurnLightsOn.current);
  };

  const setLight = (light: TrafficLightColor) => {
    setActivies([light]);
  };

  useEffect(() => {
    const changeConfig = ():void => {
      timerIdTurnBlinkOff.current = setTimeout(() => {
        currentConfig === CONFIGS.length - 1
        ? setCurrentConfig(0)
        : setCurrentConfig(() => currentConfig + 1);
        
        clearTimeout(timerIdTurnBlinkOff.current);
      }, convertSecToMs(CONFIGS[currentConfig].duration));
    };

    const turnLightsOn = () => {
      timerIdChangeConfig.current = setTimeout(() => {
        setBlink(CONFIGS[currentConfig].blink);
        setLit(CONFIGS[currentConfig].lit);
        setActivies([...CONFIGS[currentConfig].blink, ...CONFIGS[currentConfig].lit]);
      }, convertSecToMs(BLINK_ON_TIME));
    };

    const turnBlinkOff = () => {
      timerIdTurnLightsOn.current = setTimeout(() => {
        setBlink([]);
        setActivies(() => [...CONFIGS[currentConfig].lit]);
      }, convertSecToMs(BLINK_OFF_TIME));
    };

    if (mode === TrafficLightMode.Auto) {
      changeConfig();
      turnLightsOn();
      turnBlinkOff();
    }

    return () => {
      clearTimeout(timerIdChangeConfig.current);
      clearTimeout(timerIdTurnLightsOn.current);
    }
  }, [currentConfig, mode, lit, blink]);

  return (
    <TrafficLightContext.Provider value={{
      mode,
      setAutoMode,
      setManualMode,
      activies,
      currentConfig,
      setLight,
    }}>
      {props.children}
    </TrafficLightContext.Provider>
  );
};

export const useTrafficLightContext = () => {
  const context = useContext(TrafficLightContext);

  return context;
};
