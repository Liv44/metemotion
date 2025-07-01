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
import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

const DialogAddThought = () => {
	const { mutate: createThought } = useCreateThought();

	const [thought, setThought] = useState("");
	const [isButtonDisabled, setIsButtonDisabled] = useState(true);

	const handleFormChange = (event: any) => {
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
					<Button>Ajouter une pensée</Button>
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
