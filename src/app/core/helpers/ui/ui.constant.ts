import { GlobalConfig, IndividualConfig } from "ngx-toastr";
import Swal from "sweetalert2";

export const FORMAT_FOR_DATES = "dd/MM/yyyy HH:mm";

export const FORMAT_FOR_DATES_SHORT = "dd/MM/yyyy";

export const DEFAULT_SEARCH_NG_SELECT_TERM_DELAY = 2000;

export const BUTTON_ACTIONS = {
  ACCEPT: "accept",
  ADD: "add",
  CANCEL: "cancel",
  COPY: "copy",
  CREATE: "create",
  CSV: "csv",
  DELETE: "delete",
  EDIT: "edit",
  EXCEL: "excel",
  FILTER: "filter",
  RELOAD: "reload",
  RESET: "reset",
  RESOURCE: "resource",
  RESTORE: "restore",
  SAVE: "save",
  STATS: "stats",
  UPDATE: "update",
  VIEW: "view",
} as const;

export const DEFAULT_GLOBAL_TOASTR_CONFIG: Partial<GlobalConfig> = {
  maxOpened: 1,
  autoDismiss: true,
  preventDuplicates: true,
};

export const DEFAULT_INDIVIDUAL_TOASTR_CONFIG: Partial<IndividualConfig<any>> =
  {
    positionClass: "custom-toastr-top",
    closeButton: true,
    progressBar: true,
    timeOut: 3000,
    easeTime: 500,
    easing: "ease-in-out",
    progressAnimation: "decreasing",
  };

export const NG_SELECT_QUERIES = {
  CURRENCIES: "currencies",
  COUNTRIES: "countries",
  COUNTRY: "country",
  LANGUAGE: "language",
  CITIES: "cities",
  GENDER: "gender",
  USERS: "users",
  BETSHOPS: "betshops",
  USER_ROLES: "userRoles",
  COMISSION_PLANS: "comissionPlans",
} as const;

export const DEFAULT_SEARCH_NG_SELECT_PAGINATION = {
  LIMIT: 10,
  PAGE: 1,
};

export const YEARS_DATA = [
  2024, 2025, 2026, 2027, 2028, 2029, 2030, 2031, 2032, 2033, 2034, 2035,
];

export const MONTH_DATA = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export const DAYS_DATA = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

export const FORMAT_FOR_CURRENCY_CODE = "USD";

export const FORMAT_FOR_CURRENCY_DISPLAY = "symbol";

export const FORMAT_FOR_CURRENCY_DIGITS = "1.2-2";

export const FORMAT_FOR_PERCENT_DIGITS = "1.2-2";

export const swalWithBootstrapButtons = Swal.mixin({
  customClass: {
    confirmButton: "btn btn-secondary",
    cancelButton: "btn btn-danger",
    actions: "d-flex gap-2",
  },
  buttonsStyling: false,
  reverseButtons: true,
});
