import { Routes } from '@angular/router';

import {
	CreateEventComponent,
	CreateSessionComponent,
	EventDetailsComponent,
	EventResolver,
	EventsListComponent,
    EventsListResolver,
} from './events/index';

import { Error404Component } from './errors/index';

export const appRoutes: Routes = [
	{ path: '', redirectTo: '/events', pathMatch: 'full' },
	{ path: 'events', component: EventsListComponent, resolve: { events: EventsListResolver } },
	{ path: 'events/new', component: CreateEventComponent, canDeactivate: ['canDeactivateCreateEvent'] },
	{ path: 'events/:id', component: EventDetailsComponent, resolve: { event: EventResolver} },
	{ path: 'events/session/new', component: CreateSessionComponent },
	{ path: '404', component: Error404Component },
	{ path: 'user', loadChildren: 'app/user/user.module#UserModule' },
];
