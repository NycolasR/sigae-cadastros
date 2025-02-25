import { Injectable } from '@angular/core';
import { MenuMaster } from '../models/menu-master';

@Injectable({
  providedIn: 'root'
})
export class MenuMasterService {
  private static MenuMasterKey: string = 'MenuMasterKey';

  menuMaster: MenuMaster;

  constructor( ) { }


  // setItem(key: string, value: any): void {
  //   localStorage.setItem(key, JSON.stringify(value));
  // }

  // getItem<T>(key: string): T | null {
  //   const value = localStorage.getItem(key);
  //   if (value) {
  //     return JSON.parse(value);
  //   }
  //   return null;
  // }


  possuiFiltro(): boolean {
    return !!localStorage.getItem(MenuMasterService.MenuMasterKey);
  }

  getFiltro() {
    if(!this.possuiFiltro()) {
      return;
    }
    
    const aux = localStorage.getItem(MenuMasterService.MenuMasterKey);
    if(aux) this.menuMaster = new MenuMaster(JSON.parse(aux));
    if(!!this.menuMaster && (!!this.menuMaster.escola && !!this.menuMaster.escola.id) || (!!this.menuMaster.pessoa && !!this.menuMaster.pessoa.id)) { 
      return this.menuMaster;
    }
    return;
  }
}
  
