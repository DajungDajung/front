import { useNavigate, useOutletContext } from 'react-router-dom'
import CardItems from '../../components/cardItem/cardItems'
import style from './UserLikes.module.css'
import { useState } from 'react'
import data from '../../../dummyData.json'
import Pagination from '../../components/Pagination/pagination'
import { FaCartShopping } from 'react-icons/fa6'

export default function UserLikes() {
  const { contextUserLikeData } = useOutletContext();
  if (contextUserLikeData.length === 0) {
    console.log('좋아요 표시한 상품이 없습니다.');
  }
  console.log(contextUserLikeData)
  const [page, setPage] = useState(1);
  const itemPerPage = 8;
  const indexOfLast = page * itemPerPage;
  const indexOfFirst = indexOfLast - itemPerPage;
  const currentPage = contextUserLikeData.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(contextUserLikeData.length / itemPerPage);
  return (
    <>
      <div className={contextUserLikeData.length === 0 ? style.mainContainer : ''}>
        {
          contextUserLikeData.length === 0 ? (
            <>
              <div>
                <FaCartShopping />
                <p>상품이 없습니다.</p>
              </div>
            </>
          ) : (
            <>
              <div className={style.LikesContainer}>
                {currentPage.map((item) => (
                  <CardItems item={item} />
                ))}
              </div>
              <div>
                <Pagination totalPages={totalPages} currentPage={page} setCurrentPage={setPage} />
              </div>
            </>
          )
        }
      </div>
    </>
  )
}
