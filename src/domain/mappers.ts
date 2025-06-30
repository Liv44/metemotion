import type { Feeling, Humor } from "./Feeling";
import type { Thought } from "./Thought";

const Thoughts = {
	toDomain: (thought: unknown): Thought => {
		const t = thought as {
			id: string;
			text: string;
			created_at: string;
		};

		return {
			id: t.id,
			text: t.text,
			createdAt: t.created_at,
		};
	},
};

const Feelings = {
	toDomain: (feeling: unknown): Feeling => {
		const f = feeling as {
			id: string;
			color: string;
			created_at: string;
			humor: string;
			imgLink: string;
			keywords: string[];
		};

		return {
			id: f.id,
			color: f.color,
			createdAt: f.created_at,
			humor: f.humor as Humor,
			imgLink: f.imgLink,
			keywords: f.keywords,
		};
	},
};

export { Feelings, Thoughts };
