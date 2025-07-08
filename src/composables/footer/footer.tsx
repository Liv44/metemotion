import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { BookOpen, Heart, Info, Mail, Shield } from "lucide-react";
import React, { useId } from "react";

interface FooterLink {
	label: string;
	href: string;
	icon?: React.ComponentType<{ className?: string }>;
	description?: string;
	external?: boolean;
}

interface FooterSection {
	title: string;
	links: FooterLink[];
}

export const Footer: React.FC = () => {
	const currentYear = new Date().getFullYear();
	const mainFooterId = useId();
	const brandingId = useId();

	const footerSections: FooterSection[] = [
		{
			title: "À propos",
			links: [
				{
					label: "Notre mission",
					href: "/about",
					icon: Info,
					description: "Découvrir notre mission et nos valeurs",
				},
				{
					label: "Blog",
					href: "/blog",
					icon: BookOpen,
					description: "Accéder au blog",
				},
			],
		},
		{
			title: "Légal",
			links: [
				{
					label: "Politique de confidentialité",
					href: "/privacy",
					icon: Shield,
					description: "Consulter notre politique de confidentialité",
				},
				{
					label: "Conditions générales d'utilisation",
					href: "/terms",
					description: "Lire nos conditions générales d'utilisation",
				},
				{
					label: "Mentions légales",
					href: "/legal",
					description: "Consulter nos mentions légales obligatoires",
				},
			],
		},
	];

	const socialLinks: FooterLink[] = [
		{
			label: "Contacter par email",
			href: "mailto:contact@metemotion.fr",
			icon: Mail,
			description:
				"Nous contacter par email à l'adresse contact@metemotion.fr",
			external: true,
		},
	];

	const FooterSection: React.FC<{ section: FooterSection }> = ({
		section,
	}) => {
		const sectionId = useId();

		return (
			<section className="space-y-4" aria-labelledby={sectionId}>
				<h3
					id={sectionId}
					className="text-sm font-semibold text-foreground/90 uppercase tracking-wider"
				>
					{section.title}
				</h3>
				<nav
					role="navigation"
					aria-labelledby={sectionId}
					aria-label={`Navigation ${section.title.toLowerCase()}`}
				>
					<ul className="space-y-3" role="list">
						{section.links.map(link => {
							const IconComponent = link.icon;
							const isExternal =
								link.external ||
								link.href.startsWith("http") ||
								link.href.startsWith("mailto:");

							return (
								<li key={link.href}>
									<a
										href={link.href}
										className="inline-flex items-center text-sm text-muted-background hover:text-foreground transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded px-1 py-1"
										aria-label={
											link.description || link.label
										}
										{...(isExternal && {
											target: "_blank",
											rel: "noopener noreferrer",
										})}
									>
										{IconComponent && (
											<IconComponent
												className="mr-2 h-4 w-4 flex-shrink-0"
												aria-hidden="true"
											/>
										)}
										<span>{link.label}</span>
										{isExternal && (
											<span className="sr-only">
												{link.href.startsWith("mailto:")
													? " (ouvre votre client email)"
													: " (ouvre dans un nouvel onglet)"}
											</span>
										)}
									</a>
								</li>
							);
						})}
					</ul>
				</nav>
			</section>
		);
	};

	return (
		<footer
			role="contentinfo"
			className="bg-card border-t border-border bg-surface text-surface-foreground supports-[backdrop-filter]:bg-surface/60 shadow-sm"
			aria-labelledby={mainFooterId}
		>
			<div className="w-full px-4 md:px-6 py-12">
				{/* Invisible header for screen readers */}
				<h2 id={mainFooterId} className="sr-only">
					Pied de page de Métémotion
				</h2>

				{/* Main content of the footer */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
					{/* Branding and description */}
					<section
						className="space-y-4 lg:col-span-2"
						aria-labelledby={brandingId}
					>
						<h3 id={brandingId} className="sr-only">
							À propos de Métémotion
						</h3>

						<div className="flex items-center space-x-2">
							<Heart
								className="h-6 w-6 text-primary"
								aria-hidden="true"
							/>
							<span className="text-xl font-bold text-primary">
								Métémotion
							</span>
						</div>

						<p className="text-sm text-surface-muted max-w-md leading-relaxed">
							Votre compagnon pour explorer et comprendre vos
							émotions. Créez et partagez votre journal émotionnel
							personnalisé et développez votre bien-être mental.
						</p>

						{/* Contact */}
						<div className="pt-2">
							<h4 className="text-sm font-semibold text-foreground/90 uppercase tracking-wider mb-3">
								Contact
							</h4>
							<div className="flex flex-wrap gap-2">
								{socialLinks.map(link => {
									const IconComponent = link.icon;
									const isExternal =
										link.external ||
										link.href.startsWith("http") ||
										link.href.startsWith("mailto:");

									return (
										<Button
											key={link.href}
											variant="outline"
											size="sm"
											asChild
											className="hover:bg-primary hover:text-primary-foreground transition-colors duration-200 focus:ring-2 focus:ring-primary focus:ring-offset-2"
										>
											<a
												href={link.href}
												aria-label={
													link.description ||
													link.label
												}
												{...(isExternal && {
													target: "_blank",
													rel: "noopener noreferrer",
												})}
											>
												{IconComponent && (
													<IconComponent
														className="mr-2 h-4 w-4"
														aria-hidden="true"
													/>
												)}
												{link.label}
												{isExternal && (
													<span className="sr-only">
														{link.href.startsWith(
															"mailto:"
														)
															? " (ouvre votre client email)"
															: " (ouvre dans un nouvel onglet)"}
													</span>
												)}
											</a>
										</Button>
									);
								})}
							</div>
						</div>
					</section>

					{/* Links section */}
					{footerSections.map(section => (
						<FooterSection key={section.title} section={section} />
					))}
				</div>

				{/* Séparator */}
				<Separator
					className="my-8"
					role="separator"
					aria-label="Séparation entre le contenu principal et les informations légales"
				/>

				{/* Copyright and mentions */}
				<div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-background">
					<p role="contentinfo">
						<span
							aria-label={`Copyright ${currentYear} Métémotion`}
						>
							© {currentYear} Métémotion.
						</span>{" "}
						Tous droits réservés.
					</p>
					<p className="text-center sm:text-right">
						Fait avec{" "}
						<Heart
							className="inline h-4 w-4 text-primary mx-1"
							aria-label="amour"
							role="img"
						/>{" "}
						pour votre bien-être
					</p>
				</div>
			</div>

			{/* Skip link pour to go on top */}
			<a
				href="#top"
				className="sr-only focus:not-sr-only focus:fixed focus:bottom-4 focus:right-4 bg-primary text-primary-foreground px-4 py-2 rounded-md z-50 transition-all duration-200 focus:ring-2 focus:ring-primary focus:ring-offset-2 shadow-lg"
				aria-label="Retour en haut de la page"
			>
				↑ Retour en haut
			</a>
		</footer>
	);
};
