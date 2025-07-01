import type { Feeling } from "@/domain/Feeling";
import { Feelings } from "@/domain/mappers";
import { supabase } from "@/utils/supabase";
import { useMutation, useQueryClient } from "@tanstack/react-query";

interface CreateFeelingPayload {
	humor: "JOIE" | "TRISTESSE" | "COLÈRE" | "PEUR" | "SURPRISE";
	color?: string;
	imgLink?: string;
	keywords: string[];
}

const useCreateFeelings = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationKey: ["create-feeling"],
		mutationFn: async (payload: CreateFeelingPayload): Promise<Feeling> => {
			const { data, error } = await supabase
				.from("feeling")
				.insert(payload)
				.select();
			if (error || !data) {
				throw error;
			}
			return Feelings.toDomain(data[0]);
		},
		onSuccess: async newFeeling => {
			queryClient.setQueryData(["feelings"], (prev: Feeling[]) =>
				prev ? [...prev, newFeeling] : [newFeeling]
			);
		},
	});
};

export default useCreateFeelings;
