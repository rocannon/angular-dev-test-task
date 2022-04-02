import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { tap } from 'rxjs';
import { updateQueryParams } from '../app/app.actions';

@Injectable()
export class AppEffects {

	updateQueryParams$ = createEffect(() => {
		return this.actions.pipe(
			ofType(updateQueryParams),
			tap(({ params }) =>
				this.router.navigate([], {
					relativeTo: this.activatedRoute,
					queryParams: { ...params }
				})
			)

		)
	}, { dispatch: false });

	constructor(
		private readonly actions: Actions,
		private readonly activatedRoute: ActivatedRoute,
		private readonly router: Router,
	) { }

   
}
