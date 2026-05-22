import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function BookCreatePage() {
  const navigate = useNavigate();

  // 폼 입력 상태
  const [form, setForm] = useState({
    title: '',
    author: '',
    content: '',
  });

  // AI 표지 생성 관련 상태
  const [apiKey, setApiKey] = useState('');
  const [quality, setQuality] = useState('MEDIUM');
  const [coverImage, setCoverImage] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGenerate = () => {
    // 3일차 M5에서 실제 OpenAI API 호출 구현 예정
    alert('AI 표지 생성은 3일차 미션 (M5)에서 구현됩니다');
  };

  const handleSubmit = () => {
    // 2일차 M4에서 실제 POST /books 호출 구현 예정
    if (!form.title.trim() || !form.author.trim() || !form.content.trim()) {
      alert('모든 필수 항목을 입력해주세요');
      return;
    }
    console.log('저장할 데이터:', { ...form, coverImageUrl: coverImage });
    alert('저장 기능은 2일차 미션 (M4)에서 구현됩니다');
  };

  return (
    <div className="page">
      <div className="page-head">
        <Link to="/" className="back-btn">← 목록으로</Link>
        <h1 style={{ fontSize: 20 }}>신규 도서 등록</h1>
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
              placeholder="예) 별빛 아래의 서점"
            />
            <div className="form-help">공백만 입력 불가</div>
          </div>

          <div className="form-group">
            <label>
              작가<span className="required">*</span>
            </label>
            <input
              name="author"
              value={form.author}
              onChange={handleChange}
              placeholder="예) 홍길동"
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
              placeholder="책 내용을 입력하세요. AI 표지 생성에 활용됩니다."
            />
            <div className="form-help">2~4문장 권장 (AI 표지 품질에 영향)</div>
          </div>

          <div className="ai-section">
            <div className="ai-section-title">AI 표지 생성</div>
            <div className="ai-section-desc">
              제목과 내용을 기반으로 표지를 미리 생성합니다. 결과는 우측에 표시됩니다.
            </div>

            <div className="form-group">
              <label style={{ fontSize: 12 }}>OpenAI API Key</label>
              <input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="sk-..."
              />
              <div className="form-help">조별 API Key 사용 · 저장되지 않음</div>
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
              <div className="form-help">HIGH일수록 품질 ↑ 비용 · 시간 ↑</div>
            </div>

            <button className="btn btn-ai" onClick={handleGenerate}>
              AI 표지 생성하기
            </button>
          </div>

          <div className="form-actions">
            <button className="btn" onClick={() => navigate('/')}>
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
                <div className="icon">▢</div>
                <div>
                  표지가 아직<br />생성되지 않았습니다
                </div>
              </>
            )}
          </div>
          <div className="preview-meta">생성 후 저장 시 함께 등록됩니다</div>
        </div>
      </div>
    </div>
  );
}

export default BookCreatePage;
