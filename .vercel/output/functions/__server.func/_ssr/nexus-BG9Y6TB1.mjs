//#region node_modules/.nitro/vite/services/ssr/assets/nexus-BG9Y6TB1.js
var desks = [
	{
		id: "nexus",
		name: "Nexus",
		line: "The whole desk",
		hint: "One mind. Practical next step."
	},
	{
		id: "secretary",
		name: "Secretary",
		line: "The day",
		hint: "Morning start and end-of-day. Facts only."
	},
	{
		id: "accountant",
		name: "Accountant",
		line: "The money",
		hint: "Records, refinance tracking. Not tax advice."
	},
	{
		id: "attorney",
		name: "Attorney",
		line: "The line",
		hint: "Patent language and trust boundaries. Review required."
	},
	{
		id: "engineer",
		name: "Engineer",
		line: "The build",
		hint: "Tribe OS, LockLink, what is actually drawn."
	},
	{
		id: "strategist",
		name: "Strategist",
		line: "The story",
		hint: "Investor language that stays honest."
	},
	{
		id: "archivist",
		name: "Archivist",
		line: "The vault",
		hint: "What already lives on the Yoga."
	}
];
var starters = [
	"What should the Yoga actually run?",
	"Honest status of SoulTy right now.",
	"Can I say the patent is pending?",
	"Secretary: morning start."
];
var fit = {
	model: "qwen2.5:7b",
	fallback: "llama3.2:3b",
	why: "The Yoga already has Ollama. It does not have room for six models, a vector database, and a voice model at once. One instructed 7B model in Q4 carries the whole council as modes. If the machine is closer to 8 GB of RAM, drop to the 3B.",
	keep: [
		"Ollama, already installed under your user folder",
		"One model: Qwen 2.5 7B, or Llama 3.2 3B if memory is tight",
		"Six desks as voices of that one model, not six processes",
		"A plain text index of folders you already have",
		"Windows speech for read-aloud. No second model for voice."
	],
	drop: [
		"A custom fine-tune before the desk is usable",
		"Another launcher beside the ones already on the Desktop",
		"Hermes rebuild logs pasted into PowerShell",
		"Cloud as the default brain"
	],
	folders: [
		{
			name: "Soulty_Systems_Master",
			note: "Company working set"
		},
		{
			name: "TribeOS_Root",
			note: "Structural system notes"
		},
		{
			name: "locklink_files",
			note: "Cord lock invention"
		},
		{
			name: "Desktop / Nexus.ps1",
			note: "An older launcher. Keep it. Do not add five more."
		},
		{
			name: ".ollama",
			note: "Local models. This is the engine."
		}
	]
};
var dayItems = [
	{
		id: "alive",
		label: "Local brain answers one question"
	},
	{
		id: "one",
		label: "Name the single output for today"
	},
	{
		id: "open",
		label: "One legal or money item that needs a decision"
	},
	{
		id: "done",
		label: "End of day: what actually finished"
	}
];
function standingReply(question) {
	const q = question.toLowerCase();
	const lead = "The preview model is out of credits, so this is the standing desk answer, not a generated one.";
	if (q.includes("patent") || q.includes("pending")) return `${lead}\n\nDo not say the patent is pending until a filing receipt exists. Until then: patent preparation is underway. This is not legal advice. Attorney review required.\n\nNext action: confirm whether a provisional was actually filed.`;
	if (q.includes("morning") || q.includes("secretary")) return `${lead}\n\nMorning start: confirm the local brain answers, name the one output for today, and note any money or legal decision that cannot wait.\n\nNext action: write that one output on the Today tab.`;
	if (q.includes("status") || q.includes("honest")) return `${lead}\n\nSoulTy is bootstrap and founder-controlled. Live work is DIY Vision, Tribe OS documentation, LockLink patent preparation, and one local brain. No custom fine-tune is live. No funding is claimed.\n\nNext action: open Yoga fit and keep a single model.`;
	return `${lead}\n\n${fit.why}\n\nNext action: on the Yoga, keep Ollama and load ${fit.model} if you have about 16 GB of RAM, or ${fit.fallback} if you have about 8 GB. The six desks are modes of that one model.`;
}
//#endregion
export { starters as a, standingReply as i, desks as n, fit as r, dayItems as t };
