import { Injectable } from '@angular/core'
import * as io from 'socket.io-client'

@Injectable({
  providedIn: 'root'
})
export class SocketioService {
  socket: any

  constructor() {}

  setupSocketConnection(): void {
    this.socket = io('http://localhost:5000')
  }
}
