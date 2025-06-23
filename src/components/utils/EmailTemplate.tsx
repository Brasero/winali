import Head from "next/head";

interface EmailTemplateProps {
	verifyUrl: string;
}
export const ValidateEmailTemplatePreLunch = ({verifyUrl}: EmailTemplateProps) => {
	return (<div style={{fontFamily: "Arial, sans-serif", backgroundColor: "#f9f9fb", padding: "20px"}}>
		<div
			style={{
				maxWidth: "580px",
				margin: "auto",
				backgroundColor: "#ffffff",
				borderRadius: "8px",
				padding: "30px",
				boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)",
			}}
		>
			<h1 style={{color: "#6366f1"}}>Bienvenue dans l’aventure Winali 🥳</h1>

			<p>Bonjour,</p>

			<p>
				Merci d’avoir rejoint <strong>Winali</strong>, la toute première plateforme où vous pouvez
				acheter ou vendre des biens sous forme de tickets 🎟️.
			</p>

			<p>
				En vous inscrivant dès maintenant, vous obtenez le statut <strong>de membre privilégié</strong> :
			</p>

			<ul>
				<li>🔐 Accès anticipé à la plateforme</li>
				<li>🌟 Participation à une campagne VIP réservée aux bêta-testeurs</li>
			</ul>

			<p>
				Avant tout, merci de confirmer votre adresse e-mail pour finaliser votre inscription 👇
			</p>

			<a
				href={verifyUrl}
				style={{
					display: "inline-block",
					marginTop: "20px",
					padding: "12px 24px",
					background: "linear-gradient(to right, #6366f1, #f97066)",
					color: "white",
					textDecoration: "none",
					borderRadius: "6px",
					fontWeight: "bold",
				}}
			>
				✅ Confirmer mon adresse e-mail
			</a>

			<p style={{marginTop: "20px"}}>
				Si vous n’avez pas demandé à vous inscrire, vous pouvez ignorer cet e-mail.
			</p>

			<p style={{fontSize: "12px", color: "#888", marginTop: "30px", textAlign: "center"}}>
				Vous recevez cet e-mail car vous avez demandé à être informé(e) du lancement de Winali. <br/>
				Pas de spam, promis 🤞
			</p>
		</div>
	</div>)
}

export const referralLinkEmail = ({verifyUrl}: EmailTemplateProps) => {
	return (
		<div style={{fontFamily: "Arial, sans-serif", backgroundColor: "#f9f9fb", padding: "20px"}}>
			<div
				style={{
					maxWidth: "580px",
					margin: "auto",
					backgroundColor: "#ffffff",
					borderRadius: "8px",
					padding: "30px",
					boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)",
				}}
			>
				<h1 style={{color: "#6366f1"}}>Bienvenue dans l’aventure Winali 🥳</h1>
				
				<p>Bonjour,</p>
				
				<p>
					Merci d’avoir rejoint <strong>Winali</strong>, la toute première plateforme où vous pouvez
					acheter ou vendre des biens sous forme de tickets 🎟️.
				</p>
				
				<p>
					En vous inscrivant dès maintenant, vous avez obtenu le statut <strong>de membre privilégié</strong> :
				</p>
				
				<ul>
					<li>🔐 Accès anticipé à la plateforme</li>
					<li>🌟 Participation à une campagne VIP réservée aux bêta-testeurs</li>
				</ul>
				
				<p>
					Vous pouvez nous aidez, partagez le lien ci-dessous avec vos amis et gagnez encore plus d&apos;avantage 👇
				</p>
				
				<div
					style={{
						display: "inline-block",
						marginTop: "20px",
						padding: "12px 24px",
						background: "linear-gradient(to right, #6366f1, #f97066)",
						color: "white",
						textDecoration: "none",
						borderRadius: "6px",
						fontWeight: "bold",
					}}
				>
					{verifyUrl}
				</div>
				
				<p style={{fontSize: "12px", color: "#888", marginTop: "30px", textAlign: "center"}}>
					Vous recevez cet e-mail car vous avez demandé à être informé(e) du lancement de Winali. <br/>
					Pas de spam, promis 🤞
				</p>
			</div>
		</div>
	)
}

