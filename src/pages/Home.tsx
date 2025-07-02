import Layout from "@/components/Layout/Layout";
import FeelingsVisualisation from "@/components/FeelingsVisualisation/FeelingsVisualisation.tsx";

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
