import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ModalController, RangeCustomEvent } from '@ionic/angular';
import { IonicSlides } from '@ionic/angular';
import { Swiper } from 'swiper';

@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.page.html',
  styleUrls: ['./show-image.page.scss'],
})
export class ShowImagePage implements OnInit {
  @Input() photo: any;
  @Input() checklistItemMov: any;
  @ViewChild('swiper')

  swiperRef: ElementRef | undefined;
  swiper?: Swiper;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

  close(){
    this.modalCtrl.dismiss();
  }
}