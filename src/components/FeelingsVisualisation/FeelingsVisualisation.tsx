import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import useFeelings from "@/usecases/useFeelings";
import MoodTab from "./MoodTabs";
import TodaysTab from "./TodayTab";
import TrendTabs from "./TrendTab";

export default function FeelingsVisualisation() {
	const { feelings, isLoading, error } = useFeelings();

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

	return (
		// Mobile: full width with padding, Desktop: constrained width
		<div className="w-full max-w-none md:max-w-4xl lg:max-w-6xl mx-auto px-4 md:px-6 lg:px-8">
			<Tabs defaultValue="jour" className="w-full">
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
					<TodaysTab feelings={feelings} />
				</TabsContent>

				<TabsContent value="humeur" className="mt-4 md:mt-6">
					<MoodTab feelings={feelings} />
				</TabsContent>

				<TabsContent value="tendance" className="mt-4 md:mt-6">
					<TrendTabs feelings={feelings} />
				</TabsContent>
			</Tabs>
		</div>
	);
}
