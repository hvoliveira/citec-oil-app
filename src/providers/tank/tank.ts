import { Injectable } from '@angular/core';
import firebase from 'firebase';
import { Reference, ThenableReference } from "@firebase/database-types";

@Injectable()
export class TankProvider {

  tanksRef : Reference; //tank list reference
  tankRef : Reference; //individual tank
  
  constructor() {
    this.tanksRef = firebase.database().ref(`tanks`);

  }

  getTanks() {
    return this.tanksRef;
  }

  createTank(tankName: string, tankCapacity: number, tankPhMeasured: number, tankPhHigherBound: number, tankPhLowerBound: number) {

    let warningLevel = "OK";

    if (tankPhMeasured < tankPhLowerBound || tankPhMeasured > tankPhHigherBound) {
      if (tankPhMeasured > tankPhHigherBound) {
        warningLevel = "CUIDADO";
      } else {
        if (tankPhLowerBound - tankPhMeasured <= 0.3) {
          warningLevel = "CUIDADO";
        } else if (tankPhLowerBound - tankPhMeasured <= 0.6) {
          warningLevel = "CORRIGIR";
        } else if (tankPhLowerBound - tankPhMeasured <= 1) {
          warningLevel = "ESTADO CRÍTICO";
        } else {
          warningLevel = "SUBSTITUIR ÓLEO";
        }
    }
  }

  return this.tanksRef.push({
    name: tankName,
    capacity: tankCapacity,
    warningLevel: warningLevel,
    phMeasured: tankPhMeasured,
    phLowerBound: tankPhLowerBound,
    phHigherBound: tankPhHigherBound
    });
  }
}
