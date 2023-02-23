import { Inject, Injectable } from '@angular/core';
import { RouteConfig } from './routeConfig';
import { RouterConfigToken } from './routeConfig.service';

@Injectable({
  providedIn: 'any',
})
export class ConfigService {
  constructor(@Inject(RouterConfigToken) private configToken: RouteConfig) {
    console.log('ConfigService initialized');
    console.log(this.configToken);
  }
}
