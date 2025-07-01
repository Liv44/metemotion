import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

const DialogAddThought = () => {
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
		alert("You just sent : " + thought);
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
