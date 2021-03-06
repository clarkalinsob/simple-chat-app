import { Injectable } from '@angular/core'
import * as io from 'socket.io-client'
import { HttpClient } from '@angular/common/http'
import { Observable, Subject } from 'rxjs'
import { ChannelService } from './channel.service'
import { AuthService } from '../auth/auth.service'

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket: any
  apiUrl: string = 'http://localhost:4000/api/v1'
  obj: any
  realtimeData: Subject<any> = new Subject<any>()

  constructor(private http: HttpClient, private channelService: ChannelService, private authService: AuthService) {}

  setupSocketConnection(): void {
    this.socket = io('ws://localhost:4000')

    this.socket.on('new-message', msg => this.realtimeData.next(msg))
  }

  getRealtimeMessage(): Observable<any> {
    return this.realtimeData.asObservable()
  }

  sendMessage(msgObject: any): Observable<any> {
    this.socket.emit('new-message', msgObject)
    return this.http.patch<any>(
      `${this.apiUrl}/channels/basic`,
      { msgObject },
      {
        headers: {
          Authorization: `Bearer ${JSON.parse(this.authService.getToken())}`
        }
      }
    )
  }
}
