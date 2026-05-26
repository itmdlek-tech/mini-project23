import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="page" style={{ textAlign: 'center', padding: '100px 20px' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '16px', fontWeight: 700 }}>
        도서 관리 시스템
      </h1>
      <p style={{ color: '#555', marginBottom: '32px', fontSize: '16px' }}>
        원하는 도서를 자유롭게 등록하고 관리해보세요.
      </p>
      <button 
        className="btn btn-primary" 
        style={{ fontSize: '15px', padding: '10px 24px' }}
        onClick={() => navigate('/books')}
      >
        도서 목록 보러가기
      </button>
    </div>
  );
}

export default HomePage;