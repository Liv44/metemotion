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
			createdAt: new Date(t.created_at),
		};
	},
};

const Feelings = {
	toDomain: (feeling: unknown): Feeling => {
		const f = feeling as {
			id: string;
			color: {
				id: string;
				label: string;
				hexa: string;
			};
			created_at: string;
			humor: string;
			keywords: string[];
		};

		return {
			id: f.id,
			color: {
				id: f.color.id,
				name: f.color.label,
				hex: f.color.hexa,
			},
			createdAt: new Date(f.created_at),
			humor: f.humor as Humor,
			keywords: f.keywords,
		};
	},
};

export { Feelings, Thoughts };
