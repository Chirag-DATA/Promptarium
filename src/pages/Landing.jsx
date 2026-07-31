import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  Search, Sparkles, FolderKanban, Download, Star, Pin, ArrowRight,
  FileSearch, Clock, Users2, Code2, PenLine, GraduationCap, Briefcase,
  Plus, Minus,
} from "lucide-react";

const CHALLENGES = [
  { icon: FileSearch, title: "Scattered Prompts", desc: "Valuable prompts lost across chat histories and notes apps, hard to find when you need them." },
  { icon: Clock, title: "Time Wasted", desc: "Recreating the same prompt from scratch because you can't remember the version that worked." },
  { icon: FolderKanban, title: "No Organization", desc: "No structure for grouping prompts by project, model, or purpose." },
  { icon: Users2, title: "Nothing Portable", desc: "Your prompts locked into one tool, with no easy way to back them up or move them." },
];

const FEATURES = [
  { icon: FolderKanban, title: "Organize by category", desc: "Group prompts by project, model, or purpose. Nothing gets buried again." },
  { icon: Search, title: "Find anything instantly", desc: "Search across titles, tags, and full prompt text at once, in real time." },
  { icon: Sparkles, title: "Enhance with AI", desc: "Improve, rewrite, or optimize any prompt on the spot, using your own Gemini key." },
  { icon: Download, title: "Your data, portable", desc: "Export to JSON, TXT, or PDF anytime. Import your existing collection in seconds." },
];

const STATS = [
  { value: "4", label: "Export formats" },
  { value: "0%", label: "Setup to try it" },
  { value: "AI", label: "Powered enhancement" },
  { value: "100%", label: "Free to use" },
];

const PERSONAS = [
  { icon: Code2, title: "Developers", desc: "Keep reusable code-generation and debugging prompts organized by language and project." },
  { icon: PenLine, title: "Writers & Creators", desc: "Store tone, style, and structure prompts you've refined for consistent output." },
  { icon: GraduationCap, title: "Researchers", desc: "Document prompt variations while tracking what actually improved your results." },
  { icon: Briefcase, title: "Teams", desc: "Standardize how your team interacts with AI tools, without a shared doc getting messy." },
];

const STEPS = [
  { number: "01", title: "Save it", desc: "Paste a prompt in, tag it, pick a category. Takes seconds." },
  { number: "02", title: "Find it", desc: "Search or filter instantly the next time you need it." },
  { number: "03", title: "Reuse it", desc: "Copy with one click, or enhance it further before you do." },
];

const FAQS = [
  { q: "Do I need an account to try it?", a: "No. Click \"Get Started Free\" and start creating prompts immediately. They're saved to your browser. Sign up whenever you want them to sync across devices." },
  { q: "Is my Gemini API key safe?", a: "Yes. Your key is stored only in your browser and sent directly to Google's API. It never touches our servers." },
  { q: "Can I export my prompts?", a: "Yes, anytime, as JSON, TXT, or a formatted PDF. Your data is never locked in." },
  { q: "Is Promptarium free?", a: "Yes, completely. AI enhancement uses your own free Gemini API key, so there are no hidden usage costs on our end." },
];

