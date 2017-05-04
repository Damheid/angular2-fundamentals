import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

// Components
import { EventsAppComponent } from './events-app.component';

import {
	EventsListComponent,
	EventThumbnailComponent,
	EventDetailsComponent,
	CreateEventComponent,
	CreateSessionComponent,
	SessionListComponent,
	DurationPipe
} from './events/index';

import { NavbarComponent } from './nav/index';

// Errors
import { Error404Component } from "./errors/index";

// Services
import { EventService } from './events/shared/event.service';
import { TOASTR_TOKEN, Toastr } from "./common/toastr.service";
import { EventsListResolver } from "./events/events-list-resolver.service";
import { AuthService } from "./user/auth.service";

// Router
import { appRoutes } from "./routers";
import { EventRouteActivator } from "./events/event-details/event-route-activator.service";
import { CollapsibleWellComponent } from "./common/collapsible-well.component";

declare let toastr: Toastr;

@NgModule({
	imports: [
		BrowserModule,
		FormsModule,
		ReactiveFormsModule,
		RouterModule.forRoot(appRoutes)
	],
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
		DurationPipe
	],
	providers: [
		EventService,
		{ provide: TOASTR_TOKEN, useValue: toastr },
		EventRouteActivator,
		EventsListResolver,
		{
			provide: 'canDeactivateCreateEvent',
			useValue: checkDirtyState
		},
		AuthService
	],
	bootstrap: [EventsAppComponent]
})
export class AppModule { }

function checkDirtyState(component: CreateEventComponent) {
	if (component.isDirty)
		return window.confirm('You have not saved this event, do you really want to cancel?');

	return true;
}