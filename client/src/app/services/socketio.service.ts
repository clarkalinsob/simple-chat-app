import { Injectable } from '@angular/core'
import * as io from 'socket.io-client'
import { HttpClient } from '@angular/common/http'
import { Observable, Subject } from 'rxjs'
import { ChannelService } from './channel.service'

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket: any
  api: string = 'http://localhost:5000/api/v1/channels/5f1003dcdbe57008904a09cf'
  obj: any
  realtimeData: Subject<any> = new Subject<any>()

  constructor(private http: HttpClient, private channelService: ChannelService) {}

  setupSocketConnection(): void {
    this.socket = io('ws://localhost:5000')

    this.socket.on('new-message', msg => this.realtimeData.next(msg))
  }

  getRealtimeMessage(): Observable<any> {
    return this.realtimeData.asObservable()
  }

  sendMessage(msgObject: any): Observable<any> {
    this.socket.emit('new-message', msgObject)
    return this.http.patch<any>(this.api, { msgObject })
  }
}
