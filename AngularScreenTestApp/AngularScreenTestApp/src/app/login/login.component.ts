import { Component, OnInit } from '@angular/core';
import {AppServiceService} from 'src/app/app-service.service';
//import { AuthService } from '../_services/auth.service';
import { StorageService } from 'src/app/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private appService:AppServiceService,private storageService: StorageService ){}
  ngOnInit(): void {
    
  }
  onSubmit(): void {
    this.appService.login(this.form.username,this.form.password).subscribe({
      next: data =>{
        console.log(data);
        this.storageService.saveToken(data.token);
      }
    });
    const { username, password } = this.form;

  }

}
