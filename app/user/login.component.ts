import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';

@Component({
	styles: [`
		em { float:right; color: #E05C65; padding-left:10px; }`,
	],
	templateUrl: 'app/user/login.component.html',
})
export class LoginComponent implements OnInit {
	loginInvalid = false;

	constructor(private authService: AuthService, private router: Router) { }

	// tslint:disable-next-line:no-empty
	ngOnInit() { }

	login(formValues) {
		this.authService.loginUser(formValues.userName, formValues.password)
			.subscribe((resp) => {
				if (!resp) {
					this.loginInvalid = true;
				} else {
					this.router.navigate(['events']);
				}
			});
	}

	cancel() {
		this.router.navigate(['events']);
	}
}
