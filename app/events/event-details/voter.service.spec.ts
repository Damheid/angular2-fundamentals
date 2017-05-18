import { Observable } from 'rxjs/Rx';
import { ISession } from '../index';
import { VoterService } from './voter.service';

describe('VoterService', () => {
	let voterService: VoterService;
	let mockHttp;

	beforeEach(() => {
		mockHttp = jasmine.createSpyObj('mockHttp', ['delete', 'post']);
		voterService = new VoterService(mockHttp);
	});

	describe('deleteVoter', () => {
		it('should remove the voter from te list of voters', () => {
			const session = { id: 6, voters: ['Joe', 'John'] };
			mockHttp.delete.and.returnValue(Observable.of(false));

			voterService.deleteVoter(3, session as ISession, 'Joe');

			expect(session.voters.length).toBe(1);
			expect(session.voters[0]).toBe('John');
		});

		it('should call http.delete with the right URL', () => {
			const session = { id: 6, voters: ['Joe', 'John'] };
			mockHttp.delete.and.returnValue(Observable.of(false));

			voterService.deleteVoter(3, session as ISession, 'Joe');

			expect(mockHttp.delete).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/Joe');
		});
	});

	describe('addVoter', () => {
		it('should call http.post with the right URL', () => {
			const session = { id: 6, voters: ['John'] };
			mockHttp.post.and.returnValue(Observable.of(false));

			voterService.addVoter(3, session as ISession, 'Joe');

			expect(mockHttp.post).toHaveBeenCalledWith('/api/events/3/sessions/6/voters/Joe', '{}', jasmine.any(Object));
		});
	});
});
