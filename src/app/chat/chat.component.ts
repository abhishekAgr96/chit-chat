import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service'
import { TwilioService } from '../twilio.service'
import { element } from '../../../node_modules/@angular/core/src/render3/instructions';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(private twilioService: TwilioService) { }
  authenticate() {
    this.twilioService.setJson().subscribe(response => {
      console.log(response)
    },
      err => {
        console.log(err);
      });
    // console.log("authenticated"+JSON.stringify(this.twilioService.setJson()));
  }
  channel: string = "";
  foundChannel = "";
  channelArray: any = [];
  foundChannelId = "";
  arrayLen;
  status = " WellCome";
  searchChannel() {
    this.twilioService.searchChannel().subscribe(res => {
      //  console.log("RES value"+(res.channels[1].unique_name));
      // console.log("len"+res.channels.length);
      for (let index = 0; index < res.channels.length; index++) {
        console.log("array " + (res.channels[index].sid));
        this.channelArray.push(res.channels[index].unique_name)
        //    console.log("channel array: "+ this.channelArray);
        //  console.log("channel name: "+this.channel);
        this.arrayLen = this.channelArray.length;
        for (let index = 0; index < this.arrayLen; index++) {
          // console.log("in array: "+this.channelArray[index]+"    index  "+index);
          if (this.channelArray[index] == this.channel) {
            console.log("channel fopund");
            this.foundChannel = this.channel;
            this.foundChannelId = res.channels[index].sid;
            break;
          }
          else {
            //   console.log("not found");
            this.foundChannel = "channel not found";
          }
        }
      }
    },
      err => {
        console.log();
      })
  }
  channelSid: string;
  channelName: string;
  channelSidList = [];
  // type MyArrayType = Array<{id: string, name: string}>;
  // channelSidList :MyArrayType
  totalChannels = [];
  listJoinedChannel() {
    this.twilioService.searchChannel().subscribe(res => {
      console.log('res', res)
      this.totalChannels = res.channels;
      for (let index = 0; index < res.channels.length; index++) {
        this.channelSid = res.channels[index].sid;
        //    this.channelName=res.channels[index].unique_name;
        //  console.log("type",typeof(this.channelSidList));
        // this.channelSidList[index]=({id:this.channelSid,name:this.channelName});
        this.channelSidList[index] = (this.channelSid);
        //this.channelSidList.push(this.channelSid);

        //     console.log(res.channels[index]);
        // res.channels.forEach(element => {

        // 
        // //  this.identityMem=res.channels[index].identity;
        // console.log(this.identityMem);
        //    console.log( this.channelSid);
        //   
        //      console.log("chennal detail "+res);
        //   },err=>{
        //     console.log(err);
        //   })
      }
      //  console.log("total channels="+(this.channelSidList));
      this.userListInChannel(this.channelSidList);
    })
  }
  myChannelList: Array<{name : string, id: string}> = [];
  test(cSid){
    console.log("in test : ", cSid)
  }
  seperateChannelSid(res) {
    console.log(this.totalChannels, "this.totalChannerls");
    
    res.members.forEach((element1) => {
      //       console.log(element.identity);

      if (this.roleIdentity == element1.identity) {
        // console.log(element1.channel_sid)
        // this.myChannelList.push(element1);
        // console.log(this.myChannelList)
        this.totalChannels.forEach((elemet) => {
          if(element1.channel_sid == elemet.sid){
            this.myChannelList.push({name : elemet.unique_name, id : elemet.sid})
          }
        })
        this.test(element1.channel_sid)
      }

    });
  }
  userListInChannel(channelList) {
    this.myChannelList = [];
    //  console.log("total channels="+(channelList));
    channelList.forEach(element => {
      this.twilioService.getMembersOfChannel(element).subscribe(res => {
        //     console.log("jsdgh",res.members.length);
        this.seperateChannelSid(res)

        // console.log("chennel list ",this.myChannelList);
        //         for(var index=0;index<res.members.length;index++){
        //           console.log(res.members[index].identity);
        //         //  console.log(index);
        //     //      this.channelSidList.push(res.members[index].identity);
        //            if(this.roleIdentity==res.members[index].identity){
        //              console.log("match",index);
        //           //   this.myChannelList.push(res.members[index].identity);
        //            }
        //  }
        //      console.log("chennel list ",this.myChannelList);
      }, err => {
        console.log(err);

      })

    });
    // this.myChannelList.forEach(element=>{
    // //   console.log("individual channel",element);
    // })
    // this.getChannelName(this.myChannelList);
  }
  myChannelName: string = "";
  getChannelName(myChannelId) {
    //   console.log("getChannelName called",myChannelId);

    //     // this.myChannelList.forEach(element=>{
    //     //   console.log("acv",element);
    this.twilioService.getChannelDetail(myChannelId).subscribe(res => {
      console.log("channel detail", res);
      this.myChannelName = res.unique_name;
    }, err => { })
    //     // });
  }
  newChannel: string;
  addChannel() {
    console.log("new Channel NAme: " + this.newChannel);
    this.twilioService.addChannel(this.newChannel).subscribe(res => {
      this.status = "Channel Created";
      console.log("chennal created " + JSON.stringify(res.sid));
    },
      err => {
        console.log(err);
      });
    //  console.log("authenticated"+JSON.stringify(this.twilioService.setJson()));
  }
  joinChannel() {
    console.log(this.foundChannelId);
    this.twilioService.joinChannel(this.foundChannelId).subscribe(res => {
      console.log(res);
    }, err => {
      console.log(err);
    })
  }
  addRole() {
    this.twilioService.addRole().subscribe(res => {
      console.log(res);
    },
      err => {
        console.log(err);
      })
  }
  myMessage: string;
  myChannel: string;
  sendMessage() {
    this.twilioService.sendMessage(this.myMessage).subscribe(res => {
      console.log("msg sent");
      console.log(res.from);
    },
      err => {
        console.log(err);
      })
  }
  allMessages = [];
  roleIdentity = this.twilioService.identity;
  totalMessages: number;
  userName: string = "";
  
  getAllMessages(channelId) {
    this.userName = localStorage.getItem("name");
    console.log("name", this.userName);
    this.getChannelName(channelId);
    this.allMessages = [];
    console.log("working");
    this.twilioService.getAllMessages(channelId).subscribe(res => {
      // this.allMessages=res.messages;  
      //   console.log(res.messages[1].body);
      this.totalMessages = res.messages.length;
      //  console.log("total   "+this.totalMessages);
      for (let index = 0; index < this.totalMessages; index++) {

        //    console.log("msg ",index+" is    "+res.messages[index].body);
        if (res.messages[index].from == this.roleIdentity)
          this.allMessages[index] = { msg: res.messages[index].body, sender: true, senderId: res.messages[index].from }
        else
          this.allMessages[index] = { msg: res.messages[index].body, sender: false, senderId: res.messages[index].from }
      }
      //   // this.allMessages=res.messages.body;
    },
      err => {
        console.log(err);
      })
  }
  ngOnInit() {
    this.listJoinedChannel();
    this.getAllMessages("");

  }

}
