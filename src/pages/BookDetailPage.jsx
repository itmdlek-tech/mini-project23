import { useParams, useNavigate, Link } from 'react-router-dom';

// ============================================
// Mock 데이터 — 2일차 M3에서 GET /books/:id로 교체 예정
// ============================================
const mockBook = {
  id: 1,
  title: '별빛 아래의 서점',
  author: '홍길동',
  content:
    '작은 마을의 오래된 서점을 운영하는 주인의 1년을 담은 따뜻한 에세이. 매일 찾아오는 손님들과의 짧은 대화 속에서 발견하는 일상의 위로를 그린다.',
  coverImageUrl: '',
  createdAt: '2026-05-10T09:00:00.000Z',
  updatedAt: '2026-05-10T09:00:00.000Z',
};

function BookDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const book = mockBook; // 1일차는 항상 같은 데이터 반환

  const handleDelete = () => {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      alert('삭제 기능은 2일차 미션 (M4)에서 구현됩니다');
    }
  };

  return (
    <div className="page">
      <div className="page-head">
        <Link to="/" className="back-btn">← 목록으로</Link>
        <div className="btn-group">
          <button className="btn" onClick={() => navigate(`/books/${id}/edit`)}>
            수정
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            삭제
          </button>
        </div>
      </div>

      <div className="detail-layout">
        <div className="detail-cover">
          {book.coverImageUrl ? (
            <img src={book.coverImageUrl} alt={book.title} />
          ) : (
            <span>표지 없음<br />(생성 전)</span>
          )}
        </div>
        <div>
          <h1 className="detail-title">{book.title}</h1>
          <p className="detail-author">{book.author} 著</p>
          <p className="detail-dates">
            등록 {new Date(book.createdAt).toLocaleString('ko-KR')}
            {' · '}
            수정 {new Date(book.updatedAt).toLocaleString('ko-KR')}
          </p>
          <div className="detail-content">{book.content}</div>
        </div>
      </div>
    </div>
  );
}

export default BookDetailPage;
