import React from 'react';

const SquareImage = ({ src, alt, size = 100 }) => {
  return (
    <div
      style={{
        width: `${size}px`,
        height: `${size}px`,
        overflow: 'hidden', // 잘리는 부분은 숨김 처리
        borderRadius: '10px', // 둥글게 처리 (필요시)
        position: 'relative',
      }}
    >
      <img
        src={src}
        alt={alt}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover', // 이미지 비율을 유지하면서 영역을 채우기
        }}
      />
    </div>
  );
};

export default SquareImage;
