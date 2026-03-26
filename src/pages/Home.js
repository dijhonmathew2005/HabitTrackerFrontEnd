import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="container hero-section">
      <h1 className="hero-title">
        MASTER <br /> YOURSELF.
      </h1>
      <p className="hero-subtitle">
        A high-performance habit tracker for the minimalist mind. 
        Clean logic. Dark aesthetics. Standard results.
      </p>
      <button 
        className="btn-primary" 
        onClick={() => navigate('/habits')}
      >
        Enter Dashboard
      </button>
    </div>
  );
}

export default Home;