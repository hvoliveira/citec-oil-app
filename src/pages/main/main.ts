import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { TankProvider } from '../../providers/tank/tank';
import { NewTankPage } from '../new-tank/new-tank';

@IonicPage()
@Component({
  selector: 'page-main',
  templateUrl: 'main.html',
})
export class MainPage {

  tankList: Array<any>;
  tanks: Array<any>;
  loading: Loading;


  constructor(public navCtrl: NavController, public navParams: NavParams, public tankProvider: TankProvider, public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MainPage');
    this.loading = this.loadingCtrl.create();
    this.loading.present();
    this.getTanks();

  }

  getTanks() {
    this.tankProvider.getTanks().on("value", tankListSnapshot => {
      this.tankList = [];
      tankListSnapshot.forEach(snap => {
        this.tankList.push({
          key: snap.key,
          name: snap.val().name,
          capacity: snap.val().capacity,
          phMeasured: snap.val().phMeasured,
          phHigherBound: snap.val().phHigherBound,
          phLowerBound: snap.val().phLowerBound,
          warningLevel: snap.val().warningLevel
        });
        return false;
      });
      console.log(this.tankList);
      
      this.setColors();
      this.loading.dismiss();
    });
  }

  setColors() {
    this.tanks = [];
    this.tankList.forEach(tank => {
      let color = "";
      switch (tank.warningLevel) {
        case "OK":
          color = "ok";
          break;
        case "CUIDADO":
          color = "caution";
          break;
        case "CORRIGIR":
          color = "correct";
          break;
        case "ESTADO CRÍTICO":
          color = "critical";
          break;

        case "SUBSTITUIR ÓLEO":
          color = "replace";
          break; 
        default:
          break;
      }
      this.tanks.push({
        key: tank.key,
        name: tank.name,
        capacity: tank.capacity,
        phMeasured: tank.phMeasured,
        phLowerBound: tank.phLowerBound,
        phHigherBound: tank.phHigherBound,
        warningLevel: tank.warningLevel,
        statusColor: color
      });
    });
    console.log(this.tanks);
    
  }

  goToNewTank() {
    this.navCtrl.push(NewTankPage.name);
  }

}
