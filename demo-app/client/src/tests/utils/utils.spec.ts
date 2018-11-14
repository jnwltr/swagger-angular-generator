import {merge} from '../../../../../src/common/templates/utils';

describe('Merge two arrays of objects favouring duplicate elems from one', () => {

  it(`duplicates determined by keys: 'in', 'name'`, () => {
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
    const result = merge(a, b, 'in', 'name');

    expect(result.length).toBe(6);
    expect(result).toEqual(expected);

    const amounts = result.filter(e => e.name === 'amount');
    expect(amounts.length).toBe(1);
    expect(amounts[0].type).toBe('integer');

    const ids = result.filter(e => e.name === 'id');
    expect(ids.length).toBe(2);
    expect(ids.find(i => i.in === 'path').type).toBe('integer');
    expect(ids.find(i => i.in === 'query').type).toBe('string');
  });

});
