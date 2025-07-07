import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import useCreateThought from "@/usecases/useCreateThought";
import { Plus } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

const DialogAddThought = () => {
	const { mutate: createThought } = useCreateThought();

	const [thought, setThought] = useState("");
	const [isButtonDisabled, setIsButtonDisabled] = useState(true);

	const handleFormChange = (
		event: React.ChangeEvent<HTMLTextAreaElement>
	) => {
		setThought(event.target.value);
		if (event.target.value != "") {
			setIsButtonDisabled(false);
		} else {
			setIsButtonDisabled(true);
		}
	};

	function submitForm() {
		setThought("");
		createThought({ text: thought });
	}

	return (
		<>
			<Dialog>
				<DialogTrigger asChild>
					<Button
						className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-200 focus:ring-2 focus:ring-primary focus:ring-offset-2"
						size="sm"
						aria-label="Ouvrir le formulaire pour ajouter une nouvelle pensée"
					>
						<Plus className="w-4 h-4 mr-2" aria-hidden="true" />
						Ajouter une pensée
					</Button>
				</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Ajouter une pensée</DialogTitle>
						<DialogDescription>
							Quelle est ta pensée du jour ?
						</DialogDescription>
						<Textarea value={thought} onChange={handleFormChange} />
					</DialogHeader>
					<DialogFooter>
						<form onSubmit={submitForm}>
							<Button
								type="submit"
								disabled={isButtonDisabled}
								aria-disabled={isButtonDisabled}
							>
								Envoyer
							</Button>
						</form>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	);
};

export default DialogAddThought;
