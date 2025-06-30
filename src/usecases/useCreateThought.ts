import type { Thought } from "@/domain/Thought";
import { Thoughts } from "@/domain/mappers";
import { supabase } from "@/utils/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export interface CreateConversationPayload {
	text: string;
}

const useCreateThought = () => {
	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["create-thought"],
		mutationFn: async (
			payload: CreateConversationPayload = { text: "" }
		): Promise<Thought[]> => {
			const { data, error } = await supabase
				.from("thought")
				.insert({
					text: payload.text,
				})
				.select();
			if (error || !data) {
				throw error;
			}
			return data.map(Thoughts.toDomain);
		},
		onSuccess: async newThought => {
			queryClient.setQueryData(["thoughts"], (prev: Thought[]) =>
				prev ? [...prev, newThought] : [newThought]
			);
		},
	});
};

export default useCreateThought;
