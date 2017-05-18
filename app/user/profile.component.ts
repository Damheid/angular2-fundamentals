import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from './auth.service';

import { Router } from '@angular/router';
import { Toastr, TOASTR_TOKEN } from '../common/toastr.service';

@Component({
	selector: 'selector',
	styles: [`
	em {float:right; color:#E05C65; padding-left: 10px;}
	.error input {background-color:#E3C3C5;}
	.error ::-webkit-input-placeholder {color: #999;}
	.error ::-moz-placeholder {color: #999;}
	.error :moz-placeholder {color: #999;}
	.error :ms-input-placeholder {color: #999;}
	`],
	templateUrl: 'app/user/profile.component.html',
})
export class ProfileComponent implements OnInit {
	public profileForm: FormGroup;
	public firstName: FormControl;
	public lastName: FormControl;

	constructor(private authService: AuthService,
		// tslint:disable-next-line:align
		private router: Router,
		@Inject(TOASTR_TOKEN) private toastr: Toastr) { }

	// tslint:disable-next-line:member-access
	ngOnInit() {
		this.firstName = new FormControl(this.authService.currentUser.firstName,
			[Validators.required, Validators.pattern('[a-zA-Z].*')]);
		this.lastName = new FormControl(this.authService.currentUser.lastName, Validators.required);
		this.profileForm = new FormGroup({
			firstName: this.firstName,
			lastName: this.lastName,
		});
	}

	public saveProfile(formValues) {
		if (this.profileForm.valid) {
			this.authService.updateCurrentUser(formValues.firstName, formValues.lastName)
				.subscribe(() => {
					this.toastr.success('Profile saved');
				});
		}
	}

	public cancel() {
		this.router.navigate(['events']);
	}

	public validateFirstName() {
		return this.firstName.valid || this.firstName.untouched;
	}

	public validateLastName() {
		return this.lastName.valid || this.lastName.untouched;
	}

	public logout() {
		this.authService.logout()
			.subscribe(() => {
				this.router.navigate(['/user/login']);
			});
	}
}
