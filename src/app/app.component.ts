import { Component,Output,EventEmitter } from '@angular/core';
import { RouterOutlet, ChildrenOutletContexts } from '@angular/router';
import { slideInAnimation} from './animation'

@Component({
  selector: 'app-root',
  template: `
  <mat-toolbar color="primary">
    <span>My Application</span>
    <span class="spacer" > </span> 
    <a mat-flat-button color="primary" routerLink="todo">Todo</a>
  </mat-toolbar>
    <div [@routeAnimations]="prepareRoute(outlet)">
      <router-outlet #outlet="outlet"></router-outlet>
    </div>
  `,
  styleUrls: ['./app.component.scss'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent {
  title = 'todo-front-app';
  @Output() appMessageComponent = new EventEmitter<string>();
  constructor(
    private contexts: ChildrenOutletContexts,
  ) {}
  prepareRoute(outlet: RouterOutlet) {
    return (
      outlet && outlet.activatedRouteData && outlet.activatedRouteData['animation']
    );
  }
  
}
