import { useMemo } from "react";
import useFeelings from "./useFeelings";
import useThoughts from "./useThoughts";

export const useFilteredFeelingsAndThoughts = (search: string) => {
	const { thoughts } = useThoughts();
	const { feelings } = useFeelings();

	const filteredThoughts = useMemo(() => {
		if (!thoughts) {
			return [];
		}
		return thoughts.filter(thought =>
			thought?.text?.toLowerCase().includes(search?.toLowerCase())
		);
	}, [thoughts, search]);

	const filteredFeelings = useMemo(() => {
		if (!feelings) {
			return [];
		}
		return feelings.filter(
			feeling =>
				feeling?.humor?.toLowerCase().includes(search?.toLowerCase()) ||
				feeling?.keywords?.some(keyword =>
					keyword.toLowerCase().includes(search?.toLowerCase())
				)
		);
	}, [feelings, search]);

	// const filteredItems = useMemo(() => {
	//     if (!filteredFeelings || !filteredThoughts) {
	//         return [];
	//     }
	//     return [...filteredFeelings, ...filteredThoughts];
	// }, [filteredFeelings, filteredThoughts]);

	return { filteredFeelings, filteredThoughts };
};
