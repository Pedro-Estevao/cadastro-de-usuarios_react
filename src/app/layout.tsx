import '../styles/globals.css';
import '../styles/global.scss';

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	return (
		<html lang="pt-BR">
			<head />
			<body>
				{children}
			</body>
		</html>
	)
}