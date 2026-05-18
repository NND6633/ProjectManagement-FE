import Navbar from '../components/Guest/Navbar';
import Hero from '../components/Guest/Hero';
import FeatureCards from '../components/Guest/FeatureCards';
import FeatureDetail from '../components/Guest/FeatureDetail';

const Guest = () => {
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-100 selection:text-indigo-900">
      <Navbar />
      <main>
        <Hero />
        <FeatureCards />
        <FeatureDetail />
      </main>
      
      {/* Footer đơn giản cho trang trọn vẹn */}
      <footer className="py-10 text-center text-slate-400 border-t border-slate-100 mt-20">
        <p>© 2026 ProManage. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Guest;