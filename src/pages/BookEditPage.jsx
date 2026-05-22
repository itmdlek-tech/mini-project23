import { useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';

// ============================================
// Mock 데이터 — 진입 시 기존 정보를 폼에 채워둠
// 2일차에 GET /books/:id로 교체 예정
// ============================================
const mockBook = {
  title: '별빛 아래의 서점',
  author: '홍길동',
  content:
    '작은 마을의 오래된 서점을 운영하는 주인의 1년을 담은 따뜻한 에세이. 매일 찾아오는 손님들과의 짧은 대화 속에서 발견하는 일상의 위로를 그린다.',
  coverImageUrl: '',
};

function BookEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  // 폼 입력 상태 — Mock 데이터로 초기화
  const [form, setForm] = useState({
    title: mockBook.title,
    author: mockBook.author,
    content: mockBook.content,
  });

  // AI 표지 재생성 관련 상태
  const [apiKey, setApiKey] = useState('');
  const [quality, setQuality] = useState('MEDIUM');
  const [coverImage, setCoverImage] = useState(mockBook.coverImageUrl);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGenerate = () => {
    alert('AI 표지 재생성은 3일차 미션 (M5)에서 구현됩니다');
  };

  const handleSubmit = () => {
    if (!form.title.trim() || !form.author.trim() || !form.content.trim()) {
      alert('모든 필수 항목을 입력해주세요');
      return;
    }
    console.log('수정할 데이터:', { ...form, coverImageUrl: coverImage });
    alert('수정 기능은 2일차 미션 (M4)에서 구현됩니다');
  };

  return (
    <div className="page">
      <div className="page-head">
        <Link to={`/books/${id}`} className="back-btn">← 상세로</Link>
        <h1 style={{ fontSize: 20 }}>도서 수정</h1>
      </div>

      <div className="form-layout">
        {/* LEFT: Form */}
        <div>
          <div className="form-group">
            <label>
              제목<span className="required">*</span>
            </label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>
              작가<span className="required">*</span>
            </label>
            <input
              name="author"
              value={form.author}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>
              내용<span className="required">*</span>
            </label>
            <textarea
              name="content"
              value={form.content}
              onChange={handleChange}
            />
          </div>

          <div className="ai-section">
            <div className="ai-section-title">
              AI 표지 재생성
              <span style={{ fontSize: 11, color: '#888', fontWeight: 400, marginLeft: 6 }}>
                선택
              </span>
            </div>
            <div className="ai-section-desc">
              현재 표지를 새로 생성합니다. 우측 미리보기에서 결과 확인 후 저장하세요.
            </div>

            <div className="form-group">
              <label style={{ fontSize: 12 }}>OpenAI API Key</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
              />
            </div>

            <div className="form-group">
              <label style={{ fontSize: 12 }}>퀄리티 (quality)</label>
              <div className="quality-row">
                {['LOW', 'MEDIUM', 'HIGH'].map((q) => (
                  <button
                    key={q}
                    type="button"
                    className={`quality-btn ${quality === q ? 'active' : ''}`}
                    onClick={() => setQuality(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            <button className="btn btn-ai" onClick={handleGenerate}>
              AI 표지 재생성하기
            </button>
          </div>

          <div className="form-actions">
            <button className="btn" onClick={() => navigate(`/books/${id}`)}>
              취소
            </button>
            <button className="btn btn-primary" onClick={handleSubmit}>
              저장
            </button>
          </div>
        </div>

        {/* RIGHT: Cover Preview */}
        <div className="cover-preview-panel">
          <div className="cover-preview-label">표지 미리보기</div>
          <div className="cover-preview">
            {coverImage ? (
              <img src={coverImage} alt="표지" />
            ) : (
              <>
                <div className="icon">▤</div>
                <div>
                  현재 표지<br />(저장됨)
                </div>
              </>
            )}
          </div>
          <div className="preview-meta">재생성 후 저장 시 표지가 갱신됩니다</div>
        </div>
      </div>
    </div>
  );
}

export default BookEditPage;
