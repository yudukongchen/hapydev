export type API_RESPONSE = {
  send_status: 'sending' | 'initial' | 'sendError';
  message?: string;
  status_code: number;
  response: any;
};
