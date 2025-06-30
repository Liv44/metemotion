import type { Feeling } from "@/domain/Feeling";
import { Feelings } from "@/domain/mappers";
import { supabase } from "@/utils/supabase";
import { useMutation } from "@tanstack/react-query";

interface CreateFeelingPayload {
	humor: "JOIE" | "TRISTESSE" | "COLÈRE" | "PEUR" | "SURPRISE";
	color?: string;
	imgLink?: string;
	keywords: string[];
}

const useCreateFeelings = () => {
	return useMutation({
		mutationKey: ["create-feeling"],
		mutationFn: async (
			payload: CreateFeelingPayload
		): Promise<Feeling[]> => {
			const { data, error } = await supabase
				.from("feeling")
				.insert(payload)
				.select();
			if (error || !data) {
				throw error;
			}
			return data.map(Feelings.toDomain);
		},
	});
};

export default useCreateFeelings;
