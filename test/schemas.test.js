import { describe, test, expect } from '@jest/globals'
import { validator } from '../lib'

const expressionsValidator = validator()

expect.extend({
  toBeValid (received, validate = expressionsValidator) {
    return {
      pass: validate(received),
      message: () => JSON.stringify(validate.errors, null, 2)
    }
  }
})

function isValid (examples) {
  describe('valid', () => {
    examples.forEach(example => {
      test(JSON.stringify(example), () => {
        expect(example).toBeValid()
      })
    })
  })
}

function isInvalid (examples) {
  describe('invalid', () => {
    examples.forEach(example => {
      test(JSON.stringify(example), () => {
        expect(example).not.toBeValid()
      })
    })
  })
}

describe('expressions.schema.json', () => {
  isInvalid([{}, [], { Any: [], All: [] }])

  describe('constants', () => {
    isValid(['string', true, false, 1, 1.1])
    isInvalid([null])
  });

  ['Any', 'All'].forEach(name => {
    describe(name, () => {
      isValid([
        { [name]: [] },
        { [name]: [1, true, 'string'] },
        { [name]: [{ Boolean: true }, { Property: 'admin' }] }
      ])

      isInvalid([
        { [name]: null },
        { [name]: 'nope' }
      ])
    })
  });

  ['Boolean', 'String', 'Number'].forEach(name => {
    describe(name, () => {
      isValid([
        { [name]: true },
        { [name]: false },
        { [name]: 'true' },
        { [name]: 'false' },
        { [name]: 0 },
        { [name]: 1 },
        { [name]: [true] },
        { [name]: [false] },
        { [name]: ['true'] },
        { [name]: ['false'] },
        { [name]: [0] },
        { [name]: [1] },
        { [name]: { Any: [] } },
        { [name]: [{ Any: [] }] }
      ])

      isInvalid([
        { [name]: null },
        { [name]: [true, false] },
        { [name]: true, Any: [] }
      ])
    })
  })

  describe('Percentage', () => {
    isValid([
      { Percentage: [0] },
      { Percentage: [99.999] },
      { Percentage: [100] },
      { Percentage: [{ Property: ['percentage'] }] }
    ])

    isInvalid([
      { Percentage: [-1] },
      { Percentage: [101] },
      { Percentage: [1, 2] },
      { Percentage: [null] },
      { Percentage: null }
    ])
  });

  ['Equal', 'GreaterThanOrEqualTo', 'GreaterThan', 'LessThanOrEqualTo', 'LessThan', 'NotEqual'].forEach(name => {
    describe(name, () => {
      isValid([
        { [name]: [1, 1] },
        { [name]: ['a', 'b'] },
        { [name]: [{ Property: 'age' }, 21] }
      ])

      isInvalid([
        { [name]: [1, 2, 3] },
        { [name]: [1] },
        { [name]: 1 },
        { [name]: null },
        { [name]: [1, 2], Any: [] }
      ])
    })
  })

  describe('Property', () => {
    isValid([
      { Property: 'name' },
      { Property: ['flipper_id'] }
    ])

    isInvalid([
      { Property: false },
      { Property: [false] },
      { Property: [] },
      { Property: null }
    ])
  })

  describe('Time', () => {
    isValid([
      { Time: '2021-01-01T00:00:00Z' },
      { Time: ['2021-01-01T00:00:00Z'] },
      { Time: '2021-01-01T00:00:00-05:00' },
      { Time: ['2021-01-01T00:00:00-05:00'] },
      { Time: { Property: 'created_at' } },
      { Time: [{ Property: 'created_at' }] }
    ])

    isInvalid([
      { Time: '2021-01-01' },
      { Time: 'January 1, 2021 10:00' },
      { Time: null },
      { Time: false },
      { Time: [{ Property: 'created_at' }, { Property: 'updated_at' }] }
    ])
  })

  describe('Duration', () => {
    isValid([
      { Duration: [2, 'seconds'] },
      { Duration: [2, 'minutes'] },
      { Duration: [2, 'hours'] },
      { Duration: [2, 'days'] },
      { Duration: [2, 'weeks'] },
      { Duration: [2, 'months'] },
      { Duration: [2, 'years'] }
    ])

    isInvalid([
      { Duration: 2 },
      { Duration: [2] },
      { Duration: [4, 'score'] }
    ])
  })

  describe('Now', () => {
    isValid([
      { Now: [] }
    ])

    isInvalid([
      { Now: null },
      { Now: [1] },
      { Now: 1 }
    ])
  })

  describe('Random', () => {
    isValid([
      { Random: [] },
      { Random: 1 },
      { Random: [100] },
      { Random: [{ Property: 'max_rand' }] },
    ])

    isInvalid([
      { Random: null },
      { Random: [1, 2] }
    ])
  })

  describe('PercentageOfActors', () => {
    isValid([
      { PercentageOfActors: ['string', 0] },
      { PercentageOfActors: ['string', 99.99] },
      { PercentageOfActors: ['string', 100] },
      { PercentageOfActors: [{ Property: ['flipper_id'] }, { Property: ['probability'] }] }
    ])

    isInvalid([
      { PercentageOfActors: ['string', -1] },
      { PercentageOfActors: ['string'] },
      { PercentageOfActors: [100] },
      { PercentageOfActors: ['string', 101] },
      { PercentageOfActors: [{ Property: ['flipper_id'] }] }
    ])
  })
})
