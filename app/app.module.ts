import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

// Components
import { EventsAppComponent } from './events-app.component';

import {
	CreateEventComponent,
	CreateSessionComponent,
	DurationPipe,
	EventDetailsComponent,
	EventResolver,
	EventsListComponent,
	EventThumbnailComponent,
	LocationValidator,
	SessionListComponent,
	UpvoteComponent,
	VoterService,
} from './events/index';

import { NavbarComponent } from './nav/index';

// Errors
import { Error404Component } from './errors/index';

// Services
import {
	CollapsibleWellComponent,
	JQ_TOKEN,
	ModalTriggerDirective,
	SimpleModalComponent,
	Toastr,
	TOASTR_TOKEN,
} from './common/index';
import { EventsListResolver } from './events/events-list-resolver.service';
import { EventService } from './events/shared/event.service';
import { AuthService } from './user/auth.service';

// Router
import { appRoutes } from './routers';

declare let toastr: Toastr;
// tslint:disable-next-line:ban-types
declare let jQuery: Object;

@NgModule({
	bootstrap: [EventsAppComponent],
	declarations: [
		EventsAppComponent,
		EventsListComponent,
		EventThumbnailComponent,
		NavbarComponent,
		EventDetailsComponent,
		CreateEventComponent,
		Error404Component,
		CreateSessionComponent,
		SessionListComponent,
		CollapsibleWellComponent,
		DurationPipe,
		SimpleModalComponent,
		ModalTriggerDirective,
		UpvoteComponent,
		LocationValidator,
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		ReactiveFormsModule,
		RouterModule.forRoot(appRoutes),
	],
	providers: [
		EventService,
		{ provide: TOASTR_TOKEN, useValue: toastr },
		{ provide: JQ_TOKEN, useValue: jQuery },
		EventResolver,
		EventsListResolver,
		{
			provide: 'canDeactivateCreateEvent',
			useValue: checkDirtyState,
		},
		AuthService,
		VoterService,
	],
})
export class AppModule { }

function checkDirtyState(component: CreateEventComponent) {
	if (component.isDirty) {
		return window.confirm('You have not saved this event, do you really want to cancel?');
	}

	return true;
}
