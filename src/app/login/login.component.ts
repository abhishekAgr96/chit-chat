import { Component, OnInit } from '@angular/core';
import {GoogleLoginProvider,AuthService} from 'angular-6-social-login';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private router:Router,private authService:AuthService) { }

  signIn(socialPlateform:string){
    let socialPlateformProvider;
    if(socialPlateform=="google"){
      socialPlateformProvider=GoogleLoginProvider.PROVIDER_ID;
    }
    this.authService.signIn(socialPlateformProvider).then(
      (userData)=>{
         console.log(socialPlateform+"signed in: "+JSON.stringify(userData));
         localStorage.setItem("Identity",userData.email);
              this.router.navigate(['chat']);
      }
    );
  }
  ngOnInit() {
  }

}
