import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from "@/components/ui/tabs"
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card"
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
import mockData from '../../assets/mockData.js'

export default function FeelingsVisualisation() {
	// Filter feelings for today only
	const todaysFeelings = mockData.feelings.filter(feeling => {
		const today = new Date();
		const feelingDate = new Date(feeling.createdAt);
		return feelingDate.toDateString() === today.toDateString();
	});

	const feelingsByTimeOfDay = mockData.getFeelingsByTimeOfDay(todaysFeelings);
	const feelingsByMood = mockData.getFeelingsByMood(mockData.feelings);
	const stats = mockData.getStats(mockData.feelings);
	const todaysStats = mockData.getStats(todaysFeelings);

	// Function to get feelings by day over the last 7 days
	const getFeelingsByDay = (feelings) => {
		const days = [];
		const today = new Date();
		
		// Create array of last 7 days
		for (let i = 6; i >= 0; i--) {
			const date = new Date(today);
			date.setDate(date.getDate() - i);
			date.setHours(0, 0, 0, 0);
			
			const dayName = date.toLocaleDateString('fr-FR', { weekday: 'short' });
			const dayDate = date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit' });
			
			// Filter feelings for this specific day
			const dayFeelings = feelings.filter(feeling => {
				const feelingDate = new Date(feeling.createdAt);
				feelingDate.setHours(0, 0, 0, 0);
				return feelingDate.getTime() === date.getTime();
			});
			
			// Count moods for this day
			const moodCounts = {};
			dayFeelings.forEach(feeling => {
				moodCounts[feeling.humor] = (moodCounts[feeling.humor] || 0) + 1;
			});
			
			// Find dominant mood
			const dominantMood = Object.keys(moodCounts).length > 0 
				? Object.keys(moodCounts).reduce((a, b) => moodCounts[a] > moodCounts[b] ? a : b)
				: null;
			
			days.push({
				dayName,
				dayDate,
				fullDate: date,
				feelings: dayFeelings,
				count: dayFeelings.length,
				dominantMood,
				color: dominantMood ? mockData.feelings.find(f => f.humor === dominantMood)?.color : '#E5E7EB',
				moodCounts,
				isToday: i === 0
			});
		}
		
		return days;
	};

	const feelingsByDay = getFeelingsByDay(mockData.feelings);

	return (
		<div className="flex w-full max-w-sm flex-col gap-6">
			<Tabs defaultValue="jour">
				<TabsList className="grid w-full grid-cols-3">
					<TabsTrigger value="jour">Aujourd'hui</TabsTrigger>
					<TabsTrigger value="humeur">Par Humeur</TabsTrigger>
					<TabsTrigger value="tendance">Tendances</TabsTrigger>
				</TabsList>
				
				<TabsContent value="jour">
					<Card className="bg-white border-primary">
						<CardHeader>
							<CardTitle>Météo intérieure d'aujourd'hui</CardTitle>
							<CardDescription>
								Les émotions par tranches horaires ({todaysStats.total} ressentis aujourd'hui)
							</CardDescription>
						</CardHeader>
						<CardContent className="grid gap-4">
							{feelingsByTimeOfDay.length > 0 ? (
								<>
									{feelingsByTimeOfDay.map((timeSlot) => (
										<div 
											key={timeSlot.time}
											className="flex items-center justify-between p-3 rounded-lg border"
											style={{ borderLeft: `4px solid ${timeSlot.color}` }}
										>
											<div className="flex flex-col">
												<span className="font-medium text-sm">{timeSlot.time}</span>
												{timeSlot.count > 0 ? (
													<span 
														className="text-xs font-semibold"
														style={{ color: timeSlot.color }}
													>
														{timeSlot.mood}
													</span>
												) : (
													<span className="text-xs text-gray-400 italic">
														Aucun ressenti
													</span>
												)}
											</div>
											<div className="flex items-center gap-2">
												{timeSlot.count > 0 && (
													<div 
														className="w-3 h-3 rounded-full"
														style={{ backgroundColor: timeSlot.color }}
													/>
												)}
												<span className="text-sm text-gray-600">
													{timeSlot.count} ressenti{timeSlot.count > 1 ? 's' : ''}
												</span>
											</div>
										</div>
									))}
									
									<div className="mt-4 p-3 bg-gray-50 rounded-lg">
										<div className="text-sm text-gray-600">
											{todaysStats.total > 0 ? (
												<>
													<p><strong>Humeur dominante aujourd'hui:</strong> {todaysStats.mostCommonMood}</p>
													<p><strong>Total aujourd'hui:</strong> {todaysStats.total} ressenti{todaysStats.total > 1 ? 's' : ''}</p>
												</>
											) : (
												<p className="text-gray-400 italic">Aucun ressenti enregistré aujourd'hui</p>
											)}
										</div>
									</div>
								</>
							) : (
								<div className="text-center py-8">
									<div className="text-gray-400 text-sm">
										<p className="mb-2">😊</p>
										<p>Aucun ressenti enregistré aujourd'hui</p>
										<p className="text-xs mt-1">Commencez à enregistrer vos émotions !</p>
									</div>
								</div>
							)}
						</CardContent>
					</Card>
				</TabsContent>
				
				<TabsContent value="humeur">
					<Card className="bg-white border-primary">
						<CardHeader>
							<CardTitle>Tendances des humeurs</CardTitle>
							<CardDescription>
								Répartition des émotions sur 7 jours
							</CardDescription>
						</CardHeader>
						<CardContent className="grid gap-4">
							{feelingsByMood.map((moodData) => (
								<div key={moodData.mood} className="space-y-2">
									<div className="flex items-center justify-between">
										<div className="flex items-center gap-2">
											<div 
												className="w-4 h-4 rounded-full"
												style={{ backgroundColor: moodData.color }}
											/>
											<span className="font-medium">{moodData.mood}</span>
										</div>
										<div className="text-sm text-gray-600">
											{moodData.count} fois ({moodData.percentage}%)
										</div>
									</div>
									
									<div className="w-full bg-gray-200 rounded-full h-2">
										<div 
											className="h-2 rounded-full transition-all duration-300"
											style={{ 
												backgroundColor: moodData.color,
												width: `${moodData.percentage}%`
											}}
										/>
									</div>
								</div>
							))}
							
							<div className="mt-4 p-3 bg-gray-50 rounded-lg">
								<div className="text-sm text-gray-600 space-y-1">
									<p><strong>Total des ressentis:</strong> {stats.total}</p>
									<p><strong>Aujourd'hui:</strong> {stats.today} ressenti{stats.today > 1 ? 's' : ''}</p>
									<p><strong>Humeur la plus fréquente:</strong> {stats.mostCommonMood}</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>

				<TabsContent value="tendance">
					<Card className="bg-white border-primary">
						<CardHeader>
							<CardTitle>Évolution sur 7 jours</CardTitle>
							<CardDescription>
								Tendances émotionnelles jour par jour
							</CardDescription>
						</CardHeader>
						<CardContent className="grid gap-3">
							{feelingsByDay.map((day) => (
								<div 
									key={day.dayDate}
									className={`p-3 rounded-lg border ${day.isToday ? 'border-primary bg-primary/5' : 'border-gray-200'}`}
								>
									<div className="flex items-center justify-between mb-2">
										<div className="flex items-center gap-2">
											<span className="font-medium text-sm">
												{day.dayName} {day.dayDate}
												{day.isToday && <span className="text-primary text-xs ml-1">(Aujourd'hui)</span>}
											</span>
										</div>
										<span className="text-xs text-gray-500">
											{day.count} ressenti{day.count > 1 ? 's' : ''}
										</span>
									</div>
									
									{day.count > 0 ? (
										<div className="space-y-2">
											<div className="flex items-center gap-2">
												<div 
													className="w-3 h-3 rounded-full"
													style={{ backgroundColor: day.color }}
												/>
												<span 
													className="text-sm font-medium"
													style={{ color: day.color }}
												>
													{day.dominantMood}
												</span>
												<span className="text-xs text-gray-500">dominant</span>
											</div>
											
											{/* Mini chart showing mood distribution */}
											<div className="flex gap-1 h-2">
												{Object.entries(day.moodCounts).map(([mood, count]) => {
													const feeling = mockData.feelings.find(f => f.humor === mood);
													const percentage = (count / day.count) * 100;
													return (
														<div
															key={mood}
															className="rounded-sm"
															style={{
																backgroundColor: feeling?.color || '#E5E7EB',
																width: `${percentage}%`
															}}
															title={`${mood}: ${count}`}
														/>
													);
												})}
											</div>
										</div>
									) : (
										<div className="text-xs text-gray-400 italic">
											Aucun ressenti enregistré
										</div>
									)}
								</div>
							))}
							
							<div className="mt-4 p-3 bg-gray-50 rounded-lg">
								<div className="text-sm text-gray-600 space-y-1">
									<p><strong>Jour le plus actif:</strong> {
										feelingsByDay.reduce((max, day) => 
											day.count > max.count ? day : max
										).dayName
									} ({feelingsByDay.reduce((max, day) => 
										day.count > max.count ? day : max
									).count} ressentis)</p>
									<p><strong>Moyenne quotidienne:</strong> {
										Math.round(feelingsByDay.reduce((sum, day) => sum + day.count, 0) / 7)
									} ressentis</p>
								</div>
							</div>
						</CardContent>
					</Card>
				</TabsContent>
			</Tabs>
		</div>
	)
}