export type Humor = "JOIE" | "TRISTESSE" | "COLÈRE" | "PEUR" | "SURPRISE";

export interface Feeling {
	id: string;
	color?: string;
	createdAt: string;
	humor: Humor;
	imgLink?: string;
	keywords: string[];
}