export const ValidateEmailTemplate = ({verifyUrl}: EmailTemplateProps) => {
	return (
		<html lang="fr">
		<Head>
			<meta charSet="UTF-8"/>
			<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
			<title>Confirmation d’inscription</title>
		</Head>
		<body style={{
			margin: 0,
			padding: 0,
			backgroundColor: '#f4f4f7',
			fontFamily: 'Arial, sans-serif',
			color: '#333333'
		}}>
		<table width="100%" role="presentation" style={{borderSpacing: 0}}>
			<tbody>
			<tr>
				<td align="center">
					<table
						className="email-container"
						role="presentation"
						style={{
							width: '100%',
							maxWidth: '600px',
							margin: 'auto',
							backgroundColor: '#ffffff',
							borderSpacing: 0,
						}}
					>
						{/* En-tête */}
						<tbody>
						<tr>
							<td
								className="header"
								style={{
									backgroundColor: '#4f46e5',
									color: '#ffffff',
									padding: '20px',
									textAlign: 'center',
								}}
							>
								<h1 style={{margin: 0, fontSize: '24px', lineHeight: '32px'}}>Bienvenue sur Winali
									!</h1>
							</td>
						</tr>
						
						{/* Corps de l’email */}
						<tr>
							<td
								className="body-content"
								style={{padding: '30px 20px'}}
							>
								<h2 style={{marginTop: 0, fontSize: '20px', color: '#111827'}}>
									Confirmez votre inscription
								</h2>
								<p style={{fontSize: '16px', lineHeight: '24px', margin: '16px 0', color: '#4b5563'}}>
									Bonjour,
								</p>
								<p style={{fontSize: '16px', lineHeight: '24px', margin: '16px 0', color: '#4b5563'}}>
									Vous avez récemment demandé à vous inscrire sur <strong>Winali</strong>. Pour
									finaliser votre inscription et confirmer votre adresse
									e-mail, cliquez sur le bouton ci-dessous :
								</p>

								<div
									className="button-container"
									style={{textAlign: 'center', margin: '30px 0'}}
								>
									<a
										href={verifyUrl}
										className="btn-confirm"
										style={{
											backgroundColor: '#4f46e5',
											color: '#ffffff',
											textDecoration: 'none',
											padding: '14px 28px',
											borderRadius: '6px',
											fontSize: '16px',
											display: 'inline-block',
										}}
									>
										Confirmer mon adresse e-mail
									</a>
								</div>

								<p style={{fontSize: '16px', lineHeight: '24px', margin: '16px 0', color: '#4b5563'}}>
									Si le bouton ne fonctionne pas, copiez-collez ce lien dans votre navigateur :
								</p>
								<p
									style={{
										fontSize: '16px',
										lineHeight: '24px',
										margin: '16px 0',
										color: '#4b5563',
										wordBreak: 'break-all',
									}}
								>
									<a
										href={verifyUrl}
										style={{color: '#4f46e5', textDecoration: 'none'}}
									>
										{verifyUrl}
									</a>
								</p>

								<p style={{fontSize: '16px', lineHeight: '24px', margin: '16px 0', color: '#4b5563'}}>
									Si vous n’avez pas demandé cette inscription, ignorez simplement cet e-mail. Votre
									compte ne sera pas activé sans confirmation.
								</p>
								<p style={{
									fontSize: '16px',
									lineHeight: '24px',
									margin: '16px 0',
									color: '#4b5563'
								}}>Merci de votre confiance,</p>
								<p style={{
									fontSize: '16px',
									lineHeight: '24px',
									margin: '16px 0',
									color: '#4b5563'
								}}>L’équipe Winali</p>
							</td>
						</tr>

						{/* Pied de page */}
						<tr>
							<td
								className="footer"
								style={{
									backgroundColor: '#f4f4f7',
									color: '#9ca3af',
									fontSize: '12px',
									textAlign: 'center',
									padding: '20px',
								}}
							>
								<p style={{margin: '4px 0'}}>
									Winali &bull; Plateforme de vente par tickets de loterie
								</p>
								<p style={{margin: '4px 0'}}>123 Rue des Chances, 75000 Paris, France</p>
								<p style={{margin: '4px 0'}}>© 2025 Winali. Tous droits réservés.</p>
							</td>
						</tr>
						</tbody>
					</table>
				</td>
			</tr>
			</tbody>
		</table>
		</body>
		</html>
	)
}

