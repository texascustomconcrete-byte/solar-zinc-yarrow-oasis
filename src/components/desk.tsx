import { useEffect, useRef, useState } from "react";
import {
  Archive,
  Compass,
  Cpu,
  Flag,
  HardHat,
  Landmark,
  PenLine,
  Scale,
  SunMedium,
  Volume2,
} from "lucide-react";
import { askNexus } from "@/lib/ask.functions";
import { dayItems, desks, fit, standingReply, starters, type ChatTurn, type DeskId } from "@/lib/nexus";

const icons = {
  nexus: Compass,
  secretary: PenLine,
  accountant: Landmark,
  attorney: Scale,
  engineer: HardHat,
  strategist: Flag,
  archivist: Archive,
} as const;

type Tab = "desk" | "fit" | "day";

const DAY_KEY = "nexus-day-v1";

export function Desk() {
  const [tab, setTab] = useState<Tab>("desk");
  const [desk, setDesk] = useState<DeskId>("nexus");
  const [turns, setTurns] = useState<ChatTurn[]>([]);
  const [draft, setDraft] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [checks, setChecks] = useState<Record<string, boolean>>({});
  const [note, setNote] = useState("");
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(DAY_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as { checks?: Record<string, boolean>; note?: string };
      setChecks(saved.checks ?? {});
      setNote(saved.note ?? "");
    } catch {
      /* ignore a bad local note */
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(DAY_KEY, JSON.stringify({ checks, note }));
  }, [checks, note]);

  useEffect(() => {
    scroller.current?.scrollTo({ top: scroller.current.scrollHeight });
  }, [turns, busy]);

  async function send(text: string) {
    const content = text.trim();
    if (!content || busy) return;
    const next = [...turns, { role: "user" as const, content }];
    setTurns(next);
    setDraft("");
    setBusy(true);
    setError("");
    try {
      const result = await askNexus({ data: { desk, messages: next } });
      if (!result.ok) {
        if (result.error === "credits") {
          setTurns([...next, { role: "assistant", content: standingReply(content) }]);
          return;
        }
        setError(result.error);
        return;
      }
      setTurns([...next, { role: "assistant", content: result.text }]);
    } catch {
      setError("The desk did not answer. Ask once more.");
    } finally {
      setBusy(false);
    }
  }

  function readLast() {
    const last = [...turns].reverse().find((t) => t.role === "assistant");
    if (!last || typeof window === "undefined" || !window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(last.content);
    const voice = window.speechSynthesis
      .getVoices()
      .find((v) => /en-GB/i.test(v.lang));
    if (voice) utterance.voice = voice;
    utterance.rate = 0.96;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  }

  const active = desks.find((d) => d.id === desk) ?? desks[0];

  return (
    <div className="min-h-screen bg-paper text-ink">
      <header className="border-b border-line bg-card">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4">
          <div>
            <p className="font-serif text-2xl leading-none tracking-tight">Nexus Desk</p>
            <p className="mt-1 text-sm text-mute">SoulTy · one brain on the Yoga</p>
          </div>
          <p className="hidden max-w-xs text-right text-sm text-mute sm:block">
            Preview mind uses the same rules the laptop should. It does not invent traction.
          </p>
        </div>
      </header>

      <div className="mx-auto grid max-w-6xl lg:grid-cols-[240px_1fr]">
        <aside className="hidden border-r border-line lg:block">
          <nav className="flex flex-col gap-1 p-3">
            {desks.map((item) => {
              const Icon = icons[item.id];
              const on = item.id === desk && tab === "desk";
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    setDesk(item.id);
                    setTab("desk");
                  }}
                  className={`flex min-h-11 items-center gap-3 rounded-lg px-3 py-2 text-left ${
                    on ? "bg-moss text-moss-soft" : "hover:bg-card"
                  }`}
                >
                  <Icon size={18} aria-hidden />
                  <span>
                    <span className="block text-sm font-medium">{item.name}</span>
                    <span className={`block text-xs ${on ? "text-moss-soft" : "text-mute"}`}>
                      {item.line}
                    </span>
                  </span>
                </button>
              );
            })}
          </nav>
        </aside>

        <main className="min-h-[70vh] pb-24 lg:pb-6">
          {tab === "desk" && (
            <section className="flex min-h-[70vh] flex-col">
              <div className="flex items-center justify-between gap-3 border-b border-line px-4 py-3">
                <div>
                  <h1 className="font-serif text-xl">{active.name}</h1>
                  <p className="text-sm text-mute">{active.hint}</p>
                </div>
                <button
                  type="button"
                  onClick={readLast}
                  className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-line bg-card px-3 text-sm"
                >
                  <Volume2 size={16} aria-hidden />
                  Read
                </button>
              </div>

              <div ref={scroller} className="flex flex-1 flex-col gap-3 overflow-y-auto px-4 py-4">
                {turns.length === 0 && (
                  <div className="rounded-xl border border-line bg-card p-5">
                    <p className="font-serif text-2xl leading-tight">
                      One model. Six desks. No invented numbers.
                    </p>
                    <p className="mt-3 max-w-prose text-sm text-mute">
                      The Yoga already runs Ollama. It does not need another stack. This desk is the
                      shape that fits: Qwen 2.5 7B if you have about 16 GB, the 3B if you do not, and
                      the council as modes of that single model.
                    </p>
                    <div className="mt-4 flex flex-col gap-2">
                      {starters.map((prompt) => (
                        <button
                          key={prompt}
                          type="button"
                          onClick={() => void send(prompt)}
                          className="min-h-11 rounded-lg border border-line bg-paper px-3 text-left text-sm hover:border-copper"
                        >
                          {prompt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                {turns.map((turn, index) => (
                  <article
                    key={`${turn.role}-${index}`}
                    className={`max-w-[42rem] rounded-xl px-4 py-3 text-sm ${
                      turn.role === "user"
                        ? "ml-auto bg-ink text-paper"
                        : "bg-card border border-line"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{turn.content}</p>
                  </article>
                ))}
                {busy && <p className="text-sm text-mute">Thinking…</p>}
                {error && (
                  <p className="rounded-lg bg-copper-soft px-3 py-2 text-sm text-ink">{error}</p>
                )}
              </div>

              <form
                className="sticky bottom-16 flex gap-2 border-t border-line bg-paper px-4 py-3 lg:bottom-0"
                onSubmit={(event) => {
                  event.preventDefault();
                  void send(draft);
                }}
              >
                <label className="sr-only" htmlFor="ask">
                  Ask the desk
                </label>
                <input
                  id="ask"
                  value={draft}
                  onChange={(event) => setDraft(event.target.value)}
                  placeholder={`Ask ${active.name}`}
                  className="min-h-11 flex-1 rounded-lg border border-line bg-card px-3 text-sm outline-none focus:border-copper"
                />
                <button
                  type="submit"
                  disabled={busy || !draft.trim()}
                  className="min-h-11 rounded-lg bg-copper px-4 text-sm font-medium text-paper disabled:opacity-50"
                >
                  Send
                </button>
              </form>
            </section>
          )}

          {tab === "fit" && (
            <section className="flex flex-col gap-4 px-4 py-5">
              <div>
                <p className="text-xs font-medium tracking-wide text-copper uppercase">Yoga fit</p>
                <h1 className="mt-1 font-serif text-3xl leading-tight">What belongs on this laptop</h1>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <article className="rounded-xl border border-line bg-card p-4">
                  <div className="flex items-center gap-2 text-moss">
                    <Cpu size={18} aria-hidden />
                    <h2 className="font-medium">Run this</h2>
                  </div>
                  <p className="mt-2 font-serif text-2xl">{fit.model}</p>
                  <p className="text-sm text-mute">Fallback {fit.fallback}</p>
                  <p className="mt-3 text-sm">{fit.why}</p>
                </article>
                <article className="rounded-xl border border-line bg-moss p-4 text-moss-soft">
                  <h2 className="font-medium">Keep</h2>
                  <ul className="mt-2 flex flex-col gap-2 text-sm">
                    {fit.keep.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </article>
              </div>
              <article className="rounded-xl border border-line bg-card p-4">
                <h2 className="font-medium">Already on the drive</h2>
                <ul className="mt-3 divide-y divide-line">
                  {fit.folders.map((folder) => (
                    <li key={folder.name} className="flex flex-col gap-0.5 py-2 sm:flex-row sm:justify-between">
                      <span className="font-medium">{folder.name}</span>
                      <span className="text-sm text-mute">{folder.note}</span>
                    </li>
                  ))}
                </ul>
              </article>
              <article className="rounded-xl bg-copper-soft p-4">
                <h2 className="font-medium">Leave alone for now</h2>
                <ul className="mt-2 flex flex-col gap-2 text-sm">
                  {fit.drop.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            </section>
          )}

          {tab === "day" && (
            <section className="flex flex-col gap-4 px-4 py-5">
              <div className="flex items-center gap-2 text-copper">
                <SunMedium size={18} aria-hidden />
                <p className="text-xs font-medium tracking-wide uppercase">Secretary</p>
              </div>
              <h1 className="font-serif text-3xl leading-tight">Today, on one page</h1>
              <ul className="flex flex-col gap-2">
                {dayItems.map((item) => (
                  <li key={item.id}>
                    <label className="flex min-h-11 items-center gap-3 rounded-xl border border-line bg-card px-3">
                      <input
                        type="checkbox"
                        checked={Boolean(checks[item.id])}
                        onChange={() =>
                          setChecks((current) => ({ ...current, [item.id]: !current[item.id] }))
                        }
                        className="size-4 accent-moss"
                      />
                      <span className="text-sm">{item.label}</span>
                    </label>
                  </li>
                ))}
              </ul>
              <label className="flex flex-col gap-2 text-sm" htmlFor="note">
                The one output
                <textarea
                  id="note"
                  value={note}
                  onChange={(event) => setNote(event.target.value)}
                  rows={4}
                  className="rounded-xl border border-line bg-card p-3 outline-none focus:border-copper"
                  placeholder="What will actually be finished."
                />
              </label>
              <p className="text-sm text-mute">Saved on this device only.</p>
            </section>
          )}
        </main>
      </div>

      <nav className="fixed inset-x-0 bottom-0 flex border-t border-line bg-card lg:hidden">
        {(
          [
            ["desk", "Desk"],
            ["fit", "Yoga"],
            ["day", "Day"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`min-h-14 flex-1 text-sm ${tab === id ? "text-copper font-medium" : "text-mute"}`}
          >
            {label}
          </button>
        ))}
      </nav>

      <div className="mx-auto hidden max-w-6xl gap-2 px-4 pb-6 lg:flex">
        {(
          [
            ["desk", "Desk"],
            ["fit", "Yoga fit"],
            ["day", "Today"],
          ] as const
        ).map(([id, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => setTab(id)}
            className={`min-h-11 rounded-lg px-4 text-sm ${
              tab === id ? "bg-ink text-paper" : "border border-line bg-card"
            }`}
          >
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}
