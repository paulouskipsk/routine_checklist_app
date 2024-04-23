import { Component, Input, OnInit } from '@angular/core';
import { ModalController, RangeCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-show-image',
  templateUrl: './show-image.page.html',
  styleUrls: ['./show-image.page.scss'],
})
export class ShowImagePage implements OnInit {
  @Input() photo: any;
  @Input() checklistItemMov: any;

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() { }

  close(){
    this.modalCtrl.dismiss();
  }

  public async zoom(event: Event) {
    let image = await document.getElementById('image-show');    

    let value = (event as RangeCustomEvent).detail.value;
    value = Number.parseInt(value.toString()) / 100
    image?.setAttribute('style', `transform: scale(${value}, ${value})`);
  }

  public pinFormatter(value: number) {
    return `${value}%`;
  }

}
