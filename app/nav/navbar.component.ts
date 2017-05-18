import { Component, OnInit } from '@angular/core';
import { EventService, ISession } from '../events/index';
import { AuthService } from '../user/auth.service';

@Component({
	selector: 'nav-bar',
	styles: [`
		.nav.navbar-nav { font-size: 15px; }
		#searchForm { margin-right: 100px; }
		@media (max-width: 1200px) { #searchForm { display:none; } }
		li > a.active { color: #F97924; }
	`],
	templateUrl: 'app/nav/navbar.component.html',
})
export class NavbarComponent implements OnInit {
	searchTerm: string = '';
	foundSessions: ISession[];

	constructor(private authService: AuthService,
		           private eventService: EventService) { }

	// tslint:disable-next-line:no-empty
	ngOnInit() { }

	searchSessions(searchTerm) {
		this.eventService.searchSessions(searchTerm)
			.subscribe((sessions) => {
				this.foundSessions = sessions;
			});
	}
}
