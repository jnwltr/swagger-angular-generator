import * as test from 'tape';
import {merge} from './utils';

test(
  'Merge arrays of objects favouring dup elems from one (dups determined by keys)',
  t => {
    const a = [
      {
        name: 'date_from',
        in: 'query',
        required: false,
        type: 'string',
        format: 'date-time',
      },
      {
        name: 'amount',
        in: 'path',
        required: false,
        type: 'integer',
      },
      {
        name: 'date_to',
        in: 'query',
        required: false,
        type: 'string',
        format: 'date-time',
      },
      {
        name: 'id',
        in: 'path',
        type: 'integer',
        required: true,
      },
    ];
    const b = [
      {
        name: 'id',
        in: 'query',
        required: true,
        type: 'string',
      },
      {
        name: 'amount',
        in: 'path',
        required: true,
        type: 'string',
      },
      {
        name: 'firstName',
        in: 'path',
        required: false,
        type: 'string',
      },
    ];
    const expected = [
      {
        name: 'date_from',
        in: 'query',
        required: false,
        type: 'string',
        format: 'date-time',
      },
      {
        name: 'amount',
        in: 'path',
        required: false,
        type: 'integer',
      },
      {
        name: 'date_to',
        in: 'query',
        required: false,
        type: 'string',
        format: 'date-time',
      },
      {
        name: 'id',
        in: 'path',
        type: 'integer',
        required: true,
      },
      {
        name: 'id',
        in: 'query',
        required: true,
        type: 'string',
      },
      {
        name: 'firstName',
        in: 'path',
        required: false,
        type: 'string',
      },
    ];
    const result = merge(a, b, 'in', 'name');

    t.equal(result.length, 6);
    t.deepEqual(result, expected);
    t.end();
  });
