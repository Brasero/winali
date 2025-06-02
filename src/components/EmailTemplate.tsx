
interface EmailTemplateProps {
	verifyUrl
}
export const ValidateEmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({verifyUrl}) => {
	return (<div style={{
		fontFamily: "sans-serif",
		lineHeight: 1.5,
		color: "#333"
	}}>
		<h1>Bienvenue sur PartyChance ! </h1>
		<p>
			Nous vous remercions de vous intéresser à nous, pour confirmer votre adresse e-mail, cliquez sur ce lien :
			<a href={verifyUrl} style={{display: "block"}}>Confirmer mon inscription</a>
		</p>
		<p>Si vous n'avez pas demandé cette e-mail, ignorez-le simplement.</p>
	</div>)
}