export const resetPasswordEmail = ({verifyUrl}: EmailTemplateProps) => {
	return (
		<div style={{fontFamily: "Arial, sans-serif", backgroundColor: "#f9f9fb", padding: "20px"}}>
			<div
				style={{
					maxWidth: "580px",
					margin: "auto",
					backgroundColor: "#ffffff",
					borderRadius: "8px",
					padding: "30px",
					boxShadow: "0 5px 15px rgba(0, 0, 0, 0.05)",
				}}
			>
				<h1 style={{color: "#6366f1"}}>Réinitialisez votre mot de passe 🔒</h1>
				
				<p>Bonjour,</p>
				
				<p>
					Vous avez demandé à réinitialiser votre mot de passe sur <strong>Winali</strong>.
				</p>
				
				<p>
					Pour choisir un nouveau mot de passe, cliquez sur le bouton ci-dessous :
				</p>
				
				<a
					href={verifyUrl}
					style={{
						display: "inline-block",
						marginTop: "20px",
						padding: "12px 24px",
						background: "linear-gradient(to right, #6366f1, #f97066)",
						color: "white",
						textDecoration: "none",
						borderRadius: "6px",
						fontWeight: "bold",
					}}
				>
					Réinitialiser mon mot de passe
				</a>
				
				<p style={{marginTop: "20px"}}>
					Ce lien expirera dans 1 heure pour des raisons de sécurité.
					Si vous n’avez pas fait cette demande, vous pouvez ignorer cet e-mail.
				</p>
				
				<p style={{fontSize: "12px", color: "#888", marginTop: "30px", textAlign: "center"}}>
					© Winali – Plateforme de ventes ludiques par tickets 🎟️
				</p>
			</div>
		</div>
	)
}

type SellerCampaignSuccessEmailProps = {
	sellerName: string;
	campaignTitle: string;
}
export const SellerCampaignSuccessEmail = ({sellerName, campaignTitle}: SellerCampaignSuccessEmailProps) => {
	return (
		<html lang="fr">
			<Head>
				<meta charSet="UTF-8"/>
				<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
				<title>Vente réussie - Winali</title>
			</Head>
			<body style={styles.body}>
			<table width="100%" role="presentation" style={styles.table}>
				<tbody>
				<tr>
					<td align="center">
						<table style={styles.container} role="presentation">
							<tbody>
							<tr>
								<td style={styles.header}>
									<h1 style={styles.headerTitle}>🎉 Votre vente est un succès !</h1>
								</td>
							</tr>
							<tr>
								<td style={styles.bodyContent}>
									<h2 style={styles.title}>Félicitations {sellerName} !</h2>
									<p style={styles.text}>
										Votre campagne <strong>« {campaignTitle} »</strong> a atteint son objectif. Un gagnant a été tiré au sort et la vente est désormais clôturée.
									</p>
									<p style={styles.text}>
										Nous vous contacterons prochainement pour organiser la livraison du bien avec le gagnant. Le paiement vous sera versé une fois la livraison confirmée.
									</p>
									<p style={styles.text}>Merci de votre confiance,</p>
									<p style={styles.text}>L’équipe Winali</p>
								</td>
							</tr>
							<tr>
								<td style={styles.footer}>
									<p>Winali • Plateforme de vente par tickets de loterie</p>
									<p>123 Rue des Chances, 75000 Paris, France</p>
									<p>© 2025 Winali. Tous droits réservés.</p>
								</td>
							</tr>
							</tbody>
						</table>
					</td>
				</tr>
				</tbody>
			</table>
			</body>
		</html>
	)
}


