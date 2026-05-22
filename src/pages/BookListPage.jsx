import { Link, useNavigate } from 'react-router-dom';

// ============================================
// Mock 데이터 — 2일차 M3에서 fetch로 교체 예정
// ============================================
const mockBooks = [
  {
    id: 1,
    title: '별빛 아래의 서점',
    author: '홍길동',
    coverImageUrl: '',
    createdAt: '2026-05-10T09:00:00.000Z',
  },
  {
    id: 2,
    title: '코드와 커피',
    author: '김개발',
    coverImageUrl: '',
    createdAt: '2026-05-12T14:30:00.000Z',
  },
  {
    id: 3,
    title: '고양이의 산책길',
    author: '이작가',
    coverImageUrl: '',
    createdAt: '2026-05-14T18:00:00.000Z',
  },
  {
    id: 4,
    title: '새벽 세 시의 편지',
    author: '박미소',
    coverImageUrl: '',
    createdAt: '2026-05-18T22:15:00.000Z',
  },
  {
    id: 5,
    title: '바다를 건넌 우체부',
    author: '최바람',
    coverImageUrl: '',
    createdAt: '2026-05-20T08:45:00.000Z',
  },
];

function BookListPage() {
  const navigate = useNavigate();

  return (
    <div className="page">
      <div className="page-head">
        <h1>도서 목록</h1>
        <button className="btn btn-primary" onClick={() => navigate('/books/new')}>
          + 신규 등록
        </button>
      </div>

      <div className="book-grid">
        {mockBooks.map((book) => (
          <Link to={`/books/${book.id}`} key={book.id} className="book-card">
            <div className="book-cover">
              {book.coverImageUrl ? (
                <img src={book.coverImageUrl} alt={book.title} />
              ) : (
                <span>표지 없음<br />(생성 전)</span>
              )}
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-meta">
              {book.author} · {new Date(book.createdAt).toLocaleDateString('ko-KR')}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default BookListPage;
