import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

const Parse = require('parse');

@Injectable()
export class ParseService {

  newsQuery: any;
  private subscription: any;

  constructor() {
    Parse.initialize("family11");
    Parse.serverURL = 'http://103.224.247.55:1001/parse';
  }

  initialize() {
    this.subscription = this.newsSubscription();
  }

  public newsSubscription() {
    if (!this.newsQuery) {
      this.newsQuery = new Parse.Query('AllVictims');
    }
    // this.newsQuery.equalTo('title', 'broadcast');
    return this.newsQuery.subscribe();
  }

  startSubscription() {

    return Observable.create(observer => {

      this.subscription.on("open", (message) => {
        console.log("Victim activity tracking mode activated");
        // TODO: Add to victims arrary
        observer.next(message);
      });

      this.subscription.on("create", (message) => {
        console.log("New victim created");
        // TODO: Add to victims arrary
        observer.next(message);
      });

      this.subscription.on('update', (data) => {
        console.log("Victim's data updated", data);
        // TODO: Victims data updated
        observer.next(data);
      });

      this.subscription.on('enter', (data) => {
        console.log("Victim's data updated", data);
        observer.next(data);
      });

      this.subscription.on("leave", (obj) => {
        console.log("Victim deleted");
        // TODO: Remove from victims arrary
        observer.next(obj);
      });

    });
  }


  // startUpdate(): Observable<string> {
  //   return new Observable(observer => {
  //     return this.subscription.on('enter', (data) => {
  //       console.log(" Location change event called ", data);
  //       // let message = new Message()
  //       // // TODO: it's not possible to get other user's info
  //       // let user = news.get('user')
  //       // let from = news.get('from')
  //       // message.body = news.get('message')
  //       // message.user = from != null ? from : 'Anonymous'
  //       // message.me = user != null ? (user.id === this.parseSvc.currentUser.id) : false
  //       // // console.log(message)
  //       observer.next(data);
  //     })
  //   })
  // }

  stopUpdate() {
    this.subscription.unsubscribe()
  }

}
