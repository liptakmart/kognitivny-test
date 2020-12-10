import { Component, OnInit } from '@angular/core';
import emailjs, { EmailJSResponseStatus } from 'emailjs-com';
import{ init } from 'emailjs-com';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  ngOnInit(): void {
    init("user_T3rGT6R5ythZGZmhjdKcS");
    console.log("inited");
  }

  num : number = 0;
  //EMAILJS : any = emailjs;

  templateParams = {
    from_name: 'James',
    test_result: '9'
  };

  OnClick(){
    this.num++;
    this.send();
  }

  title = 'kognitivny-test';

  public send() {
    emailjs.send('service_kq89dcl', 'template_atx1v19', this.templateParams, 'user_T3rGT6R5ythZGZmhjdKcS')
      .then((result: any) => {
        console.log(result.text);
      }, (error) => {
        console.log(error.text);
      });
  }

}
