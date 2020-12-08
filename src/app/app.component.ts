import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  num : number = 0;

  OnClick(){
    this.num++;
  }

  title = 'kognitivny-test';
}
