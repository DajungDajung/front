import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authRequest } from '../../../api/axiosInstance';
import { getCategories } from '../../../api/categoryApi';
import SampleImg from '../../../assets/sampleImg.svg';
import { formatNumber } from '../../../utils/format';
import { CiMap } from 'react-icons/ci';
import './ItemRegister.css';

const onlyNumber = (str) => str.replace(/[^0-9]/g, '');

const ItemRegister = ({ isEdit = false, item = null }) => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const [preview, setPreview] = useState(SampleImg);
  const [form, setForm] = useState({
    title: '',
    category: '',
    price: '',
    contents: '',
  });
  const [categories, setCategories] = useState([]);
  const [place, setPlace] = useState({
    id: 0,
    title: '',
    address: '',
    coordinatex: 0,
    coordinatey: 0,
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await getCategories();
        setCategories(response.data);
      } catch (error) {
        console.log('카테고리 조회 에러 : ', error);
      }
    };

    fetchCategories();

    if (isEdit && item) {
      setForm({
        title: item.title || '',
        category: item.category_id || '',
        price: item.price ? formatNumber(item.price) : '',
        contents: item.contents || '',
      });
      setPlace({
        title: item.location?.title || '',
        address: item.location?.address || '',
        coordinatex: item.location?.coordinatex || 0,
        coordinatey: item.location?.coordinatey || 0,
      });
      if (item.imageUrl) {
        setPreview(item.imageUrl);
      }
    }
  }, [isEdit, item]);

  const handleUploadClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'price') {
      const onlyNums = onlyNumber(value);
      setForm((prev) => ({
        ...prev,
        [name]: formatNumber(onlyNums),
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSelectPlace = () => {
    window.open('/map', 'mapSelectPopup', 'width=600,height=800');
  };

  const handleSubmit = async () => {
    const cleanPrice = Number(onlyNumber(form.price));

    const dataToSubmit = {
      ...form,
      price: cleanPrice,
      img_id: 1, // ✅ 이미지 업로드 구현 후 수정 필요
    };

    if (isEdit) {
      try {
        await authRequest({
          method: 'put',
          url: `/items/${item.id}`,
          data: dataToSubmit,
          navigate,
        });
        alert('상품이 수정되었습니다!');
        navigate(`/items/${item.id}`);
      } catch (error) {
        console.log('상품 수정 오류 : ', error);
      }
    } else {
      try {
        const response = await authRequest({
          method: 'post',
          url: '/items',
          data: dataToSubmit,
          navigate,
        });
        alert('상품이 등록되었습니다!');
        navigate(`/items/${response.insertId}`);
      } catch (error) {
        console.log('상품 등록 오류 : ', error);
      }
    }
  };

  return (
    <div className="item_create_container">
      <h1 className="sell_title">{isEdit ? '수정하기' : '판매하기'}</h1>

      <section className="item_img_upload">
        <img src={preview}></img>
        <button
          className="item_img_upload_btn"
          type="button"
          onClick={handleUploadClick}
        >
          업로드
        </button>
        <input
          type="file"
          accept="image/*"
          style={{ display: 'none' }}
          ref={fileInputRef}
          onChange={handleFileChange}
        />
      </section>

      <section className="item_create_input_container">
        <input
          className="item_create_input"
          name="title"
          placeholder="제목"
          value={form.title}
          onChange={handleChange}
        />
        <select
          className="item_create_select"
          name="category"
          value={form.category}
          onChange={handleChange}
        >
          <option value="">카테고리를 선택하세요</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.category}
            </option>
          ))}
        </select>
        <input
          className="item_create_input"
          name="price"
          placeholder="가격"
          value={form.price}
          onChange={handleChange}
        />
        <textarea
          className="item_create_input min-h-52 resize-y whitespace-pre-wrap break-words"
          name="contents"
          placeholder="설명"
          value={form.contents}
          onChange={handleChange}
        />
        <div className="text-xl w-[100%] h-[60px] rounded-[10px] border-[1px] border-solid border-gray-300 py-3 inline-flex items-center justify-between text-center">
          <input
            type="text"
            id="place"
            className="pl-3 w-[100%] border-r-gray-200 border-r-2"
            disabled
            placeholder="약속장소를 선택해주세요"
            value={form.place}
          />
          <a
            className=" text-3xl flex items-center p-5 justify-center cursor-pointer text-gray-400 hover:text-[#EC7FA9] active:text-[#BE5985]"
            onClick={handleSelectPlace}
          >
            <CiMap />
          </a>
        </div>
      </section>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <button className="item_create_btn" onClick={handleSubmit}>
          작성 완료
        </button>
      </div>
    </div>
  );
};

export default ItemRegister;
