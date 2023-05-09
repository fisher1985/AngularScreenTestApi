import {ApiStatus} from 'src/app/login/ApiStatus'; 
export class ApiResult {
    public data:string='';
    public error:string='';
    public status:ApiStatus=ApiStatus.No;
  }