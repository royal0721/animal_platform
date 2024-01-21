import { Injectable } from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Injectable({
  providedIn: 'root',
})
export class WebsocketRealtimeService {
  webSocketEndPoint: string = 'http://localhost:8080/ws';
  type: string = '/type/messages';
  stompClient: any;
  message_result = [];
  time_result = [];

  constructor() {}

  public connect() {
    let ws = new SockJS(this.webSocketEndPoint);
    this.stompClient = Stomp.over(ws);
    const _this = this;
    _this.stompClient.connect(
      {},
      function () {
        _this.stompClient.subscribe(_this.type, function (sdkEvent) {
          _this.onMessageReceived(sdkEvent);
          // console.log(sdkEvent);
        });
      },
      this.errorCallBack,
    );
  }

  public disconnect() {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
    console.log('websocket is disconnected');
  }

  public errorCallBack(error) {
    console.log('errorCallBack -> ' + error);
    setTimeout(() => {
      this.connect();
    }, 5000);
  }

  public send(message) {
    console.log('send message via web socket');
    this.stompClient.send('/app/inform', {}, JSON.stringify(message));
  }

  public onMessageReceived(message) {
    // this.message_result.push(JSON.parse(message.body));

    const date = new Date(JSON.parse(message.body)[1]);
    let hour = date.getHours() + 8;
    let hour_text;
    let min = date.getMinutes();
    let min_text;

    if (hour > 24) {
      hour = hour - 24;
    }

    if (hour < 10) {
      hour_text = '0' + hour;
    } else {
      hour_text = hour;
    }
    if (min < 10) {
      min_text = '0' + min;
    } else {
      min_text = min;
    }

    console.log('Message Recieved from Server :: ', JSON.parse(message.body));
    if (this.message_result.length < 2) {
      this.message_result.push(JSON.parse(message.body)[0]);
      this.time_result.push(hour_text + ':' + min_text);
    } else {
      this.message_result.shift();
      this.time_result.shift();
      this.message_result.push(JSON.parse(message.body)[0]);
      this.time_result.push(hour_text + ':' + min_text);
    }

    (<HTMLSelectElement>document.getElementById('first_one_animal')).innerHTML =
      this.message_result[0];
    (<HTMLSelectElement>document.getElementById('first_one_time')).innerHTML =
      this.time_result[0];
    if (this.message_result.length != 1) {
      (<HTMLSelectElement>(
        document.getElementById('second_one_animal')
      )).innerHTML = this.message_result[1];
      (<HTMLSelectElement>(
        document.getElementById('second_one_time')
      )).innerHTML = this.time_result[1];
    }
  }
  public getList() {
    return this.message_result;
  }
}
