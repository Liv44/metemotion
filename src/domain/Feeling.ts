export type Humor = "JOIE" | "TRISTESSE" | "COLÈRE" | "PEUR" | "SURPRISE";

export const HUMOR_COLORS: Record<Humor, string> = {
	JOIE: "#F59E0B", // Amber
	TRISTESSE: "#0891B2", // Cyan/Teal - cooler, more distinct
	COLÈRE: "#EF4444", // Red
	PEUR: "#7C3AED", // Purple - mysterious and anxious
	SURPRISE: "#10B981", // Emerald
};

export const getHumorColor = (humor: Humor): string => {
	return HUMOR_COLORS[humor];
};

export interface Color {
	id: string;
	name: string;
	hex: string;
}

export interface Feeling {
	id: string;
	color: Color;
	createdAt: Date;
	humor: Humor;
	keywords: string[];
}
