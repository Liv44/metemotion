import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/useDebounce";
import { useEffect, useState } from "react";

const mockedData = [
	{
		type: "thought",
		text: "Je me sens chafouiné aujourd'hui... #pasbien",
	},
	{
		type: "feeling",
		humor: "PEUR",
		keywords: ["#bouh", "#gépeurdelavie", "#ahchuipasbien"],
	},
];

const SearchPage = () => {
	const [search, setSearch] = useState("");

	const debouncedSearch = useDebounce<string>(search, 500);

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
			<div>
				<h1>Recherche</h1>
			</div>
			<div>
				<Input
					placeholder="Recherche"
					value={search}
					onChange={e => setSearch(e.target.value)}
				/>
			</div>
			<ul className="">
				{filteredData.map((item, index) => {
					return (
						<li
							key={index}
							className="flex flex-col items-center gap-2 p-4 rounded-lg border-2 border-black"
						>
							<div className="flex flex-col items-center gap-2">
								<h2 className="text-xl">{item.type}</h2>
								<p className="text-sm">{item.text}</p>
							</div>
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default SearchPage;
