import React from "react";
import { Navbar } from "@/composables/navbar/navbar";
import { Footer } from "@/composables/footer/footer";

interface LayoutProps {
	children: React.ReactNode;
	className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className = "" }) => {
	return (
		<div id="top" className="min-h-screen flex flex-col">
			{/* Header with Navbar */}
			<Navbar />

			{/* Main content */}
			<main
				id="main-content"
				className={`flex-1 ${className}`}
				role="main"
				tabIndex={-1}
			>
				{children}
			</main>

			{/* Footer */}
			<Footer />
		</div>
	);
};

export default Layout;
