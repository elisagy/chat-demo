import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
	selector: 'app-chat-content',
	templateUrl: './chat-content.component.html',
	styleUrls: ['./chat-content.component.scss']
})
export class ChatContentComponent implements OnInit {
	@Input() currentChatId: number;
	@Input() lastcurrentChatMessage: string;
	@Output() lastcurrentChatMessageChange: EventEmitter<string> = new EventEmitter<string>();
	private chats: any = {};
	private currentMessage: string;

	constructor() { }

	ngOnInit() {
		
	}

	onSubmit() {
		if (!this.currentMessage) {
			return;
		}
		
		this.chats[this.currentChatId] = this.chats[this.currentChatId] || [];
		this.chats[this.currentChatId].unshift({ mine: true, message: this.currentMessage });
		setTimeout(message => this.chats[this.currentChatId].unshift({ mine: false, message }), 1000, this.currentMessage);
		this.lastcurrentChatMessageChange.emit(this.currentMessage);
		this.currentMessage = '';
	}
}
