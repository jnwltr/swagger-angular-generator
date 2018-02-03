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
import {PatchOrderService} from '../../../../controllers/PatchOrder';
import {UPDATE_PATCHORDER_ORDER_START, UpdatePatchOrderOrderError, UpdatePatchOrderOrderStart, UpdatePatchOrderOrderSuccess} from './actions';

@Injectable()
export class UpdatePatchOrderOrderEffects {

  constructor(
    private actions: Actions,
    private patchorderService: PatchOrderService,
  ) {}

  @Effect()
  UpdatePatchOrderOrder = this.actions.ofType<UpdatePatchOrderOrderStart>(UPDATE_PATCHORDER_ORDER_START).pipe(
    switchMap((action: UpdatePatchOrderOrderStart) => this.patchorderService.order(action.payload).pipe(
      map(UpdatePatchOrderOrder => new UpdatePatchOrderOrderSuccess(UpdatePatchOrderOrder)),
      catchError((error: Error) => of(new UpdatePatchOrderOrderError(error.message))),
  )));
}
