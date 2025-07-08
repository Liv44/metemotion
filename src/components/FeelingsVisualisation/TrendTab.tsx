import { HUMOR_COLORS, type Feeling } from "@/domain/Feeling";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";

const TrendTabs = ({ feelings }: { feelings: Feeling[] }) => {
	const getFeelingsByDay = (feelingsData: Feeling[]) => {
		const days = [];
		const today = new Date();

		// Create an array of last 7 days
		for (let i = 6; i >= 0; i--) {
			const date = new Date(today);
			date.setDate(date.getDate() - i);
			date.setHours(0, 0, 0, 0);

			const dayName = date.toLocaleDateString("fr-FR", {
				weekday: "short",
			});
			const dayDate = date.toLocaleDateString("fr-FR", {
				day: "2-digit",
				month: "2-digit",
			});

			// Filter feelings for this specific day
			const dayFeelings = feelingsData.filter(feeling => {
				const feelingDate = feeling.createdAt;
				feelingDate.setHours(0, 0, 0, 0);
				return feelingDate.getTime() === date.getTime();
			});

			// Count moods for this day
			const moodCounts: Record<string, number> = {};
			dayFeelings.forEach(feeling => {
				moodCounts[feeling.humor] =
					(moodCounts[feeling.humor] || 0) + 1;
			});

			// Find a dominant mood
			const dominantMood =
				Object.keys(moodCounts).length > 0
					? Object.keys(moodCounts).reduce((a, b) =>
							moodCounts[a] > moodCounts[b] ? a : b
						)
					: null;

			days.push({
				dayName,
				dayDate,
				fullDate: date,
				feelings: dayFeelings,
				count: dayFeelings.length,
				dominantMood,
				color:
					(dominantMood &&
						HUMOR_COLORS[
							dominantMood as keyof typeof HUMOR_COLORS
						]) ||
					"#E5E7EB",
				moodCounts,
				isToday: i === 0,
			});
		}

		return days;
	};

	const feelingsByDay = getFeelingsByDay(feelings);
	return (
		<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
			<Card className="bg-white border-primary lg:col-span-2">
				<CardHeader className="pb-4">
					<CardTitle className="text-lg md:text-xl">
						<h2 className="text-lg md:text-xl">
							Évolution sur 7 jours
						</h2>
					</CardTitle>
					<CardDescription className="text-sm">
						Tendances émotionnelles jour par jour
					</CardDescription>
				</CardHeader>
				<CardContent>
					{/* Mobile: single column, Desktop: 2 columns for day cards */}
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-3 md:gap-4">
						{feelingsByDay.map(day => (
							<div
								key={day.dayDate}
								className={`p-3 md:p-4 rounded-lg border ${
									day.isToday
										? "border-primary bg-primary/5"
										: "border-light-purple"
								}`}
							>
								<div className="flex items-center justify-between mb-2">
									<div className="flex items-center gap-2 min-w-0 flex-1">
										<span className="font-medium text-sm md:text-base truncate">
											{day.dayName} {day.dayDate}
											{day.isToday && (
												<span className="text-primary text-xs ml-1">
													(Aujourd'hui)
												</span>
											)}
										</span>
									</div>
									<span className="text-xs text-gray-800 whitespace-nowrap ml-2">
										{day.count} ressenti
										{day.count > 1 ? "s" : ""}
									</span>
								</div>

								{day.count > 0 ? (
									<div className="space-y-2">
										<div className="flex items-center gap-2">
											<div
												className="w-3 h-3 rounded-full flex-shrink-0"
												style={{
													backgroundColor: day.color,
												}}
											/>
											<span
												className="text-sm font-medium truncate"
												style={{
													color: day.color,
												}}
											>
												{day.dominantMood}
											</span>
											<span className="text-xs text-gray-800">
												dominant
											</span>
										</div>

										{/* Mini chart showing mood distribution */}
										<div className="flex gap-1 h-2">
											{Object.entries(day.moodCounts).map(
												([mood, count]) => {
													const percentage =
														(count / day.count) *
														100;
													return (
														<div
															key={mood}
															className="rounded-sm"
															style={{
																backgroundColor:
																	HUMOR_COLORS?.[
																		mood as keyof typeof HUMOR_COLORS
																	] ??
																	"#E5E7EB",
																width: `${percentage}%`,
															}}
															title={`${mood}: ${count}`}
														/>
													);
												}
											)}
										</div>
									</div>
								) : (
									<div className="text-xs text-gray-800 italic">
										Aucun ressenti enregistré
									</div>
								)}
							</div>
						))}
					</div>

					<div className="mt-4 md:mt-6 p-3 md:p-4 bg-light-purple/10 rounded-lg">
						<div className="text-sm text-foreground space-y-1">
							<p>
								<strong>Jour le plus actif:</strong>{" "}
								{
									feelingsByDay.reduce((max, day) =>
										day.count > max.count ? day : max
									).dayName
								}{" "}
								(
								{
									feelingsByDay.reduce((max, day) =>
										day.count > max.count ? day : max
									).count
								}{" "}
								ressentis)
							</p>
							<p>
								<strong>Moyenne quotidienne:</strong>{" "}
								{Math.round(
									feelingsByDay.reduce(
										(sum, day) => sum + day.count,
										0
									) / 7
								)}{" "}
								ressentis
							</p>
						</div>
					</div>
				</CardContent>
			</Card>
		</div>
	);
};

export default TrendTabs;
