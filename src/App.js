import Footer from './components/footer';
import GameBoard from './components/gameboard';

function App() {
  return (
    <div className="app min-h-screen bg-gradient-to-b from-blue-300 to-cyan-300 flex flex-col items-center justify-center">
      <GameBoard />
      <Footer />
    </div>
  );
}

export default App;
