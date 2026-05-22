import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="app-header">
      <div className="container">
        <Link to="/" className="logo">도서 관리</Link>
        <nav>
          <Link to="/">홈</Link>
          <Link to="/">도서 목록</Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
