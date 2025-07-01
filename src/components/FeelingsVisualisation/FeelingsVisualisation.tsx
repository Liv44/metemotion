import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import useFeelings from "@/usecases/useFeelings";
import type { Feeling } from "@/domain/Feeling.ts";
import { HUMOR_COLORS } from "@/domain/Feeling.ts";

export default function FeelingsVisualisation() {
	const { feelings, isLoading, error } = useFeelings();

	// Handle loading state
	if (isLoading) {
		return (
			<div className="w-full max-w-none md:max-w-4xl lg:max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
				<div className="flex justify-center items-center py-12">
					<div className="text-gray-500">
						Chargement des données...
					</div>
				</div>
			</div>
		);
	}

	// Handle error state
	if (error) {
		return (
			<div className="w-full max-w-none md:max-w-4xl lg:max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
				<div className="flex justify-center items-center py-12">
					<div className="text-red-500">
						Erreur lors du chargement des données
					</div>
				</div>
			</div>
		);
	}

	// Return early if no feelings data
	if (!feelings || feelings.length === 0) {
		return (
			<div className="w-full max-w-none md:max-w-4xl lg:max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
				<div className="flex justify-center items-center py-12">
					<div className="text-gray-500">
						Aucune donnée disponible
					</div>
				</div>
			</div>
		);
	}

	// console.log(feelings);

	// Filter feelings for today only
	const todaysFeelings = feelings.filter(feeling => {
		const today = new Date();
		const feelingDate = new Date(feeling.createdAt);
		return feelingDate.toDateString() === today.toDateString();
	});

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

	// Helper function to get stats
	const getStats = (feelingsData: Feeling[]) => {
		const total = feelingsData.length;
		const today = feelingsData.filter(feeling => {
			const todayDate = new Date();
			const feelingDate = new Date(feeling.createdAt);
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

	const feelingsByMood = getFeelingsByMood(feelings);
	const stats = getStats(feelings);
	const todaysStats = getStats(todaysFeelings);

	// Function to get feelings by day over the last 7 days
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
				const feelingDate = new Date(feeling.createdAt);
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
		// Mobile: full width with padding, Desktop: constrained width
		<div className="w-full max-w-none md:max-w-4xl lg:max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
			<Tabs defaultValue="jour" className="w-full">
				{/* Mobile: stacked tabs, Desktop: horizontal tabs */}
				<TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 h-auto sm:h-10 border-primary border-1 bg-light-purple/10 ">
					<TabsTrigger
						value="jour"
						className="text-sm data-[state=active]:bg-dark-purple data-[state=active]:text-white"
					>
						Aujourd'hui
					</TabsTrigger>
					<TabsTrigger
						value="humeur"
						className="text-sm data-[state=active]:bg-dark-purple data-[state=active]:text-white"
					>
						Par Humeur
					</TabsTrigger>
					<TabsTrigger
						value="tendance"
						className="text-sm data-[state=active]:bg-dark-purple data-[state=active]:text-white"
					>
						Tendances
					</TabsTrigger>
				</TabsList>

				<TabsContent value="jour" className="mt-4 md:mt-6">
					{/* Mobile: single column, Desktop: can use grid if needed */}
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
						<Card className="bg-white border-primary lg:col-span-2">
							<CardHeader className="pb-4">
								<CardTitle className="text-lg md:text-xl">
									Ressentis d'aujourd'hui
								</CardTitle>
								<CardDescription className="text-sm">
									Liste des émotions partagées aujourd'hui (
									{todaysFeelings.length} ressentis)
								</CardDescription>
							</CardHeader>
							<CardContent>
								{todaysFeelings.length > 0 ? (
									<>
										{/* Liste des ressentis d'aujourd'hui */}
										<ul
											className="space-y-3 md:space-y-4"
											role="list"
										>
											{todaysFeelings
												.sort(
													(a, b) =>
														new Date(
															b.createdAt
														).getTime() -
														new Date(
															a.createdAt
														).getTime()
												)
												.map((feeling, index) => (
													<li
														key={
															feeling.id || index
														}
														className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-lg border border-light-purple hover:bg-light-purple/5 transition-colors"
													>
														{/* Couleur de l'humeur */}
														<div
															className="w-4 h-4 rounded-full flex-shrink-0 mt-1"
															style={{
																backgroundColor:
																	HUMOR_COLORS[
																		feeling
																			.humor
																	],
															}}
															aria-hidden="true"
														/>

														<div className="flex-1 min-w-0">
															{/* Humeur et heure */}
															<div className="flex items-center justify-between mb-2">
																<h3
																	className="font-medium text-sm md:text-base truncate"
																	style={{
																		color: HUMOR_COLORS[
																			feeling
																				.humor
																		],
																	}}
																>
																	{
																		feeling.humor
																	}
																</h3>
																<time
																	className="text-xs text-gray-500 whitespace-nowrap ml-2"
																	dateTime={feeling.createdAt.toISOString()}
																>
																	{feeling.createdAt.toLocaleTimeString(
																		"fr-FR",
																		{
																			hour: "2-digit",
																			minute: "2-digit",
																		}
																	)}
																</time>
															</div>

															{/* Keywords */}
															{feeling.keywords &&
																feeling.keywords
																	.length >
																	0 && (
																	<div className="flex flex-wrap gap-1 mb-2">
																		{feeling.keywords.map(
																			(
																				keyword,
																				idx
																			) => (
																				<span
																					key={
																						idx
																					}
																					className="px-2 py-1 bg-gray-100 text-xs rounded-md"
																				>
																					{
																						keyword
																					}
																				</span>
																			)
																		)}
																	</div>
																)}
														</div>
													</li>
												))}
										</ul>

										{/* Résumé de la journée */}
										<div className="mt-4 md:mt-6 p-3 md:p-4 bg-light-purple/10 rounded-lg">
											<div className="text-sm text-foreground">
												{todaysStats.total > 0 ? (
													<div className="space-y-1">
														<p>
															<strong>
																Humeur dominante
																aujourd'hui:
															</strong>{" "}
															{
																todaysStats.mostCommonMood
															}
														</p>
														<p>
															<strong>
																Total
																aujourd'hui:
															</strong>{" "}
															{todaysStats.total}{" "}
															ressenti
															{todaysStats.total >
															1
																? "s"
																: ""}
														</p>
													</div>
												) : (
													<p className="text-gray-400 italic">
														Aucun ressenti
														enregistré aujourd'hui
													</p>
												)}
											</div>
										</div>
									</>
								) : (
									<div className="text-center py-8 md:py-12">
										<div className="text-gray-400 text-sm">
											<p
												className="mb-2 text-2xl"
												aria-hidden="true"
											>
												😊
											</p>
											<p>
												Aucun ressenti enregistré
												aujourd'hui
											</p>
											<p className="text-xs mt-1">
												Commencez à enregistrer vos
												émotions !
											</p>
										</div>
									</div>
								)}
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				<TabsContent value="humeur" className="mt-4 md:mt-6">
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
										<div
											key={moodData.mood}
											className="space-y-2"
										>
											<div className="flex items-center justify-between">
												<div className="flex items-center gap-2 min-w-0 flex-1">
													<div
														className="w-4 h-4 rounded-full flex-shrink-0"
														style={{
															backgroundColor:
																moodData.color,
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
														backgroundColor:
															moodData.color,
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
											<strong>
												Total des ressentis:
											</strong>{" "}
											{stats.total}
										</p>
										<p>
											<strong>Aujourd'hui:</strong>{" "}
											{stats.today} ressenti
											{stats.today > 1 ? "s" : ""}
										</p>
										<p>
											<strong>
												Humeur la plus fréquente:
											</strong>{" "}
											{stats.mostCommonMood}
										</p>
									</div>
								</div>
							</CardContent>
						</Card>
					</div>
				</TabsContent>

				<TabsContent value="tendance" className="mt-4 md:mt-6">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
						<Card className="bg-white border-primary lg:col-span-2">
							<CardHeader className="pb-4">
								<CardTitle className="text-lg md:text-xl">
									Évolution sur 7 jours
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
														{day.dayName}{" "}
														{day.dayDate}
														{day.isToday && (
															<span className="text-primary text-xs ml-1">
																(Aujourd'hui)
															</span>
														)}
													</span>
												</div>
												<span className="text-xs text-gray-500 whitespace-nowrap ml-2">
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
																backgroundColor:
																	day.color,
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
														<span className="text-xs text-gray-500">
															dominant
														</span>
													</div>

													{/* Mini chart showing mood distribution */}
													<div className="flex gap-1 h-2">
														{Object.entries(
															day.moodCounts
														).map(
															([mood, count]) => {
																const percentage =
																	(count /
																		day.count) *
																	100;
																return (
																	<div
																		key={
																			mood
																		}
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
												<div className="text-xs text-gray-400 italic">
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
												feelingsByDay.reduce(
													(max, day) =>
														day.count > max.count
															? day
															: max
												).dayName
											}{" "}
											(
											{
												feelingsByDay.reduce(
													(max, day) =>
														day.count > max.count
															? day
															: max
												).count
											}{" "}
											ressentis)
										</p>
										<p>
											<strong>
												Moyenne quotidienne:
											</strong>{" "}
											{Math.round(
												feelingsByDay.reduce(
													(sum, day) =>
														sum + day.count,
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
				</TabsContent>
			</Tabs>
		</div>
	);
}
