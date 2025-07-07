import FeelingsVisualisation from "@/components/FeelingsVisualisation/FeelingsVisualisation.tsx";
import Layout from "@/components/Layout/Layout";

const Home = () => {
	return (
		<div>
			<Layout className="bg-white">
				<FeelingsVisualisation />
			</Layout>
		</div>
	);
};

export default Home;
