import axios from 'axios';
const { VITE_BACK_URL } = import.meta.env;
import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import relativeTime from 'dayjs/plugin/relativeTime';
import { itemDetail, itemPreview } from '../types/item.model';

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

  return data.map(
    (item: itemDetail): itemPreview => ({
      id: item.id,
      title: item.title,
      imgId: item.img_id,
      price: item.price,
      time: dayjs(item.create_at).fromNow(),
    }),
  );
};
