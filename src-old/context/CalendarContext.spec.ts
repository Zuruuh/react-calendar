import { expect, test } from 'bun:test';
import { renderHook } from '@testing-library/react';
import { useCalendarContext } from './CalendarContext';

test('useCalendarContext', () => {
  test('It throws when used outside of context', () => {
    expect(renderHook(() => useCalendarContext())).toThrow();
  });
});
