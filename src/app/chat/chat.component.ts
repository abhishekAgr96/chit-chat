import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service'


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  
  constructor(private authService:AuthService) { }
  authenticate(){
        this.authService.setJson().subscribe(response=>{
          console.log(response)
        },
        err=>{
          console.log(err);
        });
        // console.log("authenticated"+JSON.stringify(this.authService.setJson()));
  }
  channel:string="";
  foundChannel="";
  channelArray:any=[];
  foundChannelId="";
  arrayLen;
  searchChannel(){
    this.authService.searchChannel().subscribe(res=>{
      console.log("RES value"+(res.channels[1].unique_name));
      console.log("len"+res.channels.length);
      for(let index=0;index<res.channels.length;index++){
          console.log("array "+(res.channels[index].sid));     
           this.channelArray.push(res.channels[index].unique_name)
           console.log("channel array: "+ this.channelArray);
      console.log("channel name: "+this.channel);
       this.arrayLen=this.channelArray.length;
      for(let index=0;index<this.arrayLen;index++){
       // console.log("in array: "+this.channelArray[index]+"    index  "+index);
        if(this.channelArray[index]==this.channel)
        {
          console.log("channel fopund");
          this.foundChannel=this.channel;
          this.foundChannelId=res.channels[index].sid;
          break;
        }
        else{
        console.log("not found");
        this.foundChannel="channel not found";
        }
      }
    }
    },
  err=>{
    console.log();
  })
  }

  newChannel:string;
  addChannel(){
    console.log("new Channel NAme: "+this.newChannel);
    this.authService.addChannel(this.newChannel).subscribe(res=>{
      console.log("chennal created "+JSON.stringify(res.sid));
    }, 
  err=>{
    console.log(err);
  });
  //  console.log("authenticated"+JSON.stringify(this.authService.setJson()));
  }
  joinChannel(){
    console.log(this.foundChannelId);
    this.authService.joinChannel(this.foundChannelId).subscribe(res=>{
      console.log(res);
    },err=>{
      console.log(err);
    })
  }
  addRole(){
    this.authService.addRole().subscribe(res=>{
      console.log(res);
    },
  err=>{
      console.log(err);
  })
  }
  myMessage:string;
  sendMessage(){
    this.authService.sendMessage(this.myMessage).subscribe(res=>{
      console.log(res);
    },
  err=>{
    console.log(err);
  })
  }
  allMessages={};
  totalMessages:number;
  getAllMessages(){
    this.authService.getAllMessages().subscribe(res=>{
      this.allMessages=res.messages;  
    //   console.log(res.messages[1].body);
    //  this.totalMessages= res.messages.length;
    //  console.log("total   "+this.totalMessages);
    //  for(let index=1;index<this.totalMessages;index++){
       
    //    console.log("msg ",index+" is    "+res.messages[index].body);
    //    this.allMessages+=res.messages[index].body+"\n";
    //  }
    //   // this.allMessages=res.messages.body;
    },
  err=>{
    console.log(err);
  })
  }
  ngOnInit() {
    this.getAllMessages();
  }

}
