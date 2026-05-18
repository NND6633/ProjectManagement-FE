// Component con dùng chung cho các thẻ
const Card = ({ icon, title, description }) => (
  <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
    <div className="w-14 h-14 bg-indigo-50 text-[#5b61f4] rounded-2xl flex items-center justify-center mb-6">
      {icon}
    </div>
    <h3 className="text-xl font-bold text-slate-900 mb-4">{title}</h3>
    <p className="text-slate-500 leading-relaxed text-sm">{description}</p>
  </div>
);

const FeatureCards = () => {
  return (
    <section id="features" className="py-20 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
      <Card 
        icon={<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>}
        title="AI Optimize"
        description="Automatically assign tasks based on team bandwidth and historical performance data, ensuring optimal resource allocation."
      />
      <Card 
        icon={<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>}
        title="Risk Prediction"
        description="Identify potential bottlenecks and deadline risks before they happen with predictive analytics powered by machine learning."
      />
      <Card 
        icon={<svg className="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" /></svg>}
        title="Kanban Workflow"
        description="Visualize your work with intuitive, drag-and-drop boards designed to minimize clutter and maximize clarity."
      />
    </section>
  );
};

export default FeatureCards;