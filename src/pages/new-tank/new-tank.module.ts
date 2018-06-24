import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewTankPage } from './new-tank';

@NgModule({
  declarations: [
    NewTankPage,
  ],
  imports: [
    IonicPageModule.forChild(NewTankPage),
  ],
})
export class NewTankPageModule {}
