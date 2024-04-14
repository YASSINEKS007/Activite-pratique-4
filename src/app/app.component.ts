import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  actions : Array<any> = [
    {title: "Home", "route":"/home", icon:"bi bi-house text-success"},
    {title: "Products", "route":"/products", icon:"bi bi-arrow-down-up text-success"},
    {title: "New Product", "route":"/new-product", icon:"bi bi-plus-circle text-success"}
  ]

  currentAction : any;
  setCurrentAction(action: any) {
    this.currentAction = action;
  }
}
