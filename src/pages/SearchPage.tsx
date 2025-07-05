import { SearchCardIcon } from "@/components/SearchCardIcon";
import { SearchInput } from "@/components/SearchInput";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import useDebounce from "@/hooks/useDebounce";
import { useFilteredFeelingsAndThoughts } from "@/usecases/useFilteredFeelingsAndThoughts";
import { QuoteIcon } from "lucide-react";
import { useEffect, useMemo, useState } from "react";

const SearchPage = () => {
	const [search, setSearch] = useState("");

	const debouncedSearch = useDebounce<string>(search, 300);
	const { filteredFeelings, filteredThoughts } =
		useFilteredFeelingsAndThoughts(debouncedSearch);

	useEffect(() => {
		if (!filteredFeelings || !filteredFeelings?.length) {
			return;
		}
	}, [filteredFeelings]);
	console.log(filteredFeelings[0]?.createdAt.toLocaleDateString());

	const filteredAndSortedItems = useMemo(() => {
		if (!filteredFeelings || !filteredThoughts) {
			return [];
		}

		const typedFeelings = filteredFeelings.map(feeling => {
			return {
				...feeling,
				type: "feeling" as const,
			};
		});

		const typedThoughts = filteredThoughts.map(thought => {
			return {
				...thought,
				type: "thought" as const,
			};
		});

		const filteredItems = [...typedFeelings, ...typedThoughts];

		return filteredItems.sort((a, b) => {
			if (a.createdAt > b.createdAt) {
				return -1;
			}
			if (a.createdAt < b.createdAt) {
				return 1;
			}
			return 0;
		});
	}, [filteredFeelings, filteredThoughts]);

	return (
		<div className="flex flex-col items-center justify-center gap-4 p-4">
			<h1 className="text-2xl">Recherche</h1>
			<div>
				<SearchInput
					placeholder="Recherche..."
					value={search}
					onChange={e => setSearch(e.target.value)}
					className="min-w-70"
				/>
			</div>
			{/* described by "tiltre auto a chaque frappe" */}
			{/* nb de résultat => aria-live polite*/}
			<p>
				<span className="font-bold" aria-live="polite">
					{filteredAndSortedItems.length}
				</span>{" "}
				résultats
			</p>
			<ul
				className="flex gap-2 flex-wrap justify-center"
				aria-live="polite"
			>
				{filteredAndSortedItems.map((item, index) => {
					if (item.type === "thought") {
						return (
							<li key={index}>
								<Card className="min-h-52 min-w-52 max-w-52">
									<CardContent className="flex flex-1 flex-col items-center gap-2">
										<QuoteIcon />
										<p className="m-auto text-sm">
											{item.text}
										</p>
									</CardContent>
								</Card>
							</li>
						);
					} else {
						return (
							<li key={index}>
								<Card
									className={`min-h-52 min-w-52 h-52 max-w-52`}
									style={{
										backgroundColor: item?.color?.hex,
									}}
								>
									<CardContent className="flex flex-col h-full justify-around items-center gap-2">
										<SearchCardIcon humor={item.humor} />
										<div className="flex-1 flex flex-col items-center gap-2 justify-between">
											<h3 className="text-lg">
												{item.humor}
											</h3>
											<ul className="flex flex-wrap gap-2">
												{item.keywords?.map(
													(keyword, index) => (
														<li key={index}>
															<Badge
																variant={
																	"secondary"
																}
															>
																{keyword}
															</Badge>
														</li>
													)
												)}
											</ul>
										</div>
									</CardContent>
								</Card>
							</li>
						);
					}
				})}
			</ul>
		</div>
	);
};

export default SearchPage;
