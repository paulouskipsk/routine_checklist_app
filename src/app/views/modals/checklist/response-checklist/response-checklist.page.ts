import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { StorageService } from 'src/app/services/commons/StorageService';

import { OverlayEventDetail } from '@ionic/core/components';


@Component({
  selector: 'app-response-checklist',
  templateUrl: './response-checklist.page.html',
  styleUrls: ['./response-checklist.page.scss'],
})
export class ResponseChecklistPage implements OnInit {
  public checklistItemMov: any;

  public message: any;


  constructor(private modalCtrl: ModalController) {
    this.checklistItemMov = StorageService.getAndRemoveSessionItem('checklistItemMov');
  }

  ngOnInit() {
  }



  cancel() {
    this.modalCtrl.dismiss(null, 'cancel');
  }

  confirm() {
    this.modalCtrl.dismiss('kkkkkkkkkkkkkk', 'confirm');
  }

  onWillDismiss(event: Event) {
    const ev = event as CustomEvent<OverlayEventDetail<string>>;
    if (ev.detail.role === 'confirm') {
      this.message = `Hello, ${ev.detail.data}!`;
    }
  }
}
