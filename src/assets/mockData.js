

// Enum des humeurs (équivalent TypeScript en JavaScript)
export const HUMOR = {
	JOIE: "Joie",
	TRISTESSE: "Tristesse",
	COLÈRE: "Colère",
	PEUR: "Peur",
	SURPRISE: "Surprise"
};

// Classe Feeling
export class Feeling {
	constructor(id, humor, keywords, imgLink, color, createdAt) {
		this.id = id;
		this.humor = humor;
		this.keywords = keywords;
		this.imgLink = imgLink;
		this.color = color;
		this.createdAt = createdAt;
	}
}

// Mots-clés par humeur
const KEYWORDS_MAP = {
	[HUMOR.JOIE]: ['bonheur', 'sourire', 'célébration', 'rire', 'énergie'],
	[HUMOR.TRISTESSE]: ['larmes', 'mélancolie', 'nostalgie', 'solitude', 'pluie'],
	[HUMOR.COLÈRE]: ['frustration', 'injustice', 'énervement', 'tension', 'révolte'],
	[HUMOR.PEUR]: ['angoisse', 'stress', 'inquiétude', 'incertitude', 'doute'],
	[HUMOR.SURPRISE]: ['étonnement', 'inattendu', 'découverte', 'choc', 'révélation']
};

// Couleurs par humeur
const COLOR_MAP = {
	[HUMOR.JOIE]: '#F59E0B',
	[HUMOR.TRISTESSE]: '#3B82F6',
	[HUMOR.COLÈRE]: '#EF4444',
	[HUMOR.PEUR]: '#6B7280',
	[HUMOR.SURPRISE]: '#F97316'
};

// Images par humeur
const IMAGE_MAP = {
	[HUMOR.JOIE]: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e',
	[HUMOR.TRISTESSE]: 'https://images.unsplash.com/photo-1515263487990-61b07816b24f',
	[HUMOR.COLÈRE]: 'https://images.unsplash.com/photo-1605106715994-18d3fecffb98',
	[HUMOR.PEUR]: 'https://images.unsplash.com/photo-1419242902214-272b3f66ee7a',
	[HUMOR.SURPRISE]: 'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0'
};

// Fonction pour générer une date aléatoire des 7 derniers jours
const generateRandomDate = () => {
	const now = new Date();
	const daysAgo = Math.floor(Math.random() * 7);
	const hoursAgo = Math.floor(Math.random() * 24);

	const date = new Date(now);
	date.setDate(date.getDate() - daysAgo);
	date.setHours(hoursAgo);
	date.setMinutes(Math.floor(Math.random() * 60));

	return date;
};

// Fonction pour sélectionner des mots-clés aléatoires
const getRandomKeywords = (humor) => {
	const keywords = KEYWORDS_MAP[humor];
	const count = Math.floor(Math.random() * 3) + 1; // 1 à 3 mots-clés
	return keywords.sort(() => 0.5 - Math.random()).slice(0, count);
};

// Génération des données mock
export const generateMockFeelings = (count = 50) => {
	const feelings = [];
	const humors = Object.values(HUMOR);

	for (let i = 1; i <= count; i++) {
		const humor = humors[Math.floor(Math.random() * humors.length)];
		const keywords = getRandomKeywords(humor);
		const imgLink = IMAGE_MAP[humor];
		const color = COLOR_MAP[humor];
		const createdAt = generateRandomDate();

		feelings.push(new Feeling(i, humor, keywords, imgLink, color, createdAt));
	}

	return feelings;
};

// Données mock générées
export const mockFeelings = generateMockFeelings(50);

// Fonctions utilitaires pour analyser les données

// Grouper par heure de la journée
export const getFeelingsByTimeOfDay = (feelings) => {
	const timeGroups = {
		'Matin (6h-12h)': [],
		'Après-midi (12h-17h)': [],
		'Soirée (17h-21h)': [],
		'Nuit (21h-6h)': []
	};

	feelings.forEach(feeling => {
		const hour = feeling.createdAt.getHours();
		let timeSlot;

		if (hour >= 6 && hour < 12) timeSlot = 'Matin (6h-12h)';
		else if (hour >= 12 && hour < 17) timeSlot = 'Après-midi (12h-17h)';
		else if (hour >= 17 && hour < 21) timeSlot = 'Soirée (17h-21h)';
		else timeSlot = 'Nuit (21h-6h)';

		timeGroups[timeSlot].push(feeling);
	});

	return Object.entries(timeGroups).map(([time, feelingsInSlot]) => {
		// Trouver l'humeur la plus fréquente dans cette tranche
		const humorCounts = {};
		feelingsInSlot.forEach(f => {
			humorCounts[f.humor] = (humorCounts[f.humor] || 0) + 1;
		});

		const dominantHumor = Object.keys(humorCounts).reduce((a, b) =>
			humorCounts[a] > humorCounts[b] ? a : b, Object.keys(humorCounts)[0]
		);

		return {
			time,
			mood: dominantHumor || HUMOR.JOIE,
			count: feelingsInSlot.length,
			color: COLOR_MAP[dominantHumor] || COLOR_MAP[HUMOR.JOIE]
		};
	});
};

// Grouper par humeur avec statistiques
export const getFeelingsByMood = (feelings) => {
	const moodCounts = {};

	feelings.forEach(feeling => {
		moodCounts[feeling.humor] = (moodCounts[feeling.humor] || 0) + 1;
	});

	const total = feelings.length;

	return Object.entries(moodCounts).map(([mood, count]) => ({
		mood,
		count,
		percentage: Math.round((count / total) * 100),
		color: COLOR_MAP[mood]
	})).sort((a, b) => b.count - a.count);
};

// Obtenir les derniers ressentis par date
export const getRecentFeelings = (feelings, limit = 10) => {
	return feelings
		.sort((a, b) => b.createdAt - a.createdAt)
		.slice(0, limit)
		.map(feeling => ({
			id: feeling.id,
			mood: feeling.humor,
			keywords: feeling.keywords,
			color: feeling.color,
			time: feeling.createdAt.toLocaleTimeString('fr-FR', {
				hour: '2-digit',
				minute: '2-digit'
			}),
			date: feeling.createdAt.toLocaleDateString('fr-FR')
		}));
};

// Recherche dans les données
export const searchFeelings = (feelings, searchTerm) => {
	if (!searchTerm) return feelings;

	const term = searchTerm.toLowerCase();

	return feelings.filter(feeling =>
		feeling.humor.toLowerCase().includes(term) ||
		feeling.keywords.some(keyword => keyword.toLowerCase().includes(term))
	);
};

// Statistiques générales
export const getStats = (feelings) => ({
	total: feelings.length,
	today: feelings.filter(f =>
		f.createdAt.toDateString() === new Date().toDateString()
	).length,
	mostCommonMood: getFeelingsByMood(feelings)[0]?.mood || HUMOR.JOIE,
	averagePerDay: Math.round(feelings.length / 7)
});

// Export des données pour l'utilisation
export default {
	feelings: mockFeelings,
	HUMOR,
	getFeelingsByTimeOfDay,
	getFeelingsByMood,
	getRecentFeelings,
	searchFeelings,
	getStats
};