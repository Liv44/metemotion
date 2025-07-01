export type Humor = "JOIE" | "TRISTESSE" | "COLÈRE" | "PEUR" | "SURPRISE";

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
