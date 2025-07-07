import ColorBlock from "@/components/ColorBlock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useState } from "react";
import useColors from "@/usecases/useGetColors";
import Layout from "@/components/Layout/Layout";
import useCreateFeelings from "@/usecases/useCreateFeelings";

type Humor = "JOIE" | "TRISTESSE" | "COLÈRE" | "PEUR" | "SURPRISE";

const SharePage = () => {
	const humorList: Humor[] = [
		"JOIE",
		"TRISTESSE",
		"COLÈRE",
		"PEUR",
		"SURPRISE",
	];
	const [humor, setHumor] = useState<Humor | undefined>(undefined);
	const { colors } = useColors();
	const [keyword, setKeyword] = useState("");
	const [color, setColor] = useState<string | undefined>(undefined);
	const createFeeling = useCreateFeelings();
	const [error, setError] = useState<string | null>(null);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (!humor || !keyword || !color) {
			setError("Veuillez remplir tous les champs.");
			return;
		}
		setError(null);
		const keywordsArray = keyword
			.split(";")
			.map(k => k.trim())
			.filter(k => k.length > 0);
		createFeeling.mutate({
			humor,
			keywords: keywordsArray,
			color,
		});
	};

	return (
		<Layout className="bg-white">
			<div className="flex flex-col items-center justify-start py-8 gap-4 p-2 sm:p-4 rounded-lg sm:rounded-xl border py-6 shadow-sm bg-white border-primary w-auto mx-auto max-w-[90vw] sm:max-w-[35vw]">
				<h1 className="text-2xl font-bold">
					Ajouter l'émotion du jour
				</h1>
				<p>
					Ajoute ton émotion en la décrivant avec des mots clés, et
					une image ou une couleur.
				</p>
				<form
					className="flex flex-col gap-y-6 w-auto"
					onSubmit={handleSubmit}
				>
					<div className="flex flex-col gap-4 mx-auto">
						<div className="flex flex-col gap-2">
							<Label htmlFor="humeur">Humeur</Label>
							<Select
								value={humor}
								onValueChange={humor =>
									setHumor(humor as Humor)
								}
							>
								<SelectTrigger className="w-auto min-w-[120px] max-w-full">
									<SelectValue placeholder="Humeur" />
								</SelectTrigger>
								<SelectContent>
									{humorList.map(humor => (
										<SelectItem key={humor} value={humor}>
											{humor}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div className="flex flex-col gap-2">
							<Label htmlFor="mot-cle">Mot clé</Label>
							<Input
								type="text"
								placeholder="Mot clé (séparés par ;)"
								id="mot-cle"
								value={keyword}
								onChange={e => setKeyword(e.target.value)}
								className="w-auto min-w-[120px] max-w-full"
							/>
						</div>
					</div>
					<div className="flex flex-col gap-2 items-center w-full">
						<Label>Couleur</Label>
						<RadioGroup value={color} onValueChange={setColor}>
							<div className="flex flex-col sm:flex-row gap-y-4 sm:gap-x-4 items-center justify-center w-full">
								{colors?.map(colorObj => (
									<div
										key={colorObj.id}
										className="flex flex-col items-center"
									>
										<div className="flex flex-row items-center gap-x-2">
											<RadioGroupItem
												value={colorObj.id}
												id={colorObj.id}
											/>
											<ColorBlock
												color={colorObj.hex || ""}
											/>
										</div>
										<Label htmlFor={colorObj.id}>
											{colorObj.name}
										</Label>
									</div>
								))}
							</div>
						</RadioGroup>
					</div>
					{error && (
						<div className="text-red-500 text-sm mb-2 text-center w-full">
							{error}
						</div>
					)}
					<div className="flex justify-center w-full">
						<Button
							variant="outline"
							role="button"
							type="submit"
							className="w-full max-w-sm"
						>
							Créer une émotion
						</Button>
					</div>
				</form>
			</div>
		</Layout>
	);
};

export default SharePage;
