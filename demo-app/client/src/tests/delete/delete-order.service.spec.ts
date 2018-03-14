import { HttpClientModule, HttpRequest } from '@angular/common/http'
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing'
import { async, inject, TestBed } from '@angular/core/testing'
import { OrderService } from '../../../generated/controllers/Order'

describe(`Order delete`, () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule, HttpClientTestingModule],
      providers: [OrderService]
    })
  })

  afterEach(
    inject([HttpTestingController], (backend: HttpTestingController) => {
      backend.verify()
    })
  )

  it(
    `should check request parameters are correct`,
    async(
      inject(
        [OrderService, HttpTestingController],
        (service: OrderService, backend: HttpTestingController) => {
          service
            .deleteORDER({ orderId: '123e4567-e89b-12d3-a456-426655440000' })
            .subscribe()

          backend.expectOne((req: HttpRequest<any>) => {
            return (
              req.method === 'DELETE' &&
              req.url ===
                'http://example.com/api/order/123e4567-e89b-12d3-a456-426655440000'
            )
          })
        }
      )
    )
  )
})
