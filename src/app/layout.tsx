"use client"
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
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
				<ToastContainer autoClose={3000} position={"top-right"} />
			</body>
		</html>
	)
}