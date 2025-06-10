import React, { useRef, useState } from 'react';
import Logo from '../../assets/Logo.png';

const EmailVerify: React.FC = () => {
  const [codeDigits, setCodeDigits] = useState<string[]>(['', '', '', '', '', '']);

  // 타입 명시 + 초기화
  const inputRefs = useRef<(HTMLInputElement | null)[]>(new Array(6).fill(null));

  const handleChange = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;

    // 만약 사용자가 2자리 입력 시 마지막 값만 남김
    if (value.length > 1) value = value.slice(-1);

    const newCode = [...codeDigits];
    newCode[index] = value;
    setCodeDigits(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !codeDigits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const fullCode = codeDigits.join('');
    if (fullCode.length !== 6) {
      alert('6자리 인증 코드를 입력해주세요.');
      return;
    }

    // 인증 코드 제출 로직
    alert(`입력한 코드: ${fullCode}`);
  };

  return (
    <div className="w-full min-h-screen flex justify-center items-center bg-white pt-[30px]">
      <div className="w-[400px] h-[400px] !rounded-2xl !mt-[40px] bg-white rounded-lg shadow-lg px-8 py-10">
        <div className="flex justify-center mb-6">
          <img src={Logo} alt="Logo" className="h-16" />
        </div>

        <p className="text-center text-sm text-gray-600 mb-6 leading-5 !mt-[10px]">
          6자리 인증 코드를 발송했습니다.<br />
          입력한 이메일에서 인증 번호를 확인해주세요.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="!mt-[40px] flex gap-2 mb-6">
            {codeDigits.map((digit, index) => (
              <input
                key={index}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                autoComplete="off"
                aria-label={`인증코드 ${index + 1}번째 자리`}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                ref={(el) => {
                  if (el) inputRefs.current[index] = el;
                }}
                className="w-10 h-12 text-center border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400 text-lg"
              />
            ))}
          </div>

          <button
            type="submit"
            className="w-[315px] h-[45px] !mt-[40px] bg-pink-300 text-white py-3 shadow-md rounded-md hover:bg-pink-400 transition"
          >
            입력하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmailVerify;
