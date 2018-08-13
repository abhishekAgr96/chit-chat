import { Component, OnInit } from '@angular/core';
import {GoogleLoginProvider,AuthService} from 'angular-6-social-login';
import {Router} from '@angular/router';
import {TwilioService} from '../twilio.service'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private authService:AuthService,private twilioService:TwilioService) { }

  signIn(socialPlateform:string){
    let socialPlateformProvider;
    if(socialPlateform=="google"){
      socialPlateformProvider=GoogleLoginProvider.PROVIDER_ID;
    }
    this.authService.signIn(socialPlateformProvider).then(
      (userData)=>{
         console.log(socialPlateform+"signed in: "+JSON.stringify(userData));
         localStorage.setItem("Identity",userData.email);
         localStorage.setItem("name",userData.name);
         this.twilioService.joinChannel("CHe61fe890173e425686961478b9b2f207");
        //  console.log("Name",userData.name);
              this.router.navigate(['/chat']);
      }
    );
  }
  ngOnInit() {
  //  localStorage.setItem("Identity","default");
  }


}
