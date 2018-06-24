import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { TankProvider } from '../../providers/tank/tank';
import { MainPage } from '../main/main';

/**
 * Generated class for the NewTankPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-new-tank',
  templateUrl: 'new-tank.html',
})
export class NewTankPage {

  tankName: string;
  tankCapacity: number;
  tankPhMeasured: number;
  tankPhHigherBound: number;
  tankPhLowerBound: number;

  constructor(public navCtrl: NavController, public navParams: NavParams, public tankProvider: TankProvider, public toastCtrl: ToastController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewTankPage');
  }

  createTank() {
    this.tankProvider.createTank(this.tankName, this.tankCapacity, this.tankPhMeasured, this.tankPhHigherBound, this.tankPhLowerBound).then(tank => {
      let toast = this.toastCtrl.create({
        message: "Tanque criado",
        duration: 2000,
        position: "bottom"
      });
      toast.present(toast);
      console.log(tank);
      this.navCtrl.setRoot(MainPage.name);
    });
  }

}
