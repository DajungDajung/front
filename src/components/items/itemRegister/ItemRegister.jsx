import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../../api/axiosInstance';
import { getCategories } from '../../../api/categoryApi';
import SampleImg from '../../../assets/sampleImg.svg';
import { formatNumber } from '../../../utils/format';
import { CiMap } from 'react-icons/ci';
import './ItemRegister.css';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { postLocation, putLocation } from '../../../api/locationAPI';

const onlyNumber = (str) => str.replace(/[^0-9]/g, '');

const ItemRegister = ({ isEdit = false, item = null, oldLocation = null }) => {
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const { data: categories = [] } = useQuery({
    queryKey: ['categories'],
    queryFn: () => getCategories().then((res) => res.data),
  });

  const [preview, setPreview] = useState(SampleImg);
  const [form, setForm] = useState({
    title: '',
    category: '',
    price: '',
    contents: '',
  });
  const [location, setLocation] = useState({
    id: undefined,
    title: '',
    address: '',
    coordinateX: 0,
    coordinateY: 0,
  });

  const QueryClient = useQueryClient();
  const locationMutation = useMutation({
    mutationFn: (payload) => {
      if (location.id === undefined) {
        return postLocation(payload).then((res) => res.data);
      } else {
        return putLocation({
          id: location.id,
          ...payload,
        }).then((res) => res.data);
      }
    },
    onSuccess: (data, payload) => {
      setLocation({
        id: data.insertId ?? location.id,
        title: payload.title,
        address: payload.address,
        coordinate_x: payload.coordinateX,
        coordinate_y: payload.coordinateY,
      });
      QueryClient.invalidateQueries(['locations']);
    },
  });

  const itemMutation = useMutation({
    mutationFn: (data) => {
      const url = isEdit ? `/items/${item.id}` : '/items';
      const method = isEdit ? 'put' : 'post';
      return axiosInstance({ method, url, data }).then((res) => res.data);
    },
    onSuccess: (responseData) => {
      alert(isEdit ? '상품이 수정되었습니다!' : '상품이 등록되었습니다');
      QueryClient.invalidateQueries(['items']);
      navigate(
        isEdit ? `/items/${item.id}` : `/items/${responseData.insertId}`,
      );
    },
  });

  useEffect(() => {
    const handler = (event) => {
      if (event.target.origin !== window.origin) {
        return;
      }
      const { title, address, coords } = event.data;
      if (title && address && coords) {
        const newLocation = {
          title,
          address,
          coordinateX: coords.lat,
          coordinateY: coords.lng,
        };
        const payload = {
          title,
          address,
          coordinateX: coords.lat,
          coordinateY: coords.lng,
        };
        locationMutation.mutate(payload);
        setLocation((prev) => ({
          id: prev.id,
          ...newLocation,
        }));
      }
    };
    window.addEventListener('message', handler);
    return () => window.removeEventListener('message', handler);
  }, [locationMutation, location.id]);

  useEffect(() => {
    if (isEdit && item) {
      setForm({
        title: item.title,
        category: item.category_id,
        price: formatNumber(item.price.toString()),
        contents: item.contents,
      });
      setPreview(item.img_url || SampleImg);
      if (item.location) {
        setLocation({
          id: item.location.id,
          title: item.location.title,
          address: item.location.address,
          coordinateX: item.location.coordinate_x,
          coordinateY: item.location.coordinate_y,
        });
      }
    }
  }, [isEdit, item]);

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'price') {
      const num = onlyNumber(value);
      setForm((prev) => ({ ...prev, [name]: formatNumber(num) }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSelectPlace = () => {
    window.open('/map', 'mapSelectPopup', 'width=600,height=800');
  };

  const handleSubmit = () => {
    const cleanPrice = Number(onlyNumber(form.price));

    if (!location.id) {
      alert('위치를 선택해주세요.');
      return;
    }
    const payload = {
      ...form,
      price: cleanPrice,
      img_id: 1,
      category_id: form.category,
      contents: form.contents,
      location_id: location.id,
    };
    itemMutation.mutate(payload);
  };

  return (
    <div className="item_create_container">
      <h1 className="sell_title">{isEdit ? '수정하기' : '판매하기'}</h1>

      <section className="item_img_upload">
        <img src={preview} alt="preview" />
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
            value={
              location.title && [location.title, location.address].join(',')
            }
          />
          <a
            className=" text-2xl flex items-center p-5 justify-center cursor-pointer text-gray-400 hover:text-[#EC7FA9] active:text-[#BE5985]"
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
