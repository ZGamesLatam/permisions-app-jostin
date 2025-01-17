import { LanguageCode } from '../ui/language.interface';

export interface ApiResponse<T> {
  statusCode: number;
  status: string;
  message: ApiMessage;
  data: T;
}

export interface ApiData<T> {
  result: T;
  totalCount: number;
}

export type ApiMessage = string | { [key in LanguageCode]: string };
