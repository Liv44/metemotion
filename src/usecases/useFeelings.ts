import { Feelings } from "@/domain/mappers";
import { supabase } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";

const useFeelings = () => {
	const { data: feelings, ...rest } = useQuery({
		queryKey: ["feelings"],
		queryFn: async () => {
			const { data, error } = await supabase.from("feeling").select(`
					id,
					humor,
					keywords,
					color (id, label, hexa)
				`);

			if (error || !data) {
				throw error;
			}
			return data.map(Feelings.toDomain);
		},
	});

	return { feelings, ...rest };
};

export default useFeelings;
