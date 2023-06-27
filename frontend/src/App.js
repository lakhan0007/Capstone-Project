import Header from './components/Header.js';
import { Outlet } from 'react-router-dom';

function App() {
  return (
      <div>
        <Header/>
        <main className="pt-16 bg-slate-200 min-h-[calc(100vh)]">
          <Outlet/>
        </main>
    
      </div>
  );
}

export default App;
