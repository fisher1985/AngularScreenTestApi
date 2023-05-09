import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { AnonymousSubject } from 'rxjs/internal/Subject';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ApiResult } from './login/ApiResult';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { SocketMessage } from './socket-message';
import { StorageService } from 'src/app/storage.service';

@Injectable({
  providedIn: 'root'
})
export class AppServiceService {
  constructor(private http: HttpClient,private storageService: StorageService)  { 

  }

  login(username: string, password: string): Observable<any> {
    let obj={
      "email":username,
      "password":password
    };
    return this.http.post(
      postUrl,
      obj,
      httpOptions
    ).pipe(
      
    );
     
  }
  
  getGreeting(){
    this.loadToken();
    return this.http.get<ApiResult>(greetingUrl,httpOptions);
  }
  private socket$!: WebSocketSubject<any>;
  getWebSocket(token:string){
    this.loadToken();
    if (!this.socket$ || this.socket$.closed) {
      this.socket$ = webSocket(webSocketUrl+token);

     return  this.socket$.subscribe((data: SocketMessage) => {
         console.log(data);
         return data;
      });
    }else{
      return null;
    }
  }
  loadToken(){
    auth_token=this.storageService.getToken();
  }
}

var auth_token :string="";
const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json',
  Authorization: `Bearer ${auth_token}`})
};
const postUrl='http://66.70.229.82:8181/Authorize';
const webSocketUrl:string = "ws://66.70.229.82:8181/?";
const greetingUrl:string="http://66.70.229.82:8181/GetGreeting";
