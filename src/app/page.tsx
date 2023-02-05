"use client"
import React, { useEffect, useCallback } from "react";
import { UserType } from "@/@types/utils";
import axios from "axios";
import { toast } from "react-toastify";

function useForm(propsForm: { initialValues: any; }) {
	const [values, setValues] = React.useState(propsForm.initialValues);

	return {
		values,
		handleChange: (e: { target: { value: any; name: any; }; }) => {
			const value = e.target.value;
			const name = e.target.name;
			setValues({
				...values,
				[name]: value
			});
		},
		clearForm: () => {
			setValues({});
		}
	};
}

function Home() {
	const [users, setUsers] = React.useState<UserType[]>([]);
	const [onEdit, setOnEdit] = React.useState<UserType>();

	const getUsers = useCallback(async () => {
		try {
			const response = await axios.get("http://localhost:3000/api/listUsers");
			console.log(response.data);
			setUsers(response.data);
			toast.success("Usuários carregados com sucesso!");
		} catch (error) {
			toast.error("Erro ao carregar usuários");
		}
	}, []);

	const formCadastro = useForm({
		initialValues: {
			cdu_nome: "",
			cdu_email: "",
			cdu_phone: "",
			cdu_date: ""
		}
	});

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (
			!formCadastro.values.cdu_nome ||
			!formCadastro.values.cdu_email ||
			!formCadastro.values.cdu_phone ||
			!formCadastro.values.cdu_date
		) {
			return toast.warn("Preencha todos os campos!");
		}

		if(onEdit) {
			await axios
				.put("http://localhost:3000/api/updateUser/"+onEdit.ID, {
					nome: formCadastro.values.cdu_nome,
					email: formCadastro.values.cdu_email,
					fone: formCadastro.values.cdu_phone,
					data_nascimento: formCadastro.values.cdu_date
				})
				.then(({ data }) => toast.success(data))
				.catch(({ data }) => toast.error(data));
		} else {
			await axios
				.post("http://localhost:3000/api/addUser", {
					nome: formCadastro.values.cdu_nome,
					email: formCadastro.values.cdu_email,
					fone: formCadastro.values.cdu_phone,
					data_nascimento: formCadastro.values.cdu_date
				})
				.then(({ data }) => toast.success(data))
				.catch(({ data }) => toast.error(data));
		}

		setOnEdit(undefined);
		formCadastro.clearForm();
		getUsers();
	}

	useEffect(() => {
		getUsers();

		if(onEdit) {
			formCadastro.values.cdu_nome = onEdit.NOME;
			formCadastro.values.cdu_email = onEdit.EMAIL;
			formCadastro.values.cdu_phone = onEdit.FONE;
			formCadastro.values.cdu_date = onEdit.DATA_NASCIMENTO;	
		}
	}, []);

	return (
		<>
			<header className="cdu-header cdu-container container">
				<div className="cdu-header--content">
					<h1 className="header-content--title">Usuários</h1>
				</div>
			</header>

			<main className="cdu-main cdu-container container">
				<div className="cdu-card card">
					<div className="cdu-card--body card-body">
						<form name="cdu_form" className="cdu-form" action="#" method="POST" onSubmit={handleSubmit}>
							<div className="cdu-form--group name">
								<label>Nome</label>
								<input 
									type="text" 
									name="cdu_nome" 
									className="cdu-input" 
									required
									value={formCadastro.values.cdu_nome}
									onChange={formCadastro.handleChange}
								/>
							</div>
							<div className="cdu-form--group email">
								<label>E-mail</label>
								<input 
									type="email" 
									name="cdu_email" 
									className="cdu-input" 
									required 
									value={formCadastro.values.cdu_email}
									onChange={formCadastro.handleChange}
								/>
							</div>
							<div className="cdu-form--group phone">
								<label>Telefone</label>
								<input 
									type="text" 
									name="cdu_phone" 
									className="cdu-input" 
									required 
									value={formCadastro.values.cdu_phone}
									onChange={formCadastro.handleChange}
								/>
							</div>
							<div className="cdu-form--group date">
								<label>Data de Nascimento</label>
								<input 
									type="date" 
									name="cdu_date" 
									className="cdu-input" 
									required 
									value={formCadastro.values.cdu_date}
									onChange={formCadastro.handleChange}
								/>
							</div>
							<div className="cdu-form--group submit">
								<button type="submit" name="cdu_submit" className="cdu-submit">Salvar</button>
							</div>
						</form>
					</div>
				</div>

				<div className="cdu-card card">
					<div className="cdu-card--body card-body">
						<table className="cdu-table">
							<thead>
								<tr>
									<th>ID</th>
									<th>Nome</th>
									<th>Email</th>
									<th>Telefone</th>
									<th>Data de Nascimento</th>
								</tr>
							</thead>
							<tbody>
								{users.map((item, i) => (
									<tr key={i}>
										<td>{item.ID}</td>
										<td>{item.NOME}</td>
										<td>{item.EMAIL}</td>
										<td>{item.FONE}</td>
										<td>{item.DATA_NASCIMENTO}</td>
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

export default Home;