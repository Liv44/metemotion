import { HUMOR_COLORS, type Feeling } from "@/domain/Feeling";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { getStats } from "./utils";

const TodaysTab = ({ feelings }: { feelings: Feeling[] }) => {
	// Filter feelings for today only
	const todaysFeelings = feelings.filter(feeling => {
		const today = new Date();
		const feelingDate = feeling.createdAt;
		return feelingDate.toDateString() === today.toDateString();
	});
	const todaysStats = getStats(todaysFeelings);

	return (
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
							<ul className="space-y-3 md:space-y-4" role="list">
								{todaysFeelings
									.sort(
										(a, b) =>
											b.createdAt.getTime() -
											a.createdAt.getTime()
									)
									.map((feeling, index) => (
										<li
											key={feeling.id || index}
											className="flex items-start gap-3 md:gap-4 p-3 md:p-4 rounded-lg border border-light-purple hover:bg-light-purple/5 transition-colors"
										>
											<div
												className="w-4 h-4 rounded-full flex-shrink-0 mt-1"
												style={{
													backgroundColor:
														HUMOR_COLORS[
															feeling.humor
														],
												}}
												aria-hidden="true"
											/>

											<div className="flex-1 min-w-0">
												<div className="flex items-center justify-between mb-2">
													<h3
														className="font-medium text-sm md:text-base truncate"
														style={{
															color: HUMOR_COLORS[
																feeling.humor
															],
														}}
													>
														{feeling.humor}
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

												{feeling.keywords &&
													feeling.keywords.length >
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

							{/* Today resume */}
							<div className="mt-4 md:mt-6 p-3 md:p-4 bg-light-purple/10 rounded-lg">
								<div className="text-sm text-foreground">
									{todaysStats.total > 0 ? (
										<div className="space-y-1">
											<p>
												<strong>
													Humeur dominante
													aujourd'hui:
												</strong>{" "}
												{todaysStats.mostCommonMood}
											</p>
											<p>
												<strong>
													Total aujourd'hui:
												</strong>{" "}
												{todaysStats.total} ressenti
												{todaysStats.total > 1
													? "s"
													: ""}
											</p>
										</div>
									) : (
										<p className="text-gray-400 italic">
											Aucun ressenti enregistré
											aujourd'hui
										</p>
									)}
								</div>
							</div>
						</>
					) : (
						<div className="text-center py-8 md:py-12">
							<div className="text-gray-400 text-sm">
								<p className="mb-2 text-2xl" aria-hidden="true">
									😊
								</p>
								<p>Aucun ressenti enregistré aujourd'hui</p>
								<p className="text-xs mt-1">
									Commencez à enregistrer vos émotions !
								</p>
							</div>
						</div>
					)}
				</CardContent>
			</Card>
		</div>
	);
};

export default TodaysTab;
