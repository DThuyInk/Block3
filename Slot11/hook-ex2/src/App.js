import './App.css';
import Navbar from './components/Navbar';
import StudentsPage from './components/StudentsPage';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Navbar />
      <section style={{padding: '2rem 0', textAlign: 'center', background: '#e3f2fd'}}>
        <h1 style={{marginBottom: '0.5rem', color: '#1976d2'}}>Student Management</h1>
        <p style={{fontSize: '1.2rem'}}>Quản lý thông tin sinh viên một cách dễ dàng và trực quan.</p>
      </section>
      <StudentsPage />
      <Footer />
    </div>
  );
}

export default App;
