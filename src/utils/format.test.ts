import { formatNumber, formatDate } from './format';

describe('formatNumber 함수 테스트', () => {
  test("1000을 입력하면 '1,000'을 반환해야 함", () => {
    expect(formatNumber(1000)).toBe('1,000');
  });

  test("1000000을 입력하면 '1,000,000'을 반환해야 함", () => {
    expect(formatNumber(1000000)).toBe('1,000,000');
  });

  test("숫자 123을 입력하면 변환 없이 '123'을 반환해야 함", () => {
    expect(formatNumber(123)).toBe('123');
  });

  test('음수도 올바르게 포맷 되어야 함', () => {
    expect(formatNumber(-1234567)).toBe('-1,234,567');
  });
});

describe('formatDate 함수 테스트', () => {
  const currentDate = new Date();
  const formattedCurrentDate = formatDate(currentDate.toISOString());

  test('현재 날짜를 입력하면 올바른 형식으로 반환해야 함', () => {
    const yy = String(currentDate.getFullYear()).slice(2);
    const mm = String(currentDate.getMonth() + 1).padStart(2, '0');
    const dd = String(currentDate.getDate()).padStart(2, '0');
    const hh = String(currentDate.getHours()).padStart(2, '0');
    const min = String(currentDate.getMinutes()).padStart(2, '0');

    const expectedFormat = `${yy}/${mm}/${dd} ${hh}:${min}`;
    expect(formattedCurrentDate).toBe(expectedFormat);
  });

  test('과거 날짜 입력 시 올바른 형식으로 반환해야 함', () => {
    const pastDate = new Date('2023-01-01T08:05:00');
    expect(formatDate(pastDate.toISOString())).toBe('23/01/01 08:05');
  });

  test("잘못된 날짜 입력 시 'Invalid Date' 예외 처리 확인", () => {
    expect(() => formatDate('invalid-date')).toThrow('Invalid Date');
  });
});
