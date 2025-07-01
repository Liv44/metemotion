import type { Humor } from "@/domain/Feeling";
import {
	CloudFogIcon,
	CloudLightningIcon,
	CloudRainIcon,
	RainbowIcon,
	SunIcon,
} from "lucide-react";

export const SearchCardIcon = ({ humor }: { humor: Humor }) => {
	switch (humor) {
		case "JOIE":
			return <SunIcon />;
		case "TRISTESSE":
			return <CloudRainIcon />;
		case "COLÈRE":
			return <CloudLightningIcon />;
		case "PEUR":
			return <CloudFogIcon />;
		case "SURPRISE":
			return <RainbowIcon />;
	}
};
