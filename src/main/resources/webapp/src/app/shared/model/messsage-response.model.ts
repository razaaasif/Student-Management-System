export type MessageResponseType = 'generic_success' | 'generic_error';

export class MessageResponseTypes {
  public static GENERIC_SUCCESS: MessageResponseType = 'generic_success';
  public static GENERIC_ERROR: MessageResponseType = 'generic_error';
}

export class MesssageResponse {
  messageType: MessageResponseType;
  message: string;
}
