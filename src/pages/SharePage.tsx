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

	return (
		<div className="flex flex-col items-center justify-center h-screen gap-4 p-4">
			<h1 className="text-2xl font-bold">Ajouter l'émotion du jour</h1>
			<p>
				Ajoute ton émotion en la décrivant avec des mots clés, et une
				image ou une couleur.
			</p>
			<form className="flex flex-col gap-4">
				<div className="flex flex-col gap-2">
					<Label htmlFor="humeur">Humeur</Label>
					<Select
						value={humor}
						onValueChange={humor => setHumor(humor as Humor)}
					>
						<SelectTrigger className="w-full">
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
					<Input type="text" placeholder="Mot clé" id="mot-cle" />
				</div>
				<div className="flex flex-row gap-x-4 items-center justify-center display">
					<RadioGroup defaultValue="bleu">
						{colors?.map(color => (
							<div
								key={color.id}
								className="flex flex-row gap-x-2 items-center"
							>
								<RadioGroupItem value={color.id} />
								<ColorBlock color={color.hex || ""} />
								<Label htmlFor={color.id}>{color.name}</Label>
							</div>
						))}
					</RadioGroup>
				</div>
				<Button variant="outline" role="button" type="submit">
					Créer une émotion
				</Button>
			</form>
		</div>
	);
};

export default SharePage;
