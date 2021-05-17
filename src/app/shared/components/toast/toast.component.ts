import { Component, Input, OnInit, ViewChild } from '@angular/core';

import { NgbToast } from '@ng-bootstrap/ng-bootstrap';

import { ToastModel } from '../../models/toast.interface';
import { ToastService } from '../../../core/services/toast/toast.service';

@Component({
  selector: 'app-toast',
  templateUrl: './toast.component.html',
  styleUrls: ['./toast.component.scss']
})
export class ToastComponent implements OnInit {
  get toast(): ToastModel {
    return this.toastService.toast;
  }

  constructor(private toastService: ToastService) { }

  ngOnInit(): void {}
}
