import { HttpOptionValue } from '@shared/types';

export interface IHttpArguments {
  urlPath: string;
  body?: unknown;
  urlHost?: string;
  httpClientOptions?: {
    [key: string]: HttpOptionValue;
  };
}
