import { Layout } from "@/components/Layout";
import Home from "@/pages/Home";
import SearchPage from "@/pages/SearchPage";
import SharePage from "@/pages/SharePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Home />}></Route>
					<Route path="/search" element={<SearchPage />}></Route>
					<Route path="/share" element={<SharePage />}></Route>
				</Route>
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
