
import { ISession } from '../index';
import { SessionListComponent } from './session-list.component';

describe('SessionListComponent', () => {
	let component: SessionListComponent;
	const mockAuthService: any = {};
	const mockVoterService: any = {};

	beforeEach(() => {
		component = new SessionListComponent(mockAuthService, mockVoterService);
	});

	describe('ngOnChanges', () => {

		it('should filter the sessions correctly', () => {
			component.sessions = [
				{ name: 'session 1', level: 'intermediate' },
				{ name: 'session 2', level: 'intermediate' },
				{ name: 'session 3', level: 'beginner' }] as ISession[];
			component.filterBy = 'intermediate';
			component.sortBy = 'name';
			component.eventId = 3;

			component.ngOnChanges();

			expect(component.visibleSessions.length).toBe(2);
		});

		it('should sort the sessions correctly', () => {
			component.sessions = [
				{ name: 'session 1', level: 'intermediate' },
				{ name: 'session 3', level: 'intermediate' },
				{ name: 'session 2', level: 'beginner' }] as ISession[];
			component.filterBy = 'all';
			component.sortBy = 'name';
			component.eventId = 3;

			component.ngOnChanges();

			expect(component.visibleSessions[2].name).toBe('session 3');
		});
	});
});
