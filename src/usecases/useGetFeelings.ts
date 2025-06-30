import { Feelings } from "@/domain/mappers";
import { supabase } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";

const useGetFeelings = () => {
	return useQuery({
		queryKey: ["feelings"],
		queryFn: async () => {
			const { data, error } = await supabase.from("feeling").select();
			if (error || !data) {
				throw error;
			}
			return data.map(Feelings.toDomain);
		},
	});
};

export default useGetFeelings;
