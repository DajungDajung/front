import axios from 'axios';
const {VITE_BACK_URL} = import.meta.env;
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);
dayjs.locale('ko');

export const fetchProductList = async () => {
  const response = await axios.get(VITE_BACK_URL, {
    headers: {
      'Content-Type': 'application/json',
      'ngrok-skip-browser-warning': '69420',
    },
    withCredentials: true,
  });

  const data = Array.isArray(response.data) ? response.data : [];

  return data.map(item => ({
    id: item.id,
    name: item.title,
    img: item.img_id,
    price: item.price,
    time: dayjs(item.created_at).fromNow(),
  }));
};
