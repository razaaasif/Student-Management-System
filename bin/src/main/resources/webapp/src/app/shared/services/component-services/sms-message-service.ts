import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';
import {
  MessageResponseTypes,
  MesssageResponse,
} from '../../model/messsage-response.model';

@Injectable({ providedIn: 'root' })
export class SMSMessageService {
  constructor(private message: MessageService) {}
  showMessage(response: any): void {
    this.message.add({
      summary: response.message,
      severity:
        response.messageType === MessageResponseTypes.GENERIC_ERROR
          ? 'error'
          : 'success',

      styleClass: 'top-right',
    });
  }
}
