import { getDaysAgo } from './date';

describe('getDaysAgo 함수 테스트', () => {
  test("현재 시간과 같다면 '방금 전'을 반환", () => {
    const now = new Date().toISOString();
    expect(getDaysAgo(now)).toBe('방금 전');
  });

  describe.each([
    [60 * 1000, '1분 전'],
    [60 * 60 * 1000, '1시간 전'],
    [24 * 60 * 60 * 1000, '어제'],
    [2 * 24 * 60 * 60 * 1000, '2일 전'],
  ])('시간 차이 테스트 (%d 밀리초)', (timeDiff, expected) => {
    test(`현재로부터 ${expected} 일 때 올바른 값을 반환해야 함`, () => {
      const testDate = new Date(Date.now() - timeDiff).toISOString();
      expect(getDaysAgo(testDate)).toBe(expected);
    });
  });
});
