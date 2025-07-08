import { supabase } from "@/utils/supabase";
import { useQuery } from "@tanstack/react-query";

const useColors = () => {
	const { data: colors, ...rest } = useQuery({
		queryKey: ["colors"],
		queryFn: async () => {
			const { data, error } = await supabase.from("color").select();
			if (error || !data) {
				throw error;
			}
			return data.map(color => ({
				id: color.id,
				name: color.label as string,
				hex: color.hexa as string,
			}));
		},
	});

	return { colors, ...rest };
};

export default useColors;
