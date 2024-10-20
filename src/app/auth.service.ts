import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Usuario } from './login/usuario';
import { Observable } from 'rxjs';

import { environment } from '../environments/environment';

import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  apiUrl: string = environment.apiUrlBase + "/api/usuarios";
  tokenUrl: string = environment.apiUrlBase + environment.obterTokenUrl;
  clientId: string = environment.clientId;
  clientSecret: string = environment.clientSecret;
  jwtHelper: JwtHelperService = new JwtHelperService();

  constructor(
    private http: HttpClient
  ) { }

  obterToken(){
    const tokenString = localStorage.getItem('access_token');

    if(tokenString){
      const token = JSON.parse(tokenString).access_token;
      return token;
    }

    return null;
  }

  verificaLogin(): boolean {
    const token = this.obterToken();

    if(token){
      const expirado = this.jwtHelper.isTokenExpired(token);
      return !expirado;
    }
    
    return false;
  }

  encerrarSessao(){
    localStorage.removeItem('access_token');
  }

  getUsuarioLogado(){
    const token = this.obterToken();
    
    if(token){
      const usuario = this.jwtHelper.decodeToken(token).user_name
      return usuario;
    }

    return null;
  }

  salvar(usuario: Usuario): Observable<any>{
    return this.http.post<any>(this.apiUrl, usuario);
  }

  tentarLogar( email: string, password: string ) : Observable<any> {
    const params = new HttpParams()
                        .set('username', email)
                        .set('password', password)
                        .set('grant_type', 'password');

    const headers = {
      'Authorization': 'Basic ' + btoa(`${this.clientId}:${this.clientSecret}`),
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    
    return this.http.post( this.tokenUrl, params.toString(), { headers });
  }
}
