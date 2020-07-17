import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class ChannelService {
  apiUrl: string = 'http://localhost:4000/api/v1'

  constructor(private http: HttpClient) {}

  getChannelConvo(): Observable<any> {
    return this.http.get<any[]>(`${this.apiUrl}/channels/basic`)
  }
}
