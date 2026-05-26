import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getBooks } from '../api/books';

function BookListPage() {
  const navigate = useNavigate();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState(''); // 검색어 상태 추가

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setLoading(true);
        const data = await getBooks();
        setBooks(data);
        setError('');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  // 검색어에 따른 필터링 처리 (심화 과정)
  const filteredBooks = books.filter(book => 
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="page">
      <div className="page-head">
        <h1>도서 목록</h1>
        <button className="btn btn-primary" onClick={() => navigate('/books/new')}>
          + 신규 등록
        </button>
      </div>

      {/* 검색 바 UI 추가 */}
      {!loading && !error && books.length > 0 && (
        <div className="search-bar">
          <input
            type="text"
            placeholder="도서 제목이나 작가명으로 검색해보세요"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      {loading && <div style={{ padding: 40, textAlign: 'center', color: '#888' }}>불러오는 중...</div>}

      {error && (
        <div style={{ padding: 16, background: '#fee', color: '#c0392b', borderRadius: 4, marginBottom: 16 }}>
          {error}
          <div style={{ fontSize: 12, marginTop: 4, color: '#888' }}>
            json-server가 실행 중인지 확인해주세요 (npx json-server@0.17.4 --watch db.json --port 3000)
          </div>
        </div>
      )}

      {!loading && !error && books.length === 0 && (
        <div style={{ padding: 40, textAlign: 'center', color: '#888' }}>등록된 도서가 없습니다.</div>
      )}

      {/* 검색 결과가 없을 때의 처리 */}
      {!loading && !error && books.length > 0 && filteredBooks.length === 0 && (
        <div style={{ padding: 40, textAlign: 'center', color: '#888' }}>검색 결과가 없습니다.</div>
      )}

      {!loading && !error && filteredBooks.length > 0 && (
        <div className="book-grid">
          {filteredBooks.map((book) => (
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
      )}
    </div>
  );
}

export default BookListPage;