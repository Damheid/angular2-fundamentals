import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IEvent } from './index';

@Component({
	selector: 'event-thumbnail',
	styles: [`
		.thumbnail { min-height: 210px; }
		.pad-left { margin-left: 10px; }
		.well div { color: #bbb; }
	`],
	template: `
	<div [routerLink]="['/events', event.id]" class="well hoverwell thumbnail">
		<h2>{{event?.name | uppercase}}</h2>
		<div>Date: {{event?.date | date:'shortDate'}}</div>
		<div [ngStyle]="getStartTimeStyle()" [ngSwitch]="event?.time">
			Time: {{event?.time}}
			<span *ngSwitchCase="'8:00 am'">(Early Start)</span>
			<span *ngSwitchCase="'10:00 am'">(Late Start)</span>
			<span *ngSwitchDefault>(Normal Start)</span>
		</div>
		<div>Price: {{event?.price | currency: 'USD':true}}</div>
		<div *ngIf="event?.location">
			<span>Location: {{event?.location?.address}}</span>
			<span class="pad-left">{{event?.location?.city}}, {{event?.location?.country}}</span>
		</div>
		<div *ngIf="event?.onlineUrl">
			Online URL: {{event?.onlineUrl}}
		</div>
	</div>
	`,
})
export class EventThumbnailComponent implements OnInit {
	@Input() event: IEvent;

	// tslint:disable-next-line:no-empty
	constructor() { }

	// tslint:disable-next-line:no-empty
	ngOnInit() { }

	getStartTimeStyle(): any {
		if (this.event && this.event.time === '8:00 am') {
			return { 'color': '#003300', 'font-weight': 'bold' };
		}
		return {};
	}
}
