import {Component} from '@angular/core';
import {AppStateService} from "../services/app-state.service";
import {LoadingService} from "../services/loading.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  actions: Array<any> = [
    {title: "Home", "route": "/home", icon: "bi bi-house text-success"},
    {title: "Products", "route": "/admin/products", icon: "bi bi-arrow-down-up text-success"},
    {title: "New Product", "route": "/admin/new-product", icon: "bi bi-plus-circle text-success"}
  ]

  currentAction: any;

  constructor(public appStateService: AppStateService,
              public loadingService :LoadingService) {
  }

  setCurrentAction(action: any) {
    this.currentAction = action;
  }
}
