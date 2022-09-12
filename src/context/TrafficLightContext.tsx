import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { BLINK_TIME, CONFIGS, TrafficLightColor, TrafficLightMode } from '../const/traffic-light-settings';
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
  const [ activies, setActivies ] = useState<TrafficLightColor[]>([...CONFIGS[0].blink, ...CONFIGS[0].lit]);

  const timerIdChangeConfig = useRef<undefined | NodeJS.Timeout>();
  const timerIdTurnLightsOn = useRef<undefined | NodeJS.Timeout>();
  const timerIdTurnBlinkOff = useRef<undefined | NodeJS.Timeout>();

  const setAutoMode = () => {
    setCurrentConfig(0);
    setActivies(CONFIGS[0].lit);
    setMode(TrafficLightMode.Auto);
  };

  const setManualMode = () => {
    setMode(TrafficLightMode.Manual);
    clearInterval(timerIdChangeConfig.current);
    clearInterval(timerIdTurnLightsOn.current);
    clearInterval(timerIdTurnBlinkOff.current);
  };

  const setLight = (light: TrafficLightColor) => {
    setActivies([light]);
  };

  useEffect(() => {
    const changeConfig = ():void => {
      timerIdChangeConfig.current = setTimeout(() => {
        const nextIndex = currentConfig === CONFIGS.length - 1 ? 0 : currentConfig + 1;
        setCurrentConfig(nextIndex);
        setActivies(() => [...CONFIGS[nextIndex].blink, ...CONFIGS[nextIndex].lit]);
        
        clearTimeout(timerIdChangeConfig.current);
      }, convertSecToMs(CONFIGS[currentConfig].duration));
    };

    if (mode === TrafficLightMode.Auto) {
      changeConfig();
    }

    return () => {
      clearTimeout(timerIdChangeConfig.current);
    }
  }, [currentConfig, mode]);

  useEffect(() => {
    const isBlinked = CONFIGS[currentConfig].blink.length > 0 && mode === TrafficLightMode.Auto;

    const turnBlinkOff = () => {
      timerIdTurnBlinkOff.current = setTimeout(() => {
        setActivies(() => CONFIGS[currentConfig].lit);
      }, BLINK_TIME);
    };

    const turnBlinkOn = () => {
      timerIdTurnLightsOn.current = setTimeout(() => {
        setActivies(() => [...CONFIGS[currentConfig].blink, ...CONFIGS[currentConfig].lit]);
      }, BLINK_TIME);
    };

    if (isBlinked) {
      const isBlinkedActivies = activies.findIndex((item) => item === CONFIGS[currentConfig].blink[0]);

      if (isBlinkedActivies) {
        turnBlinkOn();
      } else {
        turnBlinkOff(); 
      }
    }

    return () => {
      clearTimeout(timerIdTurnLightsOn.current);
      clearTimeout(timerIdTurnBlinkOff.current);
    }
  }, [activies, currentConfig, mode])

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
