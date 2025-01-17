import {
  BUTTON_ACTIONS,
  NG_SELECT_QUERIES,
} from "../../helpers/ui/ui.constant";
import { ModalWithAction } from "./bootstrap-modal.interface";

export interface NgSelect<T> {
  value: T;
  label: string;
  icon?: string;
  group?: string;
  currencyId?: string;
}

export type ButtonAction = (typeof BUTTON_ACTIONS)[keyof typeof BUTTON_ACTIONS];

export type NgSelectQuery =
  (typeof NG_SELECT_QUERIES)[keyof typeof NG_SELECT_QUERIES];

export interface CustomDateSelector {
  selectedYears?: number[];
  selectMonth?: string[];
  selectedDays?: number[];
  selectWeekDay?: string[];
}

export interface CheckedEventTarget extends Event {
  target: HTMLInputElement;
}

export interface ModalData {
  name: string;
  title: string;
  dataValue: string[];
  [key: string]: any;
}

export interface Select {
  label: string;
  value: string;
}

export const TYPE_DATE = {
  DAY: "day",
  MONTH: "month",
  YEAR: "year",
};

