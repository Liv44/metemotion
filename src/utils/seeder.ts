import { supabase } from "@/utils/supabase";
import type { Humor } from "@/domain/Feeling";
import type { Color } from "@/domain/Feeling";

// Keywords mapping by humor
const KEYWORDS_MAP: Record<Humor, string[]> = {
	"JOIE": ["bonheur", "sourire", "célébration", "rire", "énergie"],
	"TRISTESSE": ["larmes", "mélancolie", "nostalgie", "solitude", "pluie"],
	"COLÈRE": ["frustration", "injustice", "énervement", "tension", "révolte"],
	"PEUR": ["angoisse", "stress", "inquiétude", "incertitude", "doute"],
	"SURPRISE": ["étonnement", "inattendu", "découverte", "choc", "révélation"],
};

// All available humors from the enum
const HUMORS: Humor[] = ["JOIE", "TRISTESSE", "COLÈRE", "PEUR", "SURPRISE"];

// Generate random date within the last 7 days
const generateRandomDate = (): Date => {
	const now = new Date();
	const daysAgo = Math.floor(Math.random() * 7);
	const hoursAgo = Math.floor(Math.random() * 24);
	const minutesAgo = Math.floor(Math.random() * 60);

	const date = new Date(now);
	date.setDate(date.getDate() - daysAgo);
	date.setHours(hoursAgo, minutesAgo, 0, 0);

	return date;
};

// Get random keywords for a humor (1-3 keywords)
const getRandomKeywords = (humor: Humor): string[] => {
	const keywords = KEYWORDS_MAP[humor];
	const count = Math.floor(Math.random() * 3) + 1; // 1 to 3 keywords
	return keywords.sort(() => 0.5 - Math.random()).slice(0, count);
};

// Get random color from available colors
const getRandomColor = (colors: Color[]): string => {
	const randomIndex = Math.floor(Math.random() * colors.length);
	return colors[randomIndex].id;
};

// Get random humor
const getRandomHumor = (): Humor => {
	const randomIndex = Math.floor(Math.random() * HUMORS.length);
	return HUMORS[randomIndex];
};

interface SeedFeelingData {
	humor: Humor;
	keywords: string[];
	color: string;
	created_at: string;
}

export const seedDatabase = async (colors: Color[], count: number = 50): Promise<void> => {
	if (!colors || colors.length === 0) {
		throw new Error("No colors available for seeding");
	}

	const seedData: SeedFeelingData[] = [];

	// Generate seed data
	for (let i = 0; i < count; i++) {
		const humor = getRandomHumor();
		const keywords = getRandomKeywords(humor);
		const colorId = getRandomColor(colors);
		const createdAt = generateRandomDate();

		seedData.push({
			humor,
			keywords,
			color: colorId,
			created_at: createdAt.toISOString(),
		});
	}

	// Insert data into database
	const { error } = await supabase
		.from("feeling")
		.insert(seedData);

	if (error) {
		throw new Error(`Failed to seed database: ${error.message}`);
	}

	console.log(`Successfully seeded ${count} feelings into the database`);
};