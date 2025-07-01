import Home from "@/pages/Home";
import SearchPage from "@/pages/SearchPage";
import SharePage from "@/pages/SharePage";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const Router = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path="/search" element={<SearchPage />}></Route>
				<Route path="/share" element={<SharePage />}></Route>
			</Routes>
		</BrowserRouter>
	);
};

export default Router;
