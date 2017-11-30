// TODO: make the test case work
// import {HttpClientModule, HttpRequest} from '@angular/common/http';
// import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
// import {async, inject, TestBed} from '@angular/core/testing';
// import {PatchOrderService} from '../../../generated/controllers/PatchOrder';
//
// describe(`PatchOrderService`, () => {
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         HttpClientModule,
//         HttpClientTestingModule,
//       ],
//       providers: [PatchOrderService],
//     });
//   });
//
//   afterEach(inject([HttpTestingController], (backend: HttpTestingController) => {
//     backend.verify();
//   }));
//
//   it(`should check request parameters are correct`,
//     async(
//
//       inject([PatchOrderService, HttpTestingController],
//         (service: PatchOrderService, backend: HttpTestingController) => {
//
//         service.order({
//           orderId: '100',
//           model: 'test-model',
//           },
//         ).subscribe();
//
//         backend.expectOne((req: HttpRequest<any>) => {
//           return req.method === 'PATCH'
//             && req.url === '/api/order/100'
//             && req.body.model === 'test-model';
//         });
//       }),
//     ),
//   );
//
// });
