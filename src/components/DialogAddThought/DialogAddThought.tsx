import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

const DialogAddThought = () => {
	return (
		<>
			<Dialog>
				<DialogTrigger>Open Dialog</DialogTrigger>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Ajouter une pensée</DialogTitle>
						<DialogDescription>Quelle est ta pensée du jour ?</DialogDescription>
						<Textarea/>
					</DialogHeader>
					<DialogFooter>
						<Button type="submit">Envoyer</Button>
					</DialogFooter>
				</DialogContent>
			</Dialog>
		</>
	)
};

export default DialogAddThought;
