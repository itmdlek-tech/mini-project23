import { useEffect, useState } from 'react';
import { useNavigate, Link, useParams } from 'react-router-dom';
import { getBook, updateBook } from '../api/books';

function BookEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({ title: '', author: '', content: '' });
  const [apiKey, setApiKey] = useState('');
  const [quality, setQuality] = useState('MEDIUM');
  const [coverImage, setCoverImage] = useState('');

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const fetchBook = async () => {
      try {
        setLoading(true);
        const data = await getBook(id);
        setForm({
          title: data.title,
          author: data.author,
          content: data.content,
        });
        setCoverImage(data.coverImageUrl || '');
        setError('');
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleGenerate = () => {
    alert('AI 표지 재생성은 3일차 미션 (M5)에서 구현됩니다');
  };

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.author.trim() || !form.content.trim()) {
      alert('모든 필수 항목을 입력해주세요');
      return;
    }
    try {
      setSubmitting(true);
      await updateBook(id, {
        title: form.title.trim(),
        author: form.author.trim(),
        content: form.content.trim(),
        coverImageUrl: coverImage,
      });
      alert('수정되었습니다.');
      navigate(`/books/${id}`);
    } catch (err) {
      alert(`수정 실패: ${err.message}`);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="page" style={{ padding: 40, textAlign: 'center', color: '#888' }}>불러오는 중...</div>;
  }

  if (error) {
    return (
      <div className="page">
        <div style={{ padding: 16, background: '#fee', color: '#c0392b', borderRadius: 4 }}>{error}</div>
        <Link to={`/books/${id}`} className="back-btn" style={{ marginTop: 16, display: 'inline-block' }}>← 상세로</Link>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-head">
        <Link to={`/books/${id}`} className="back-btn">← 상세로</Link>
        <h1 style={{ fontSize: 20 }}>도서 수정</h1>
      </div>

      <div className="form-layout">
        <div>
          <div className="form-group">
            <label>
              제목<span className="required">*</span>
            </label>
            <input name="title" value={form.title} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>
              작가<span className="required">*</span>
            </label>
            <input name="author" value={form.author} onChange={handleChange} />
          </div>

          <div className="form-group">
            <label>
              내용<span className="required">*</span>
            </label>
            <textarea name="content" value={form.content} onChange={handleChange} />
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
            <button className="btn" onClick={() => navigate(`/books/${id}`)} disabled={submitting}>
              취소
            </button>
            <button className="btn btn-primary" onClick={handleSubmit} disabled={submitting}>
              {submitting ? '저장 중...' : '저장'}
            </button>
          </div>
        </div>

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
