import KpiBar from "@/components/KpiBar";
import Chat from "@/components/chat";

export default function Page() {
  return (
    <main>
      <section className="container py-20 grid md:grid-cols-2 gap-12 items-center">
        <div>
          <div className="inline-flex items-center gap-3 bg-white border border-black/5 rounded-full px-4 py-1.5 shadow-soft">
            <img src="/logo.svg" className="w-5 h-5" alt="logo"/>
            <span className="text-sm">Malaysia-first, BM/EN</span>
          </div>
          <h1 className="mt-6 text-4xl md:text-5xl font-bold leading-tight">
            When the shutters close, <span className="text-brand-primary">the kitchen still answers.</span>
          </h1>
          <p className="mt-5 text-lg text-black/70">
            DapurGenie is a 24/7 AI host for F&B startups — answers menus, allergens, halal status, hours, promos, and delivery.
            Built serverless on AWS. Simple sheet-based onboarding.
          </p>
          <div className="mt-6 flex items-center gap-3">
            <a href="/features" className="bg-white text-black px-6 py-3 rounded-lg shadow-lg hover:bg-black hover:text-white transition-colors">Explore Features</a>
          </div>
          <div className="mt-10">
            <KpiBar/>
          </div>
        </div>
        <div id="demo" className="card p-6 w-50% y-50%">
          <h2 className="font-semibold text-xl">Live Demo • Bangi Outlet</h2>
          <p className="text-black/70 mt-1">Try asking: “masih buka?”, “Alergen untuk Curry Laksa?”, “budget bawah RM10”.</p>
          <div className="mt-4 w-100%"><Chat/></div>
          <p className="text-xs text-black/50 mt-3">Demo uses your API if configured, else a local mock.</p>
        </div>
      </section>

      <section className="container pb-24 grid md:grid-cols-3 gap-6">
        {[
          ["BM/EN auto-detect","Understands local food terms: nasi lemak, tapau, kurang manis."],
          ["Allergen & halal","Structured tags + disclaimers; never invents answers."],
          ["WhatsApp ready","Drop-in channel via webhooks; web widget included."],
        ].map(([t, d])=> (
          <div key={t} className="card p-6">
            <p className="font-semibold">{t}</p>
            <p className="text-black/70 mt-1">{d}</p>
          </div>
        ))}
      </section>
    </main>
  );
}