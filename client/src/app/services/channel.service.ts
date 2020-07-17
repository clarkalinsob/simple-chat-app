import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  api: string = 'http://localhost:5000/api/v1/channels/5f1003dcdbe57008904a09cf'

  constructor(private http: HttpClient) {}

  getChannelConvo(): Observable<any> {
    return this.http.get<any[]>(this.api)
  }
}
