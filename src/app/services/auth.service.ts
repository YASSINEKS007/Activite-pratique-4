import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { firstValueFrom } from "rxjs";
import { AppStateService } from "./app-state.service";
import jwt_decode, {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient,
              private appStateService: AppStateService,) {
  }

  async login(username: string, password: string) {
    try {
      let user: any = await firstValueFrom(this.http.get(`http://localhost:8089/${username}`));
      if (password === btoa(user.password)) {
        let decodeJwt: any = jwtDecode(user.token);
        this.appStateService.setAuthState({
          isAuthenticated: true,
          username: decodeJwt.sub,
          roles: decodeJwt.roles,
          token: user.token
        });
        return Promise.resolve(true);
      } else {
        return Promise.reject("Bad Credentials");
      }
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
