import { Injectable } from '@angular/core';

import { ToastModel } from 'src/app/shared/models/toast.interface';
import { messages } from '../../../shared/constants/message.constant';

@Injectable({
  providedIn: 'root'
})
export class ToastService {
  private timerId;

  toast: ToastModel;

  constructor() {}

  showSuccess(message: string): void {
    this.toast = {
      classname: 'bg-success text-light',
      message
    };
    this.setTimer();
  }

  showFail(): void {
    this.toast = {
      classname: 'bg-danger text-light',
      message: messages.error
    };
    this.setTimer();
  }

  setTimer(): void {
    if (this.timerId) {
      clearTimeout(this.timerId);
    }

    this.timerId = setTimeout(() => {
      this.removeToast();
      this.timerId = null;
    }, 3000);
  }

  removeToast(): void {
    this.toast = null;
  }
}
