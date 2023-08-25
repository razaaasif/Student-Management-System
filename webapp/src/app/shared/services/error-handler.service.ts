import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService {
  constructor(private messageService: MessageService) {}

  handleHttpError(errorResponse: HttpErrorResponse) {
    if (errorResponse.status === 400) {
      const errorMessages = this.extractErrorMessages(errorResponse.error);
      this.showMessages(errorMessages);
    }
  }

  private extractErrorMessages(error: any): string[] {
  const fieldMapping = {
    lastName: 'Last Name',
    firstName: 'First Name',
    email: 'Email',
    name: 'Name',
    password: 'Password'
    // Add more field mappings if needed
  };
    const errorMessages = [];
    for (const key in error.errors) {
      if (error.errors.hasOwnProperty(key)) {
        const field = fieldMapping[key] || key; // Use the mapped name if available, otherwise use the key
        errorMessages.push(`${field}: ${error.errors[key]}`);
      }
    }
    return errorMessages;
  }

  private showMessages(errorMessages: string[]) {
    errorMessages.forEach((message) => {
      this.messageService.add({ severity: 'error', detail: message + '.' });
    });
  }
}
