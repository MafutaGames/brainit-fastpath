import React, { useMemo, useState } from "react";
import { QUESTIONS, type Industry, type Question } from "./questions";

type Answers = Record<string, boolean | string | undefined>;

function scoreQuestions(qs: Question[], a: Answers) {
  let score = 0;
  for (const q of qs) {
    if (q.type === "choice") continue;
    const yes = a[q.id] === true;
    if (yes) score += q.weight ?? 1;
  }
  return score;
}

function recommend(score: number) {
  if (score >= 7) return { tier: "Basic AI Setup ($250)", cta: "See what’s included", href: "https://brainitconsulting.com/pricing" };
  if (score >= 4) return { tier: "Book a $50 Pro Work Session", cta: "Book now", href: "https://brainitconsulting.com/book-pro-work-session" };
  return { tier: "Start with a Free Prototype", cta: "Get started", href: "https://brainitconsulting.com" };
}

const industries: Industry[] = ["Boutique", "Coffee Shop", "Legal", "Dental", "Art Gallery"];

export default function App() {
  const [industry, setIndustry] = useState<Industry>("Boutique");
  const [answers, setAnswers] = useState<Answers>({});
  const [submitted, setSubmitted] = useState(false);

  const qs = useMemo(() => QUESTIONS[industry], [industry]);
  const score = useMemo(() => scoreQuestions(qs, answers), [qs, answers]);
  const rec = useMemo(() => recommend(score), [score]);

  const reset = () => { setAnswers({}); setSubmitted(false); };

  const onToggle = (id: string) =>
    setAnswers((prev) => ({ ...prev, [id]: !(prev[id] === true) }));

  const onChoose = (id: string, value: string) =>
    setAnswers((prev) => ({ ...prev, [id]: value }));

  return (
    <main className=\"min-h-screen bg-gray-50 text-gray-900\">
      <div className=\"mx-auto max-w-2xl p-6\">
        <header className=\"mb-6\">
          <h1 className=\"text-2xl font-semibold\">BrainIT Automation — Fast Path</h1>
          <p className=\"text-sm text-gray-600\">A quick way to pick the right next step for your business.</p>
        </header>

        <section className=\"mb-4 rounded-xl border bg-white p-4 shadow-sm\">
          <label className=\"mb-2 block text-sm font-medium\">Select your industry</label>
          <select
            className=\"w-full rounded-lg border px-3 py-2 outline-none\"
            value={industry}
            onChange={(e) => { setIndustry(e.target.value as Industry); reset(); }}
          >
            {industries.map((i) => <option key={i} value={i}>{i}</option>)}
          </select>
        </section>

        <section className=\"mb-4 rounded-xl border bg-white p-4 shadow-sm\">
          <h2 className=\"mb-3 text-lg font-medium\">Quick questions</h2>
          <div className=\"space-y-2\">
            {qs.map((q) => (
              <div key={q.id} className=\"flex items-start gap-3\">
                {q.type !== \"choice\" ? (
                  <>
                    <input
                      id={q.id}
                      type=\"checkbox\"
                      className=\"mt-1 h-4 w-4 cursor-pointer rounded border-gray-300\"
                      checked={answers[q.id] === true}
                      onChange={() => onToggle(q.id)}
                    />
                    <label htmlFor={q.id} className=\"cursor-pointer select-none\">{q.label}</label>
                    {q.weight === 2 && <span className=\"ml-auto rounded bg-indigo-50 px-2 py-0.5 text-xs text-indigo-700\">High impact</span>}
                  </>
                ) : (
                  <div className=\"w-full\">
                    <div className=\"mb-1 font-medium\">{q.label}</div>
                    <div className=\"flex flex-wrap gap-2\">
                      {q.choices?.map((c) => (
                        <button
                          key={c.value}
                          type=\"button\"
                          onClick={() => onChoose(q.id, c.value)}
                          className={\`${answers[q.id]===c.value ? \"border-indigo-600 bg-indigo-50 text-indigo-700\" : \"border-gray-300 bg-white\"} rounded-lg border px-3 py-1 text-sm\`}
                        >
                          {c.label}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className=\"mt-4 flex gap-2\">
            <button
              onClick={() => setSubmitted(true)}
              className=\"rounded-xl bg-gray-900 px-4 py-2 text-white hover:bg-gray-800\"
            >
              See recommendation
            </button>
            <button
              onClick={reset}
              className=\"rounded-xl border border-gray-300 px-4 py-2 hover:bg-gray-100\"
            >
              Reset
            </button>
          </div>
        </section>

        {submitted && (
          <section className=\"rounded-xl border bg-white p-4 shadow-sm\">
            <div className=\"flex items-center justify-between\">
              <h3 className=\"text-lg font-semibold\">Your result</h3>
              <span className=\"text-sm text-gray-500\">Score: {score}</span>
            </div>
            <p className=\"mt-2\">
              Recommendation: <span className=\"font-medium\">{rec.tier}</span>
            </p>
            {typeof answers[\"urgency\"] === \"string\" && (
              <p className=\"mt-1 text-sm text-gray-600\">
                Urgency: {(answers[\"urgency\"] as string).toUpperCase()}
              </p>
            )}
            <div className=\"mt-4\">
              <a
                href={rec.href}
                target=\"_blank\"
                rel=\"noreferrer\"
                className=\"inline-flex items-center rounded-xl bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-500\"
              >
                {rec.cta}
                <svg className=\"ml-2 h-4 w-4\" fill=\"currentColor\" viewBox=\"0 0 20 20\">
                  <path d=\"M12.293 2.293a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L14 5.414V15a1 1 0 11-2 0V5.414L8.707 7.707A1 1 0 117.293 6.293l4-4z\" />
                </svg>
              </a>
            </div>
            <p className=\"mt-3 text-xs text-gray-500\">
              This tool is advisory. For complex setups, book a session.
            </p>
          </section>
        )}

        <footer className=\"mt-8 text-center text-xs text-gray-500\">
          © {new Date().getFullYear()} BrainIT Consulting — Make IT & AI simple.
        </footer>
      </div>
    </main>
  );
}
