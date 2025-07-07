import React from "react";
import { Navbar } from "@/composables/navbar/navbar";
import { Footer } from "@/composables/footer/footer";
import { Outlet } from "react-router-dom";

interface LayoutProps {
	className?: string;
}

const Layout: React.FC<LayoutProps> = ({ className = "" }) => {
	return (
		<div id="top" className="min-h-screen flex flex-col">
			{/* Header with Navbar */}
			<Navbar />

			{/* Main content */}
			<main
				id="main-content"
				className={`flex-1 py-3 ${className} `}
				role="main"
				tabIndex={-1}
			>
				<Outlet />
			</main>

			{/* Footer */}
			<Footer />
		</div>
	);
};

export default Layout;
