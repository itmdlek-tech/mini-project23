import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import BookListPage from './pages/BookListPage';
import BookDetailPage from './pages/BookDetailPage';
import BookCreatePage from './pages/BookCreatePage';
import BookEditPage from './pages/BookEditPage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<BookListPage />} />
          <Route path="/books/new" element={<BookCreatePage />} />
          <Route path="/books/:id" element={<BookDetailPage />} />
          <Route path="/books/:id/edit" element={<BookEditPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
