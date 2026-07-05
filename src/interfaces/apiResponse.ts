export interface TResponseData<T> {
  statusCode: number;
  success: boolean;
  message: string;
  data?: T;
}
