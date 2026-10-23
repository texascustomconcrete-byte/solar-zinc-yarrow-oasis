import { createServerFn } from "@tanstack/react-start";
import { desks, type ChatTurn, type DeskId } from "./nexus";

const BASE = `You are Nexus, the founder desk for SoulTy Systems and DIY Vision. You speak with Jeremy. Quiet, direct, long-horizon, Texas-grounded. Never invent traction, revenue, users, signed deals, funding, or a patent that has not been filed. If the question is legal, tax, or IP ownership, add one sentence: "This is not legal or tax advice. Attorney or CPA review required."

Honest ground you may use:
- The company is bootstrap and founder-controlled.
- Live threads are DIY Vision, Tribe OS documentation, LockLink patent preparation, and one local brain on a Yoga laptop.
- Ollama is already installed on that laptop. A custom fine-tuned GGUF is not live yet.
- The right shape is one local model and six desks (Secretary, Accountant, Attorney, Engineer, Strategist, Archivist) as modes of that model.
- Prefer qwen2.5:7b when the laptop has about 16 GB of RAM. Prefer llama3.2:3b when it has about 8 GB.
- Folders already on the machine include Soulty_Systems_Master, TribeOS_Root, locklink_files, a Desktop Nexus.ps1, and .ollama.
- Do not tell him to paste terminal logs back into PowerShell.
- Spiritual and family context can be acknowledged when he brings it up. Do not force it into technical answers.

Be short. Lead with the answer. End with one next action when it helps.`;

function deskLine(id: string) {
  const desk = desks.find((d) => d.id === id);
  if (!desk || desk.id === "nexus") return "Speak as the whole desk.";
  return `Speak first as the ${desk.name} (${desk.line}). ${desk.hint}`;
}

export const askNexus = createServerFn({ method: "POST" })
  .validator((input: { desk?: string; messages?: ChatTurn[] }) => {
    const desk = (desks.some((d) => d.id === input?.desk) ? input.desk : "nexus") as DeskId;
    const messages = (input?.messages ?? [])
      .slice(-8)
      .map((m) => ({
        role: m.role === "assistant" ? ("assistant" as const) : ("user" as const),
        content: String(m.content ?? "").slice(0, 4000),
      }))
      .filter((m) => m.content.trim().length > 0);
    if (!messages.length || messages[messages.length - 1].role !== "user") {
      throw new Error("A question is required.");
    }
    return { desk, messages };
  })
  .handler(async ({ data }) => {
    const apiKey = process.env.XAI_API_KEY;
    if (!apiKey) {
      return { ok: false as const, error: "The desk cannot reach a model in this preview." };
    }

    const res = await fetch("https://api.x.ai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "grok-4.5",
        max_tokens: 500,
        temperature: 0.5,
        messages: [
          { role: "system", content: `${BASE}\n\n${deskLine(data.desk)}` },
          ...data.messages,
        ],
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      if (detail.includes("spending-limit") || res.status === 403) {
        return { ok: false as const, error: "credits" };
      }
      return { ok: false as const, error: `The model returned ${res.status}. Try once more.` };
    }

    const body = (await res.json()) as {
      choices?: { message?: { content?: string } }[];
    };
    const text = body.choices?.[0]?.message?.content?.trim() ?? "";
    if (!text) return { ok: false as const, error: "Empty answer. Ask again." };
    return { ok: true as const, text };
  });
