import { Injectable } from '@angular/core';


import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate{
  
  
  constructor(private router:Router) { }

  canActivate() {   
    console.log(localStorage.getItem("Identity")!=null)
    if(localStorage.getItem("Identity")!=null){
  //    console.log("t",this.identity);
      return true;}
    else{
      console.log("false")
     this.router.navigate(['/']) 
    return false;
  }}
  
  
}
