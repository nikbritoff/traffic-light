export type TrafficLightConfig = {
  color: TrafficLightColor,
  duration: number,
}

export enum TrafficLightColor {
  Red = 'red',
  Yewllow = 'yellow',
  Green = 'green',
}

export enum TrafficLightMode {
  Auto = 'auto',
  Manual = 'manual',
}

export const TRAFFIC_LIGHTS = [
  TrafficLightColor.Red,
  TrafficLightColor.Yewllow,
  TrafficLightColor.Green,
];

export const CONFIGS = [
  {
    lit: [
      TrafficLightColor.Red,
    ],
    blink: [],
    duration: 2,
  },
  {
    lit: [
      TrafficLightColor.Red,
      TrafficLightColor.Yewllow,
    ],
    blink: [],
    duration: 1,
  },
  {
    lit: [
      TrafficLightColor.Red,
    ],
    blink: [
      TrafficLightColor.Yewllow,
    ],
    duration: 4,
  },
  {
    lit: [
      TrafficLightColor.Green,
    ],
    blink: [],
    duration: 3,
  },
  {
    lit: [],
    blink: [
      TrafficLightColor.Green,
    ],
    duration: 4,
  },
  {
    lit: [
      TrafficLightColor.Yewllow,
    ],
    blink: [],
    duration: 1,
  },
];

export const BLINK_ON_TIME = 0.4;
export const BLINK_OFF_TIME = 0.7;
