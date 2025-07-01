// src/composables/navbar/Navbar.tsx
import React, { useState, useRef, useEffect, useId } from "react";
import { Button } from "@/components/ui/button";
import {
	NavigationMenu,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
} from "@/components/ui/navigation-menu";
import {
	Menu,
	X,
	Home,
	Heart,
	Smile,
	Search,
	Plus,
	LogIn,
	User,
} from "lucide-react";

interface NavItem {
	label: string;
	href: string;
	icon: React.ComponentType<{ className?: string }>;
	description?: string;
}

const SkipLink: React.FC = () => (
	<a
		href="#main-content"
		className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50 transition-all duration-200 focus:ring-2 focus:ring-offset-2 focus:ring-primary"
	>
		Aller au contenu principal
	</a>
);

export const Navbar: React.FC = () => {
	const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
	const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

	const mobileButtonRef = useRef<HTMLButtonElement>(null);
	const firstMobileItemRef = useRef<HTMLAnchorElement>(null);

	const mobileMenuId = useId();
	const liveRegionId = useId();

	const currentPath = window.location.pathname;

	const isActivePage = (href: string): boolean => {
		if (href === "/" && currentPath === "/") return true;
		return href !== "/" && currentPath.startsWith(href);
	};

	const navItems: NavItem[] = [
		{
			label: "Accueil",
			href: "/",
			icon: Home,
			description: "Aller à la page d'accueil",
		},
		{
			label: "Rechercher",
			href: "/search",
			icon: Search,
			description: "Aller à la page de recherche",
		},
		{
			label: "Partage d'humeur",
			href: "/share",
			icon: Smile,
			description: "Aller à la page de partage d'humeur",
		},
	];

	// Gestion des touches clavier
	const handleKeyDown = (event: React.KeyboardEvent): void => {
		if (event.key === "Escape" && mobileMenuOpen) {
			closeMobileMenu();
		}
	};

	const toggleMobileMenu = (): void => {
		setMobileMenuOpen(!mobileMenuOpen);
	};

	const closeMobileMenu = (): void => {
		setMobileMenuOpen(false);
		// Remettre le focus sur le bouton menu après fermeture
		setTimeout(() => {
			mobileButtonRef.current?.focus();
		}, 100);
	};

	// Focus automatique sur le premier élément du menu mobile
	useEffect(() => {
		if (mobileMenuOpen && firstMobileItemRef.current) {
			firstMobileItemRef.current.focus();
		}
	}, [mobileMenuOpen]);

	// Placeholder pour le modal - à remplacer par votre collègue
	const handleAddThought = (): void => {
		console.log("Ouvrir modal ajouter pensée - À implémenter");
	};

	const DesktopNavigation: React.FC = () => (
		<nav
			role="navigation"
			aria-label="Navigation principale"
			className="hidden md:flex w-full justify-center"
		>
			<NavigationMenu>
				<NavigationMenuList className="flex items-center gap-6">
					{navItems.map(item => {
						const isActive = isActivePage(item.href);
						return (
							<NavigationMenuItem key={item.href}>
								<NavigationMenuLink
									href={item.href}
									className={`
										text-sm font-medium transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-3 py-2
										${
											isActive
												? "text-primary font-semibold"
												: "text-foreground/90 hover:text-primary"
										}
									`}
									aria-current={isActive ? "page" : undefined}
									aria-label={item.description}
								>
									{item.label}
								</NavigationMenuLink>
							</NavigationMenuItem>
						);
					})}
				</NavigationMenuList>
			</NavigationMenu>
		</nav>
	);

	// Boutons à droite
	const RightButtons: React.FC = () => (
		<div className="hidden md:flex items-center gap-3">
			{/* Bouton Ajouter pensée - placeholder pour votre collègue */}
			<Button
				className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-md hover:shadow-lg transition-all duration-200 focus:ring-2 focus:ring-primary focus:ring-offset-2"
				size="sm"
				onClick={handleAddThought}
				aria-label="Ouvrir le formulaire pour ajouter une nouvelle pensée"
			>
				<Plus className="w-4 h-4 mr-2" aria-hidden="true" />
				Ajouter une pensée
			</Button>

			{/* Bouton connexion/profil */}
			{isLoggedIn ? (
				<Button
					variant="outline"
					size="sm"
					className="flex items-center gap-2 focus:ring-2 focus:ring-primary focus:ring-offset-2"
					onClick={() => setIsLoggedIn(false)}
					aria-label="Accéder au profil utilisateur"
				>
					<User className="w-4 h-4" aria-hidden="true" />
					Profil
				</Button>
			) : (
				<Button
					variant="outline"
					size="sm"
					className="flex items-center gap-2 hover:bg-accent hover:text-accent-foreground transition-all duration-200 focus:ring-2 focus:ring-primary focus:ring-offset-2"
					onClick={() => setIsLoggedIn(true)}
					aria-label="Se connecter à votre compte"
				>
					<LogIn className="w-4 h-4" aria-hidden="true" />
					Se connecter
				</Button>
			)}
		</div>
	);

	// Navigation mobile
	const MobileNavigation: React.FC = () => (
		<>
			<Button
				ref={mobileButtonRef}
				variant="ghost"
				size="icon"
				className="md:hidden focus:ring-2 focus:ring-primary focus:ring-offset-2"
				onClick={toggleMobileMenu}
				aria-expanded={mobileMenuOpen}
				aria-controls={mobileMenuId}
				aria-label={
					mobileMenuOpen
						? "Fermer le menu de navigation"
						: "Ouvrir le menu de navigation"
				}
			>
				{mobileMenuOpen ? (
					<X className="h-6 w-6" aria-hidden="true" />
				) : (
					<Menu className="h-6 w-6" aria-hidden="true" />
				)}
			</Button>

			{mobileMenuOpen && (
				<nav
					id={mobileMenuId}
					role="navigation"
					aria-label="Navigation mobile"
					className="md:hidden absolute top-full left-0 right-0 border-t bg-background/98 backdrop-blur supports-[backdrop-filter]:bg-background/95 z-40 shadow-lg"
					onKeyDown={handleKeyDown}
				>
					<div className="w-full px-4 md:px-6 py-6 space-y-4">
						{/* Navigation links */}
						{navItems.map((item, index) => {
							const IconComponent = item.icon;
							const isActive = isActivePage(item.href);
							return (
								<a
									key={item.href}
									ref={
										index === 0 ? firstMobileItemRef : null
									}
									href={item.href}
									className={`
										flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2
										${
											isActive
												? "bg-primary text-primary-foreground shadow-md"
												: "hover:bg-primary/10 hover:text-primary hover:translate-x-1"
										}
									`}
									onClick={closeMobileMenu}
									aria-label={item.description}
									aria-current={isActive ? "page" : undefined}
								>
									<IconComponent
										className={`mr-3 h-5 w-5 transition-transform duration-200 ${
											isActive
												? "scale-110"
												: "group-hover:scale-110"
										}`}
										aria-hidden="true"
									/>
									{item.label}

									{/* Indicateur pour mobile */}
									{isActive && (
										<span
											className="ml-auto w-2 h-2 bg-primary-foreground rounded-full"
											aria-hidden="true"
										></span>
									)}
								</a>
							);
						})}

						{/* Séparateur */}
						<div
							className="border-t my-4"
							role="separator"
							aria-hidden="true"
						></div>

						{/* Bouton Ajouter pensée mobile - placeholder */}
						<Button
							className="w-full bg-primary hover:bg-primary/90 text-primary-foreground justify-start gap-3 focus:ring-2 focus:ring-primary focus:ring-offset-2"
							onClick={() => {
								handleAddThought();
								closeMobileMenu();
							}}
							aria-label="Ouvrir le formulaire pour ajouter une nouvelle pensée"
						>
							<Plus className="w-4 h-4" aria-hidden="true" />
							Ajouter une pensée
						</Button>

						{/* Bouton connexion mobile */}
						<Button
							variant="outline"
							className="w-full justify-start gap-3 hover:bg-accent hover:text-accent-foreground focus:ring-2 focus:ring-primary focus:ring-offset-2"
							onClick={() => {
								setIsLoggedIn(!isLoggedIn);
								closeMobileMenu();
							}}
							aria-label={
								isLoggedIn
									? "Accéder au profil utilisateur"
									: "Se connecter à votre compte"
							}
						>
							{isLoggedIn ? (
								<>
									<User
										className="w-4 h-4"
										aria-hidden="true"
									/>
									Profil
								</>
							) : (
								<>
									<LogIn
										className="w-4 h-4"
										aria-hidden="true"
									/>
									Se connecter
								</>
							)}
						</Button>
					</div>
				</nav>
			)}
		</>
	);

	return (
		<header
			role="banner"
			className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm"
		>
			<SkipLink />

			{/* Live region pour les annonces aux lecteurs d'écran */}
			<div
				id={liveRegionId}
				aria-live="polite"
				aria-atomic="true"
				className="sr-only"
			>
				{mobileMenuOpen ? "Menu de navigation ouvert" : ""}
			</div>

			<div className="w-full px-4 md:px-6 flex h-16 items-center gap-4">
				{/* Logo à gauche - taille fixe */}
				<div className="flex items-center space-x-2 flex-shrink-0">
					<a
						href="/"
						className="flex items-center space-x-2 hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded"
						aria-label="Retour à l'accueil de MetÉmotion"
					>
						<Heart
							className="h-6 w-6 text-primary"
							aria-hidden="true"
						/>
						<h1 className="text-xl font-bold text-primary">
							MetÉmotion
						</h1>
					</a>
				</div>

				{/* Navigation - PREND TOUT L'ESPACE DISPONIBLE */}
				<div className="flex-1 flex justify-center">
					<DesktopNavigation />
				</div>

				{/* Boutons à droite - taille fixe */}
				<div className="flex items-center gap-3 flex-shrink-0">
					<RightButtons />
					<MobileNavigation />
				</div>
			</div>
		</header>
	);
};
