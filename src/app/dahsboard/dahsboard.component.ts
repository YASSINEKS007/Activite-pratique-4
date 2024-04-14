import { Component } from '@angular/core';
import {AppStateService} from "../services/app-state.service";

@Component({
  selector: 'app-dahsboard',
  templateUrl: './dahsboard.component.html',
  styleUrl: './dahsboard.component.css'
})
export class DahsboardComponent {
  constructor(public appState : AppStateService ) {

  }

  totalCheckedProducts() {
    const checkedProducts = this.appState.productsState.products.filter((p:any) => p.checked === true);
    console.log("Length of checked : " + checkedProducts.length);
    return checkedProducts.length;
  }

}
