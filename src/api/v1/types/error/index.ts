import type { AxiosError } from 'axios';

export interface ErrorResponse {
  code: string;
  message: string;
}

export type BackendError = AxiosError<ErrorResponse>;
