import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  apiUrl: string = 'https://chatapp.clarkalinsob.com/server/api/v1'

  constructor(private http: HttpClient) {}

  getChannelConvo(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/channels/5f1003dcdbe57008904a09cf`)
  }
}
