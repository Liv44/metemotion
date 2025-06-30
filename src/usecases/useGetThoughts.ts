import { Thoughts } from "@/domain/mappers";
import { supabase } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";

const useGetThoughts = () => {
	return useQuery({
		queryKey: ["thoughts"],
		queryFn: async () => {
			const { data, error } = await supabase.from("thought").select();
			if (error || !data) {
				throw error;
			}
			return data.map(Thoughts.toDomain);
		},
	});
};

export default useGetThoughts;
