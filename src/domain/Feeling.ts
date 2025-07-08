export type Humor = "JOIE" | "TRISTESSE" | "COLÈRE" | "PEUR" | "SURPRISE";

export const HUMOR_COLORS: Record<Humor, string> = {
	JOIE: "#D800A5",
	TRISTESSE: "#06708A",
	COLÈRE: "#CC3A3A",
	PEUR: "#7C3AED",
	SURPRISE: "#0A6D4B",
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
