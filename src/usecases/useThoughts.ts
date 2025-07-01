import { Thoughts } from "@/domain/mappers";
import { supabase } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";

const useThoughts = () => {
	const { data: thoughts, ...rest } = useQuery({
		queryKey: ["thoughts"],
		queryFn: async () => {
			const { data, error } = await supabase.from("thought").select();
			if (error || !data) {
				throw error;
			}
			return data.map(Thoughts.toDomain);
		},
	});

	return { thoughts, ...rest };
};

export default useThoughts;