type WinnerCampaignEmailProps = {
	winnerName: string;
	campaignTitle: string;
}
export const WinnerCampaignEmail = ({winnerName, campaignTitle}: WinnerCampaignEmailProps) => {
	return (
		<html lang="fr">
			<Head>
				<meta charSet="UTF-8"/>
				<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
				<title>Félicitations - Vous avez gagné !</title>
			</Head>
			<body style={styles.body}>
			<table width="100%" role="presentation" style={styles.table}>
				<tbody>
				<tr>
					<td align="center">
						<table style={styles.container} role="presentation">
							<tbody>
							<tr>
								<td style={styles.header}>
									<h1 style={styles.headerTitle}>🎊 Vous avez gagné !</h1>
								</td>
							</tr>
							<tr>
								<td style={styles.bodyContent}>
									<h2 style={styles.title}>Bravo {winnerName} !</h2>
									<p style={styles.text}>
										Vous êtes le gagnant de la campagne <strong>« {campaignTitle} »</strong> sur Winali.
									</p>
									<p style={styles.text}>
										Le vendeur va vous contacter pour organiser la livraison du lot. Profitez bien !
									</p>
									<p style={styles.text}>Merci pour votre participation,</p>
									<p style={styles.text}>L’équipe Winali</p>
								</td>
							</tr>
							<tr>
								<td style={styles.footer}>
									<p>Winali • Plateforme de vente par tickets de loterie</p>
									<p>123 Rue des Chances, 75000 Paris, France</p>
									<p>© 2025 Winali. Tous droits réservés.</p>
								</td>
							</tr>
							</tbody>
						</table>
					</td>
				</tr>
				</tbody>
			</table>
			</body>
		</html>
	)
}

type SellerCampaignFailedEmailProps = {
	sellerName: string;
	campaignTitle: string;
}
export const SellerCampaignFailedEmail = ({sellerName, campaignTitle}: SellerCampaignFailedEmailProps) => {
	return (
		<html lang="fr">
			<Head >
				<meta charSet="UTF-8"/>
				<meta name="viewport" content="width=device-width, initial-scale=1.0"/>
				<title>Campagne clôturée sans vente</title>
			</Head>
			<body style={styles.body}>
			<table width="100%" role="presentation" style={styles.table}>
				<tbody>
				<tr>
					<td align="center">
						<table style={styles.container} role="presentation">
							<tbody>
							<tr>
								<td style={styles.header}>
									<h1 style={styles.headerTitle}>📭 Campagne clôturée sans vente</h1>
								</td>
							</tr>
							<tr>
								<td style={styles.bodyContent}>
									<h2 style={styles.title}>Bonjour {sellerName},</h2>
									<p style={styles.text}>
										Votre campagne <strong>« {campaignTitle} »</strong> n’a pas atteint le nombre de tickets minimum requis.
									</p>
									<p style={styles.text}>
										Elle a été automatiquement clôturée sans tirage. Vous pouvez la recréer à tout moment.
									</p>
									<p style={styles.text}>Nous restons à votre disposition,</p>
									<p style={styles.text}>L’équipe Winali</p>
								</td>
							</tr>
							<tr>
								<td style={styles.footer}>
									<p>Winali • Plateforme de vente par tickets de loterie</p>
									<p>123 Rue des Chances, 75000 Paris, France</p>
									<p>© 2025 Winali. Tous droits réservés.</p>
								</td>
							</tr>
							</tbody>
						</table>
					</td>
				</tr>
				</tbody>
			</table>
			</body>
		</html>
	)
}

const styles = {
	body: {
		margin: 0,
		padding: 0,
		backgroundColor: '#f4f4f7',
		fontFamily: 'Arial, sans-serif',
		color: '#333333',
	},
	table: { borderSpacing: 0 },
	container: {
		width: '100%',
		maxWidth: '600px',
		margin: 'auto',
		backgroundColor: '#ffffff',
		borderSpacing: 0,
	},
	header: {
		backgroundColor: '#4f46e5',
		color: '#ffffff',
		padding: '20px',
		textAlign: 'center' as const,
	},
	headerTitle: { margin: 0, fontSize: '24px', lineHeight: '32px' },
	bodyContent: { padding: '30px 20px' },
	title: { marginTop: 0, fontSize: '20px', color: '#111827' },
	text: {
		fontSize: '16px',
		lineHeight: '24px',
		margin: '16px 0',
		color: '#4b5563',
	},
	footer: {
		backgroundColor: '#f4f4f7',
		color: '#9ca3af',
		fontSize: '12px',
		textAlign: 'center' as const,
		padding: '20px',
	},
};