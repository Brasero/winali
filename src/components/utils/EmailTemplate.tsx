import Head from "next/head";

interface EmailTemplateProps {
	verifyUrl: string;
}
export const ValidateEmailTemplatePreLunch = ({verifyUrl}: EmailTemplateProps) => {
	return (<div style={{
		fontFamily: "sans-serif",
		lineHeight: 1.5,
		color: "#333"
	}}>
		<h1>Bienvenue sur PartyChance ! </h1>
		<p>
			Nous vous remercions de vous intéresser à nous, pour confirmer votre adresse e-mail, cliquez sur ce lien :<br/>
			<a href={verifyUrl} style={{display: "block"}}>Confirmer mon inscription</a>
		</p>
		<p>Si vous n&apos;avez pas demandé cette e-mail, ignorez-le simplement.</p>
	</div>)
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
								<h1 style={{margin: 0, fontSize: '24px', lineHeight: '32px'}}>Bienvenue sur PartiChance
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
									Vous avez récemment demandé à vous inscrire sur <strong>PartiChance</strong>. Pour
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
								}}>L’équipe PartiChance</p>
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
									PartiChance &bull; Plateforme de vente par tickets de loterie
								</p>
								<p style={{margin: '4px 0'}}>123 Rue des Chances, 75000 Paris, France</p>
								<p style={{margin: '4px 0'}}>© 2025 PartiChance. Tous droits réservés.</p>
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