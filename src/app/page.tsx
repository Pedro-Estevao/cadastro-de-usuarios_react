import React from "react";
import { ToastContainer } from "react-toastify";

export default function Home({users}) {
	return (
		<>
			{/* <ToastContainer autoClose={3000} position={"top-right"} /> */}
			<header className="cdu-header cdu-container container">
				<div className="cdu-header--content">
					<h1 className="header-content--title">Usuários</h1>
				</div>
			</header>

			<main className="cdu-main cdu-container container">
				

				<div className="cdu-card card">
					<div className="cdu-card--body card-body">
						<table className="cdu-table">
							<thead>
								<tr>
									<th>Nome</th>
									<th>Email</th>
									<th>Telefone</th>
									<th></th>
									<th></th>
								</tr>
							</thead>
							<tbody>
								{users?.map((item: { nome: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | null | undefined; email: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; fone: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined; }, i: React.Key | null | undefined) => (
									<tr key={i}>
										<td>{item.nome}</td>
										<td>{item.email}</td>
										<td>{item.fone}</td>
										<td>{item.nome}</td>
										<td>{item.nome}</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				</div>
			</main>
		</>
	)
}