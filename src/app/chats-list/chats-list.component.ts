import { Component, OnInit, Injectable, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
	selector: 'app-chats-list',
	templateUrl: './chats-list.component.html',
	styleUrls: ['./chats-list.component.scss']
})
@Injectable({
  providedIn: 'root'
})
export class ChatsListComponent implements OnInit {
	@Input() currentChatId: number;
	@Output() currentChatIdChange: EventEmitter<number> = new EventEmitter<number>();
	private chats: any[];

	constructor(private httpClient: HttpClient) { }

	async ngOnInit() {
		this.chats = await <any>this.httpClient.get(`https://jsonplaceholder.typicode.com/users`).toPromise();
		this.onChatSelected(this.chats[0]);

	}

	onChatSelected(chat) {
		if (!chat) {
			return;
		}
		
		this.currentChatId = chat.id;
		this.currentChatIdChange.emit(chat.id);
	}

	@Input()
	set lastcurrentChatMessage(val: string) {
		var chatItem = (this.chats.find(chat => chat.id === this.currentChatId) || {});
		chatItem.lastMessage = val;
		this.chats.splice(this.chats.indexOf(chatItem), 1);
		this.chats.unshift(chatItem);
	}
}
