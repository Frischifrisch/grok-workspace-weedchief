export type Lang = "en" | "de" | "ru";
export type Theme = "dark" | "light";

export type FwKind = "controller" | "dashboard";
export type ModelId = "st5max" | "st3";

export type Firmware = {
  slug: string;
  model: ModelId;
  kind: FwKind;
  familyKey: string;
  titleKey: string;
  descKey: string;
  speedKey: string;
  speedValue: string;
  testing?: boolean;
  badges: string[];
  version: string;
  controllerFamily: string;
  checksum: string;
  photo: "st5max-hero" | "st3-hero" | "st5max-front" | "st5max-side";
  accentCta?: boolean;
  zeroStart?: boolean;
  policeMode?: boolean;
};

export type Scooter = {
  id: string;
  name: string;
  model: ModelId;
  serial: string;
  controller: string;
  firmware: string;
  battery: number;
  rssi: number;
  connected: boolean;
  startSpeed: number;
};

export type FlashRecord = {
  id: string;
  at: number;
  slug: string;
  title: string;
  serial: string;
  result: "ok" | "fail";
  checksum: string;
};

export type Session = {
  email: string;
  at: number;
};
