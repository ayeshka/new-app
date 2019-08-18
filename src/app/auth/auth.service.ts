import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Auth } from './auth.model';
import { BehaviorSubject } from 'rxjs';
import {  tap, map } from 'rxjs/operators';
import { Http , Headers, RequestOptions} from '@angular/http';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { LoadingController } from '@ionic/angular';

interface AuthData {
   id : number;
  user: string;
   password: string;
  updated_at: string;
  created_at: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

 private _userIsAuthenticatede = true;
 token:any;

 get userIsAuthenticated() {
   return this._userIsAuthenticatede;
 }

  constructor(private http: HttpClient, private https: Http, private storage: NativeStorage) { }

  // private _auth = new BehaviorSubject<Auth[]>([]);

  // get auth() {
  //   return this._auth.asObservable();
  // }

  login(email: String, password: String) {

    let headers = new Headers();


    headers.append('content-type', 'application/json');
 // tslint:disable-next-line: object-literal-shorthand
    let options = new RequestOptions({ headers:headers});
    return this.https.post('http://localhost:8000/api/login',JSON.stringify({email: email, password: password}), options
     
    ).pipe(
      tap(token => {
        this.storage.setItem('token', token)
        .then(
          () => {
            console.log('Token Stored');
          },
          error => console.error('Error storing item', error)
        );
        this.token = token;
        this._userIsAuthenticatede  = true;
        return token;
      }),
    );
   }


   logins() {
     this._userIsAuthenticatede = true;
   }

   logout() {
     this._userIsAuthenticatede = false;
   }
}
