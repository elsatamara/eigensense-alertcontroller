import { AlertStatus } from "../utils/AlertStatus";

export interface AlertInterface {
  patternId: number;
  patternName: string;
  // chartDates: Date[];
  // chartPressures: number[];
  preview: string;
  date: Date;
  location: string;
  regulator: string;
  status: string;
}
