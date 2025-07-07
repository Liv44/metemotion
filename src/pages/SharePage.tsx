import ColorBlock from "@/components/ColorBlock";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import useCreateFeelings from "@/usecases/useCreateFeelings";
import useColors from "@/usecases/useGetColors";
import { useEffect, useRef, useState } from "react";

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
	const errorRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (error && errorRef.current) {
			errorRef.current.focus();
		}
	}, [error]);

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
		<div className="flex flex-col items-center justify-start py-8 gap-4 p-2 sm:p-4 rounded-lg sm:rounded-xl border py-6 shadow-sm bg-white border-primary w-auto mx-auto w-[90vw] sm:w-[35vw]">
			<h1 className="text-2xl font-bold">Ajouter l'émotion du jour</h1>
			<p>
				Ajoute ton émotion en la décrivant avec des mots clés, et une
				image ou une couleur.
			</p>
			<form
				className="flex flex-col gap-y-6 w-full"
				onSubmit={handleSubmit}
			>
				<div className="flex flex-col gap-4 mx-auto">
					<div className="flex flex-col gap-2">
						<Label htmlFor="select-humor">Humeur</Label>
						<Select
							value={humor}
							onValueChange={humor => setHumor(humor as Humor)}
						>
							<SelectTrigger
								id="select-humor"
								title="Humeur"
								className="w-full"
								aria-required="true"
								aria-controls="value-humor"
							>
								<SelectValue
									placeholder="Humeur"
									id="value-humor"
								/>
							</SelectTrigger>
							<SelectContent id="humor-content">
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
							className="w-full"
							aria-required="true"
						/>
					</div>
					<div className="flex flex-col gap-2 w-full">
						<fieldset className="flex flex-col gap-2 w-full border-0 p-0 m-0">
							<legend className="mb-2">Couleur</legend>
							<RadioGroup
								value={color}
								onValueChange={setColor}
								title="Couleur"
							>
								<div className="flex flex-wrap gap-y-4 sm:gap-x-4 items-center justify-center w-full">
									{colors &&
										colors.map(colorObj => (
											<div
												key={colorObj.id}
												className="flex flex-col items-center"
											>
												<div className="flex flex-row items-center gap-x-2">
													<label
														className="sr-only"
														htmlFor={colorObj.id}
													>
														{colorObj.name}
													</label>
													<RadioGroupItem
														value={colorObj.id}
														id={colorObj.id}
														title={colorObj.name}
													/>
													<ColorBlock
														color={colorObj.hex}
													/>
												</div>
											</div>
										))}
								</div>
							</RadioGroup>
						</fieldset>
					</div>
				</div>
				{(error || createFeeling.error) && (
					<div
						className="text-red-500 text-sm mb-2 text-center w-full"
						role="alert"
						tabIndex={-1}
						ref={errorRef}
					>
						{error ||
							(createFeeling.error
								? "Erreur lors de la création de l'émotion."
								: null)}
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
	);
};

export default SharePage;
