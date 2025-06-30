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
import { useState } from "react";

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
				<Button variant="outline" role="button" type="submit">
					Click me
				</Button>
			</form>
		</div>
	);
};

export default SharePage;
