import React, { useState } from 'react';
import './Comments.css';
import delete_btn from '../../../assets/ic_x.svg';
import { getImgSrc } from '../../../utils/image';
import { authRequest } from '../../../api/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { Comment } from '../../../types/comment.type';

interface CommentsProps {
  comments: Comment[];
  itemId: number;
  onCommentAdded: () => void;
}

const Comments: React.FC<CommentsProps> = ({
  comments,
  itemId,
  onCommentAdded,
}) => {
  const navigate = useNavigate();

  const [newComment, setNewComment] = useState('');

  const addComment = async (retryCount = 0) => {
    if (!newComment.trim()) {
      return;
    }

    try {
      await authRequest({
        method: 'post',
        url: `/comments/${itemId}`,
        data: { contents: newComment },
        navigate,
      });
      setNewComment('');
      onCommentAdded();
    } catch (error) {
      console.error(`댓글 추가 실패 (재시도 ${retryCount}회) : `, error);

      if (retryCount < 2) {
        setTimeout(() => addComment(retryCount + 1), 1000);
      } else {
        console.error('댓글 추가 실패 : ', error);
      }
    }
  };

  const deleteComment = async (commentId: number, retryCount = 0) => {
    try {
      const confirmDelete = window.confirm('댓글을 삭제하시겠습니까?');

      if (!confirmDelete) {
        return;
      }

      await authRequest({
        method: 'delete',
        url: `/comments/${commentId}`,
        navigate,
      });

      onCommentAdded();
    } catch (error: any) {
      if (error.response?.status === 403) {
        alert('본인의 댓글만 삭제할 수 있습니다.');
      } else if (error.response?.status === 401) {
        console.log('댓글 삭제 권한 없음');
      } else {
        console.error(`댓글 삭제 실패 (재시도 ${retryCount}회):`, error);

        if (retryCount < 2) {
          setTimeout(() => deleteComment(commentId, retryCount + 1), 1000);
        } else {
          console.error('댓글 삭제 에러:', error);
        }
      }
    }
  };

  return (
    <div className="comments_container">
      <div className="comment_input_wrapper">
        <input
          placeholder="댓글을 입력해주세요."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button onClick={() => addComment()}>입력</button>
      </div>

      <div className="comment_container">
        <div className="comments_title">
          <p className="comment_title_txt">댓글</p>
          <p className="comment_title_count">{comments.length}개</p>
        </div>

        {comments.map((comment) => (
          <div className="comment" key={comment.id}>
            <img
              src={getImgSrc(comment.imgId)}
              width={50}
              style={{ borderRadius: '100px' }}
            />
            <div className="comment_txt_container">
              <p className="comment_nickname">{comment.nickname}</p>
              <p className="comment_txt">{comment.contents}</p>
            </div>
            <img src={delete_btn} onClick={() => deleteComment(comment.id)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Comments;
