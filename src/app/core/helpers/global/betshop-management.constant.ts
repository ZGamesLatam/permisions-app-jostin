//
// BETSHOP CONSTANT
//

export const BETSHOP_TABLE_COLUMNS = [
  {
    name: "betshopManagement.betshops.name",
    prop: "name",
    width: 180,
  },
  {
    name: "words.city",
    prop: "cityId.name",
  },
  {
    name: "betshopManagement.betshops.address",
    prop: "address",
    width: 150,
  },
  {
    name: "words.currency",
    prop: "currencyId.code",
    width: 100,
  },
  {
    name: "betshopManagement.betshops.ipClient",
    prop: "ipClient",
    width: 150,
  },
];

export const BETSHOP_NG_SELECT_STATUSES = [
  {
    label: "words.all",
    value: "",
  },
  {
    label: "words.yes",
    value: true,
  },
  {
    label: "words.no",
    value: false,
  },
];

export const BETSHOP_VALIDATIONS = {
  NAME: { MAX_LENGTH: 20 },
  IP_CLIENT: { MAX_LENGTH: 15 },
  ADDRESS: { MAX_LENGTH: 100 },
  LATITUDE: { INT: 3, DEC: 5, MAX_LENGTH: 9 },
  LONGITUDE: { INT: 3, DEC: 5, MAX_LENGTH: 9 },
};

//
// CASHDESK CONSTANT
//

export const CASHDESK_TABLE_COLUMNS = [
  {
    name: "betshopManagement.cashdesks.name",
    prop: "name",
  },
  {
    name: "betshopManagement.betshops.name",
    prop: "betshopId.name",
  },
  {
    name: "words.currency",
    prop: "betshopId.currencyId.code",
  },
];

export const CASHDESK_VALIDATIONS = {
  NAME: { MAX_LENGTH: 20 },
  PASSWORD: { MIN_LENGTH: 8 },
  MINIMUM_BALANCE: {
    INT: 4,
    DEC: 2,
    MAX_LENGTH: 7,
    MIN: 0,
    MAX: 9999,
    DEFAULT: 0,
  },
  MAXIMUM_BALANCE: {
    INT: 5,
    DEC: 2,
    MAX_LENGTH: 8,
    MIN: 1,
    MAX: 10000,
    DEFAULT: 10000,
  },
  MINIMUM_BET: {
    INT: 5,
    DEC: 2,
    MAX_LENGTH: 8,
    MIN: 0.1,
    MAX: 10000,
    DEFAULT: 0.1,
  },
  MAXIMUM_LIVE_BET: {
    INT: 5,
    DEC: 2,
    MAX_LENGTH: 8,
    MIN: 0.1,
    MAX: 10000,
    DEFAULT: 800,
  },
  MAXIMUM_PRE_MATCH_BET: {
    INT: 5,
    DEC: 2,
    MAX_LENGTH: 8,
    MIN: 0.1,
    MAX: 10000,
    DEFAULT: 600,
  },
  PRE_MATCH_PERCENT: {
    INT: 3,
    DEC: 2,
    MAX_LENGTH: 6,
    MIN: 0,
    MAX: 100,
    DEFAULT: 80,
  },
  LIVE_PERCENT: {
    INT: 3,
    DEC: 2,
    MAX_LENGTH: 6,
    MIN: 0,
    MAX: 100,
    DEFAULT: 60,
  },
  COMMISSION_PERCENT: {
    INT: 3,
    DEC: 2,
    MAX_LENGTH: 6,
    MIN: 0,
    MAX: 100,
    DEFAULT: 10,
  },
};

export enum CASHDESK_TYPE {
  BOX = "box",
  TERMINAL = "terminal",
}

export enum CASHDESK_COMMISION_TYPE {
  CASINO_GGR = "casino (GGR)",
  DEPOSIT = "deposit",
  DEPOSIT_AND_WITHDRAWAL = "deposit and withdrawal",
  NGR = "NGR",
  SPORTS_BET_GGR = "sports bet (GGR)",
  WITHDRAWAL = "withdrawal",
}

export const CASHDESK_NG_SELECT_TYPES = [
  {
    label: "words.all",
    value: "",
  },
  {
    label: "betshopManagement.cashdesks.box",
    value: CASHDESK_TYPE.BOX,
  },
  {
    label: "betshopManagement.cashdesks.terminal",
    value: CASHDESK_TYPE.TERMINAL,
  },
];

export const CASHDESK_NG_SELECT_COMMISION_TYPE = [
  {
    label: "words.all",
    value: "",
  },
  {
    label: "betshopManagement.cashdesks.casino_ggr",
    value: CASHDESK_COMMISION_TYPE.CASINO_GGR,
  },
  {
    label: "betshopManagement.cashdesks.deposit",
    value: CASHDESK_COMMISION_TYPE.DEPOSIT,
  },
  {
    label: "betshopManagement.cashdesks.deposit_and_withdrawal",
    value: CASHDESK_COMMISION_TYPE.DEPOSIT_AND_WITHDRAWAL,
  },
  {
    label: "betshopManagement.cashdesks.ngr",
    value: CASHDESK_COMMISION_TYPE.NGR,
  },
  {
    label: "betshopManagement.cashdesks.sports_bet_ggr",
    value: CASHDESK_COMMISION_TYPE.SPORTS_BET_GGR,
  },
  {
    label: "betshopManagement.cashdesks.withdrawal",
    value: CASHDESK_COMMISION_TYPE.WITHDRAWAL,
  },
];
