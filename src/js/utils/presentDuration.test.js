import { presentFullDuration, presentMinutesDuration } from './presentDuration'

test('present minutes duration', () => {
  expect(presentFullDuration(130)).toBe('02:10')
})

test('present short minutes duration', () => {
  expect(presentMinutesDuration(130)).toBe('2')
})
