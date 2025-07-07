import { HUMOR_COLORS, type Feeling } from "@/domain/Feeling";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { getStats } from "./utils";

const MoodTab = ({ feelings }: { feelings: Feeling[] }) => {
	// Helper function to get feelings by mood
	const getFeelingsByMood = (feelingsData: Feeling[]) => {
		const moodCounts: Record<string, { count: number; color: string }> = {};

		feelingsData.forEach(feeling => {
			if (!moodCounts[feeling.humor]) {
				moodCounts[feeling.humor] = {
					count: 0,
					color: HUMOR_COLORS[feeling.humor],
				};
			}
			moodCounts[feeling.humor].count++;
		});

		const total = feelingsData.length;

		return Object.entries(moodCounts)
			.map(([mood, data]) => ({
				mood,
				count: data.count,
				color: data.color,
				percentage: Math.round((data.count / total) * 100),
			}))
			.sort((a, b) => b.count - a.count);
	};

	const feelingsByMood = getFeelingsByMood(feelings);
	const stats = getStats(feelings);

	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
			<Card className="bg-white border-primary lg:col-span-2">
				<CardHeader className="pb-4">
					<CardTitle className="text-lg md:text-xl">
						Tendances des humeurs
					</CardTitle>
					<CardDescription className="text-sm">
						Répartition des émotions sur 7 jours
					</CardDescription>
				</CardHeader>
				<CardContent>
					{/* Mobile: single column, Desktop: 2 columns for mood bars */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-4 md:gap-6">
						{feelingsByMood.map(moodData => (
							<div key={moodData.mood} className="space-y-2">
								<div className="flex items-center justify-between">
									<div className="flex items-center gap-2 min-w-0 flex-1">
										<div
											className="w-4 h-4 rounded-full flex-shrink-0"
											style={{
												backgroundColor: moodData.color,
											}}
										/>
										<span className="font-medium text-sm md:text-base truncate">
											{moodData.mood}
										</span>
									</div>
									<div className="text-xs md:text-sm text-gray-600 whitespace-nowrap ml-2">
										{moodData.count} fois (
										{moodData.percentage}%)
									</div>
								</div>

								<div className="w-full bg-gray-200 rounded-full h-2 md:h-3">
									<div
										className="h-2 md:h-3 rounded-full transition-all duration-300"
										style={{
											backgroundColor: moodData.color,
											width: `${moodData.percentage}%`,
										}}
									/>
								</div>
							</div>
						))}
					</div>

					<div className="mt-4 md:mt-6 p-3 md:p-4 bg-light-purple/10 rounded-lg">
						<div className="text-sm text-foreground space-y-1">
							<p>
								<strong>Total des ressentis:</strong>{" "}
								{stats.total}
							</p>
							<p>
								<strong>Aujourd'hui:</strong> {stats.today}{" "}
								ressenti
								{stats.today > 1 ? "s" : ""}
							</p>
							<p>
								<strong>Humeur la plus fréquente:</strong>{" "}
								{stats.mostCommonMood}
							</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default MoodTab;
