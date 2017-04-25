import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from "@angular/router";

// Components
import { EventsAppComponent } from './events-app.component';

import {
	EventsListComponent,
	EventThumbnailComponent,
	EventDetailsComponent,
	CreateEventComponent
} from './events/index';

import { NavbarComponent } from './nav/index';

// Errors
import { Error404Component } from "./errors/index";

// Services
import { EventService } from './events/shared/event.service';
import { ToastrService } from "./common/toastr.service";
import { EventsListResolver } from "./events/events-list-resolver.service";

// Router
import { appRoutes } from "./routers";
import { EventRouteActivator } from "./events/event-details/event-route-activator.service";


@NgModule({
	imports: [
		BrowserModule,
		RouterModule.forRoot(appRoutes)
	],
	declarations: [
		EventsAppComponent,
		EventsListComponent,
		EventThumbnailComponent,
		NavbarComponent,
		EventDetailsComponent,
		CreateEventComponent,
		Error404Component
	],
	providers: [
		EventService,
		ToastrService,
		EventRouteActivator,
		EventsListResolver,
		{
			provide: 'canDeactivateCreateEvent',
			useValue: checkDirtyState
		}
	],
	bootstrap: [EventsAppComponent]
})
export class AppModule { }

function checkDirtyState(component: CreateEventComponent) {
	if (component.isDirty)
		return window.confirm('You have not saved this event, do you really want to cancel?');

	return true;
}