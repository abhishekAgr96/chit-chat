import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {SocialLoginModule,
        AuthServiceConfig,
        GoogleLoginProvider} from 'angular-6-social-login';
import { AppComponent } from './app.component';
import {RouterModule,Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ChatComponent } from './chat/chat.component';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms'

export function getAuthServiceConfig(){
  let config=new AuthServiceConfig([{
    id:GoogleLoginProvider.PROVIDER_ID,
    provider:new GoogleLoginProvider("874408757169-et49gdli7mf569b7lejjictshiurgjed.apps.googleusercontent.com")
  }]);
  return config;
}

const routes : Routes=[
  {
    path:'',
    component:LoginComponent  
  },
  {
    path:'chat',
    component:ChatComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ChatComponent
  ],
  imports: [
    BrowserModule,
    SocialLoginModule,
    HttpModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    {
      provide:AuthServiceConfig,
      useFactory:getAuthServiceConfig
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
