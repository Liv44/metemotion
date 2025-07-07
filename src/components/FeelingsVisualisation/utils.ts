import type { Feeling } from "@/domain/Feeling";

// Helper function to get stats
const getStats = (feelingsData: Feeling[]) => {
	const total = feelingsData.length;
	const today = feelingsData.filter(feeling => {
		const todayDate = new Date();
		const feelingDate = feeling.createdAt;
		return feelingDate.toDateString() === todayDate.toDateString();
	}).length;

	const moodCounts: Record<string, number> = {};
	feelingsData.forEach(feeling => {
		moodCounts[feeling.humor] = (moodCounts[feeling.humor] || 0) + 1;
	});

	const mostCommonMood =
		Object.keys(moodCounts).length > 0
			? Object.keys(moodCounts).reduce((a, b) =>
					moodCounts[a] > moodCounts[b] ? a : b
				)
			: "Aucune";

	return { total, today, mostCommonMood };
};

export { getStats };
