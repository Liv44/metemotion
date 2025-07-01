import { SearchInput } from "@/components/SearchInput";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import useDebounce from "@/hooks/useDebounce";
import { QuoteIcon, SmileIcon } from "lucide-react";
import { useEffect, useState } from "react";

const mockedData = [
	{
		type: "thought",
		createdAt: new Date(),
		text: "Je me sens chafouiné aujourd'hui... #pasbien",
	},
	{
		type: "feeling",
		createdAt: new Date(),
		humor: "PEUR",
		color: {
			name: "blue",
			value: "#8EE5FF",
		},
		keywords: ["bouh", "gépeurdelavie", "ahchuipasbien"],
	},
	{
		type: "thought",
		createdAt: new Date(),
		text: "Je suis giga bien en vrai !",
	},
	{
		type: "feeling",
		createdAt: new Date(),
		humor: "JOYEUX",
		color: {
			name: "red",
			value: "#FFBB7C",
		},
		keywords: ["ouiii", "laviecestcool"],
	},
	{
		type: "thought",
		createdAt: new Date(),
		text: "Je me sens chafouiné aujourd'hui... #pasbien",
	},
	{
		type: "feeling",
		createdAt: new Date(),
		humor: "PEUR",
		color: {
			name: "blue",
			value: "#8EE5FF",
		},
		keywords: ["bouh", "gépeurdelavie", "ahchuipasbien"],
	},
	{
		type: "thought",
		createdAt: new Date(),
		text: "Je suis giga bien en vrai !",
	},
	{
		type: "feeling",
		createdAt: new Date(),
		humor: "JOYEUX",
		color: {
			name: "red",
			value: "#FFBB7C",
		},
		keywords: ["ouiii", "laviecestcool"],
	},
];

const SearchPage = () => {
	const [search, setSearch] = useState("");

	const debouncedSearch = useDebounce<string>(search, 300);

	useEffect(() => {
		console.log(debouncedSearch);
	}, [debouncedSearch]);

	const filteredData = mockedData.filter(item => {
		return (
			item?.text
				?.toLowerCase()
				.includes(debouncedSearch?.toLowerCase()) ||
			item?.type
				?.toLowerCase()
				.includes(debouncedSearch?.toLowerCase()) ||
			item?.humor
				?.toLowerCase()
				.includes(debouncedSearch?.toLowerCase()) ||
			item?.keywords?.some(keyword =>
				keyword.toLowerCase().includes(debouncedSearch?.toLowerCase())
			)
		);
	});

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
			<ul
				className="flex gap-2 flex-wrap justify-center"
				aria-live="polite"
			>
				{filteredData.map((item, index) => {
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
										backgroundColor: item?.color?.value,
									}}
								>
									<CardContent className="flex flex-col h-full justify-around items-center gap-2">
										<SmileIcon />
										<div className="flex-1 flex flex-col items-center gap-2 justify-between">
											<h3 className="text-lg">
												{item.humor}
											</h3>
											<div className="flex flex-wrap gap-2">
												{item.keywords?.map(
													(keyword, index) => (
														<Badge
															key={index}
															variant={
																"secondary"
															}
														>
															{keyword}
														</Badge>
													)
												)}
											</div>
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
