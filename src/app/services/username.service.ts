import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UsernameService {

  constructor(private http: HttpClient) { }

    getUsernames() {
      return this.http.get<any>('assets/Usernames.json')
                  .toPromise()
                  .then(res => <any[]>res.data)
                  .then(data => { return data; });
    }

}
