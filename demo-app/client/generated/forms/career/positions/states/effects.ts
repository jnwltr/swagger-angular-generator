/* tslint:disable:max-line-length */
/**
 * Test Swagger
 * v1
 * example.com/swagger
 */

import {Injectable} from '@angular/core';
import {Actions, Effect} from '@ngrx/effects';
import {of} from 'rxjs/observable/of';
import {catchError, map, switchMap} from 'rxjs/operators';
import {CareerService} from '../../../../controllers/Career';
import {LOAD_CAREER_POSITIONS_START, LoadCareerPositionsError, LoadCareerPositionsStart, LoadCareerPositionsSuccess} from './actions';

@Injectable()
export class LoadCareerPositionsEffects {

  constructor(
    private actions: Actions,
    private careerService: CareerService,
  ) {}

  @Effect()
  LoadCareerPositions = this.actions.ofType<LoadCareerPositionsStart>(LOAD_CAREER_POSITIONS_START).pipe(
    switchMap((action: LoadCareerPositionsStart) => this.careerService.positions().pipe(
      map(LoadCareerPositions => new LoadCareerPositionsSuccess(LoadCareerPositions)),
      catchError((error: Error) => of(new LoadCareerPositionsError(error.message))),
  )));
}
