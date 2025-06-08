import axios from 'axios';
const { VITE_BACK_URL } = import.meta.env;
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import { Item, RawItem } from '../types/item.model';

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
  console.log('Fetched product data:', data);

  return data.map(
    (item: RawItem): Item => ({
      id: item.id,
      title: item.title,
      imgId: item.img_id,
      price: item.price,
      time: dayjs(item.created_at).fromNow(),
    }),
  );
};
