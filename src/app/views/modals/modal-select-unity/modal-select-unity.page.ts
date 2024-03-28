import { Component, OnInit, ViewChild } from '@angular/core';
import { IonModal, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-select-unity',
  templateUrl: './modal-select-unity.page.html',
  styleUrls: ['./modal-select-unity.page.scss'],
})
export class ModalSelectUnityPage implements OnInit {

  private unitySelectedAttr: any = null;
  public btnDisabled: boolean = true;

  constructor(public modalCtrl: ModalController) { }

  public units = [
    {
        "id": 1,
        "fantasy_name": "Empresa 001",
        "corporate_name": "Empresa 001",
        "cnpj": "30.346.878/4071-71",
        "state_registration": "574.55418-70",
        "phone_fixed": "(42) 99906-0001",
        "status": "A",
        "addr_id": 1,
        "created_at": "2024-02-11T14:31:38.000000Z",
        "updated_at": "2024-02-11T14:31:38.000000Z",
        "pivot": {
            "user_id": 1,
            "unit_id": 1
        }
    },
    {
        "id": 2,
        "fantasy_name": "Empresa 002",
        "corporate_name": "Empresa 002",
        "cnpj": "37.003.128/0002-08",
        "state_registration": "737.77024-97",
        "phone_fixed": "(42) 99906-0002",
        "status": "A",
        "addr_id": 2,
        "created_at": "2024-02-11T14:31:38.000000Z",
        "updated_at": "2024-02-11T14:31:38.000000Z",
        "pivot": {
            "user_id": 1,
            "unit_id": 2
        }
    },
    {
        "id": 3,
        "fantasy_name": "Empresa 003",
        "corporate_name": "Empresa 003",
        "cnpj": "16.489.335/7138-95",
        "state_registration": "145.22827-19",
        "phone_fixed": "(42) 99906-0003",
        "status": "A",
        "addr_id": 3,
        "created_at": "2024-02-11T14:31:38.000000Z",
        "updated_at": "2024-02-11T14:31:38.000000Z",
        "pivot": {
            "user_id": 1,
            "unit_id": 3
        }
    }
]

  ngOnInit() {
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
