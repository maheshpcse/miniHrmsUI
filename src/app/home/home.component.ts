import { Component } from '@angular/core';
@Component({selector:'app-home',templateUrl:'./home.component.html'})
export class HomeComponent {
  selected = 0;
  areas = [
    {name:'People',icon:'people',title:'Every person. One place.',description:'Keep employee profiles, onboarding details and team information together in your HR workspace.'},
    {name:'Requests',icon:'request',title:'A clear next step.',description:'Submit employee requests, follow their status and give your HR team a simple place to review them.'},
    {name:'Updates',icon:'bell',title:'Keep everyone in the loop.',description:'Read workplace notifications and share the information your people need to move forward.'}
  ];
}
