import Header from "./components/Header.js";
import toast, { Toaster } from "react-hot-toast";


function App() {
  return (
    <>
    <Toaster/>
      <div>
        <Header />
        <main className="pt-16 bg-slate-200 min-h-[calc(100vh)]">
        </main>
      </div>
    </>
  );
}

export default App;
