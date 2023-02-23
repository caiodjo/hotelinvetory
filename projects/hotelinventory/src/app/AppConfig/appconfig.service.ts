import { InjectionToken } from "@angular/core";
import { AppConfig } from "./appconfig.interface";
//import {enviroment} from 'path'; 

export const APP_SERVICE_CONFIG = new InjectionToken<AppConfig>('app.config');

export const APP_CONFIG: AppConfig = {
    apiEndpoint : 'localhost:3000/api'
}