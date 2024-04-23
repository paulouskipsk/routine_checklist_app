import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { IonModal, ModalController, NavParams } from '@ionic/angular';
import { UtilsService } from 'src/app/services/commons/UtilsService';

@Component({
  selector: 'app-modal-select-unity',
  templateUrl: './modal-select-unity.page.html',
  styleUrls: ['./modal-select-unity.page.scss'],
})
export class ModalSelectUnityPage implements OnInit {

  private unitySelectedAttr: any = null;
  public btnDisabled: boolean = true;
  @Input() units: any;// = this.navParams.get('units');

  constructor(
    public modalCtrl: ModalController,
    private navParams: NavParams,
    private utilsService: UtilsService
  ) {}

  ngOnInit() { 
    if(this.units.length == 0) {
      this.utilsService.toastInfo("Nenhuma unidade para selecionar. Verifique suas permissões de acesso.");
      this.cancel();
    }
  }

  public unitySelected(unitySelected: number){
    this.unitySelectedAttr = unitySelected;
    this.btnDisabled = this.unitySelectedAttr == null;

    document.querySelectorAll('.unity-item').forEach(
      element => element.classList.remove('unity-selected')
    );

    document.getElementById('unity-'+unitySelected)?.classList.add("unity-selected");
  }

  confirm() {
    return this.modalCtrl.dismiss(this.unitySelectedAttr, 'Y');
  }

  cancel(){
    return this.modalCtrl.dismiss(null, 'N');
  }

  isValid(){
    return "true";
  }
}