const FaqItem = ({ faq, isOpen, onToggle }) => (
  <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden transition-colors">
    <button
      type="button"
      onClick={onToggle}
      className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-zinc-50 dark:hover:bg-zinc-900/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-inset"
    >
      <span className={`font-medium ${isOpen ? "text-blue-600" : "text-zinc-900 dark:text-zinc-100"}`}>
        {faq.q}
      </span>
      <span className={`shrink-0 rounded-full p-1 transition-colors ${isOpen ? "bg-blue-50 dark:bg-blue-950 text-blue-600" : "text-zinc-400"}`}>
        {isOpen ? <Minus size={16} /> : <Plus size={16} />}
      </span>
    </button>
    <div className={`grid transition-all duration-300 ease-out ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
      <div className="overflow-hidden">
        <p className="px-6 pb-5 text-[15px] text-zinc-500 dark:text-zinc-400 leading-relaxed">
          {faq.a}
        </p>
      </div>
    </div>
  </div>
);

const Landing = () => {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <div className="min-h-screen bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 overflow-x-hidden antialiased">
      {/* Nav */}
      <nav className="sticky top-0 z-20 backdrop-blur-xl bg-white/75 dark:bg-zinc-950/75 border-b border-zinc-100 dark:border-zinc-900">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight text-blue-600">Promptarium</span>
          <Link
            to="/login"
            className="rounded-full border border-zinc-200 dark:border-zinc-800 px-5 py-2 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900 active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
          >
            Log In / Sign Up
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative px-6 pt-24 pb-28">
        <div className="pointer-events-none absolute inset-x-0 -top-32 flex justify-center">
          <div className="h-[560px] w-[900px] rounded-full bg-gradient-to-br from-blue-400 via-indigo-400 to-blue-500 opacity-[0.18] dark:opacity-[0.22] blur-[110px]" />
        </div>
        <div className="pointer-events-none absolute inset-0 [background-image:radial-gradient(circle,#a1a1aa_1px,transparent_1px)] [background-size:28px_28px] opacity-[0.12]" />

        <div className="relative max-w-3xl mx-auto text-center flex flex-col items-center gap-7">
          <span className="inline-flex items-center gap-2 rounded-full bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 text-xs font-semibold px-4 py-1.5 ring-1 ring-blue-100 dark:ring-blue-900/60">
            <Sparkles size={13} /> No account needed to try it
          </span>

          <h1 className="text-5xl sm:text-7xl font-bold tracking-[-0.02em] leading-[1.05]">
            Every prompt,
            <br />
            <span className="bg-gradient-to-r from-blue-600 via-indigo-500 to-blue-500 bg-clip-text text-transparent">
              ready when you are.
            </span>
          </h1>

          <p className="text-lg sm:text-xl text-zinc-500 dark:text-zinc-400 max-w-xl leading-relaxed">
            The organized home for your AI prompts. Search instantly, enhance
            with AI, and never dig through chat history again.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 mt-3">
            <button
              type="button"
              onClick={() => navigate("/dashboard")}
              className="group flex items-center gap-2 rounded-full bg-blue-600 px-8 py-4 text-sm font-semibold text-white hover:bg-blue-700 active:scale-[0.98] transition-all duration-200 ease-out shadow-[0_1px_2px_rgba(37,99,235,0.15),0_12px_24px_-8px_rgba(37,99,235,0.5)] hover:shadow-[0_1px_2px_rgba(37,99,235,0.2),0_16px_32px_-8px_rgba(37,99,235,0.6)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
            >
              Get Started Free
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
            <Link
              to="/login"
              className="rounded-full border border-zinc-200 dark:border-zinc-800 px-8 py-4 text-sm font-medium hover:bg-zinc-50 dark:hover:bg-zinc-900 active:scale-[0.98] transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500"
            >
              Log In / Sign Up
            </Link>
          </div>
        </div>

        {/* Layered card stack */}
        <div className="relative max-w-lg mx-auto mt-20 h-[280px] sm:h-[260px]">
          <div className="absolute inset-x-6 top-8 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-zinc-50/80 dark:bg-zinc-900/50 h-full scale-95 opacity-50" />
          <div className="absolute inset-x-3 top-4 rounded-2xl border border-zinc-100 dark:border-zinc-800 bg-white/90 dark:bg-zinc-900/70 h-full scale-[0.975] opacity-75" />
          <div className="absolute inset-0 rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl p-7 flex flex-col gap-4 hover:-translate-y-1.5 transition-transform duration-300 ease-out shadow-[0_2px_4px_rgba(0,0,0,0.04),0_24px_48px_-12px_rgba(0,0,0,0.12)] dark:shadow-[0_2px_4px_rgba(0,0,0,0.2),0_24px_48px_-12px_rgba(0,0,0,0.5)]">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="font-semibold text-lg tracking-tight">SQL Query Optimizer</h3>
                <span className="text-xs text-zinc-400">Programming</span>
              </div>
              <div className="flex gap-2">
                <Pin size={16} fill="currentColor" className="text-blue-600" />
                <Star size={16} fill="currentColor" className="text-amber-400" />
              </div>
            </div>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Analyze the following SQL query and suggest indexing or rewriting
              strategies to improve execution time...
            </p>
            <div className="flex gap-1.5">
              {["sql", "performance"].map((tag) => (
                <span key={tag} className="rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 text-xs px-2.5 py-1 font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* The Challenge */}
      <section className="px-6 py-24 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-3">The problem</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Managing prompts today is messy</h2>
            <p className="text-zinc-500 dark:text-zinc-400">If any of this sounds familiar, you're not alone.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {CHALLENGES.map((c) => {
              const Icon = c.icon;
              return (
                <div
                  key={c.title}
                  className="flex gap-4 rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_24px_-8px_rgba(0,0,0,0.1)] transition-shadow duration-300"
                >
                  <div className="h-11 w-11 shrink-0 rounded-xl bg-red-50 dark:bg-red-950/40 text-red-500 flex items-center justify-center">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1 tracking-tight">{c.title}</h3>
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{c.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="px-6 py-16 border-b border-zinc-100 dark:border-zinc-900">
        <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
          {STATS.map((s) => (
            <div key={s.label}>
              <p className="text-3xl sm:text-4xl font-bold tracking-tight text-blue-600">{s.value}</p>
              <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 mt-1">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="px-6 py-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-3">Features</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3">Everything you need, nothing you don't</h2>
            <p className="text-zinc-500 dark:text-zinc-400">Built for people who use AI every day.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {FEATURES.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="group rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white dark:bg-zinc-900/60 p-7 hover:border-blue-200 dark:hover:border-blue-900 hover:shadow-[0_16px_32px_-12px_rgba(37,99,235,0.15)] transition-all duration-300 ease-out"
                >
                  <div className="h-12 w-12 rounded-xl bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300 ease-out">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 tracking-tight">{f.title}</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{f.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Who it's for */}
      <section className="px-6 py-24 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-3">Who it's for</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Built for anyone working with AI</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {PERSONAS.map((p) => {
              const Icon = p.icon;
              return (
                <div
                  key={p.title}
                  className="rounded-2xl border border-zinc-200/70 dark:border-zinc-800 bg-white dark:bg-zinc-900 p-6 text-center flex flex-col items-center gap-3 shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_24px_-8px_rgba(0,0,0,0.1)] transition-shadow duration-300"
                >
                  <div className="h-12 w-12 rounded-full bg-blue-50 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
                    <Icon size={22} />
                  </div>
                  <h3 className="font-semibold tracking-tight">{p.title}</h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{p.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-3">Process</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">How it works</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-10">
            {STEPS.map((step, i) => (
              <div key={step.number} className="relative text-center flex flex-col items-center gap-3">
                <span className="text-5xl font-bold tracking-tight text-blue-100 dark:text-blue-950">{step.number}</span>
                <h3 className="font-semibold text-lg tracking-tight">{step.title}</h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">{step.desc}</p>
                {i < STEPS.length - 1 && (
                  <ArrowRight size={18} className="hidden sm:block absolute top-6 -right-5 text-zinc-300 dark:text-zinc-700" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="px-6 py-24 bg-zinc-50 dark:bg-zinc-900/30">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs font-semibold tracking-widest uppercase text-blue-600 mb-3">FAQ</p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight">Frequently asked questions</h2>
          </div>
          <div className="flex flex-col gap-3">
            {FAQS.map((faq, i) => (
              <FaqItem
                key={faq.q}
                faq={faq}
                isOpen={openFaq === i}
                onToggle={() => setOpenFaq(openFaq === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="px-6 py-20">
        <div className="max-w-4xl mx-auto rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-600 px-8 py-16 text-center flex flex-col items-center gap-6 shadow-[0_24px_48px_-12px_rgba(37,99,235,0.35)]">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Ready to stop losing your best prompts?
          </h2>
          <p className="text-blue-100 max-w-md">
            Start organizing in seconds. No credit card, no signup required to try it.
          </p>
          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="group flex items-center gap-2 rounded-full bg-white px-8 py-4 text-sm font-semibold text-blue-600 hover:bg-blue-50 active:scale-[0.98] transition-all duration-200 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-blue-600"
          >
            Get Started Free
            <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-0.5" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-8 border-t border-zinc-100 dark:border-zinc-900 text-center text-xs text-zinc-400">
        © {new Date().getFullYear()} Promptarium — Every prompt, ready when you are.
      </footer>
    </div>
  );
};

export default Landing;