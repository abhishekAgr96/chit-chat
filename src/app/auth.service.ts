import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from '../../node_modules/rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  serviceId:string="IS64138c65e8e24b6e808ea57de4bbc8e1";
  chennalList:any;
  identity:string=localStorage.getItem("Identity");
  httpOptions={
   headers : new HttpHeaders({ 
    'Content-Type' :'application/x-www-form-urlencoded',
    "Authorization" : "Basic QUM1OTkxNzYxNGI5MjUxYzFmMDc1NjM2MzhjMDEzODZhODowMjA2Y2M0ZmZhMDQ2YWZmZDhlYmU4NjEwODQwZjY2MQ=="
  })}

  constructor(private httpClient:HttpClient) { }
  
  setJson():Observable<any>{
   
    return this.httpClient.post("https://chat.twilio.com/v2/Services","FriendlyName=chit-chat",this.httpOptions);
  }

  
  addChannel(newChennal):Observable<any>{
    
      return this.httpClient.post("https://chat.twilio.com/v2/Services/"+this.serviceId+"/Channels","FriendlyName=chit-chat&UniqueName="+newChennal,this.httpOptions);
  }
 
  searchChannel():Observable<any>{
    
    return  this.httpClient.get("https://chat.twilio.com/v2/Services/"+this.serviceId+"/Channels",this.httpOptions).pipe(map(data=>data)); 
  }

  addRole():Observable<any>{
    
    return  this.httpClient.post("https://chat.twilio.com/v2/Services/"+this.serviceId+"/Roles","FriendlyName=Rohit&Type=deployment&Permission=createChannel",this.httpOptions); 
  }
  myChannelId:string="CH2e8a3e90caf3440aa3bfa672a0d4a483";
  
  joinChannel(channelId):Observable<any>{
    // this.myChannelId=channelId;
    return this.httpClient.post("https://chat.twilio.com/v2/Services/"+this.serviceId+"/Channels/"+channelId+"/Members","ChannelSid="+channelId+"&Identity="+this.identity+"&ServiceSid="+this.serviceId,this.httpOptions); 
  }

  sendMessage(myMessage):Observable<any>{
    return this.httpClient.post("https://chat.twilio.com/v2/Services/"+this.serviceId+"/Channels/"+this.myChannelId+"/Messages","ChannelSid="+this.myChannelId+"&ServiceSid="+this.serviceId+"&Body="+myMessage+"&From="+this.identity,this.httpOptions); 
  }

  getAllMessages():Observable<any>{
    return this.httpClient.get("https://chat.twilio.com/v2/Services/"+this.serviceId+"/Channels/"+this.myChannelId+"/Messages",this.httpOptions).pipe(map(data=>data));
  }
  // joinChannel():Observable<any>{
  //   return this.httpClient.
  // }
}
