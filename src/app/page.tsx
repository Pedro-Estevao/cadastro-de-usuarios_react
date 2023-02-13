"use client"
import React, { useEffect, useCallback } from "react";
import { UserType } from "@/@types/utils";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faPlus, faCheck, faCancel } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import PerfectScrollbar from 'react-perfect-scrollbar';
import 'react-toastify/dist/ReactToastify.css';
import 'react-perfect-scrollbar/dist/css/styles.css';
import DeleteModal from "@/components/ModalDelete";

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
		handleEdit: (item: UserType) => {
			setValues({
				...values,
				cdu_uid: item.ID,
				cdu_nome: item.NOME,
				cdu_email: item.EMAIL,
				cdu_phone: item.FONE,
				cdu_date: new Date(item.DATA_NASCIMENTO).toISOString().substring(0, 10)
			});
		},
		clearForm: () => {
			setValues({});
		}
	};
}

function Home() {
	const [users, setUsers] = React.useState<UserType[]>([]);
	const [onEdit, setOnEdit] = React.useState<boolean>(false);
	const [deleteModal, setDeleteModal] = React.useState(false);
	const [userDelete, setUserDelete] = React.useState(Number);

	const getUsers = useCallback(async () => {
		try {
			const response = await axios.get("http://localhost:3000/api/listUsers");
			setUsers(response.data);
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

		if(onEdit)
		{
			await axios.put("http://localhost:3000/api/updateUser", {
				uid: formCadastro.values.cdu_uid,
				nome: formCadastro.values.cdu_nome,
				email: formCadastro.values.cdu_email,
				fone: formCadastro.values.cdu_phone,
				data_nascimento: formCadastro.values.cdu_date
			})
			.then(({ data }) => {
				toast.success(data.message);
				setOnEdit(false);
				formCadastro.clearForm();
				getUsers();
			})
			.catch(({ data }) => {
				toast.error(data.error);
				setOnEdit(false);
			});
		} 
		else
		{
			await axios.post("http://localhost:3000/api/addUser", {
				nome: formCadastro.values.cdu_nome,
				email: formCadastro.values.cdu_email,
				fone: formCadastro.values.cdu_phone,
				data_nascimento: formCadastro.values.cdu_date
			})
			.then(({ data }) => {
				toast.success(data.message);
				formCadastro.clearForm();
				getUsers();
			})
			.catch(({ data }) => {
				toast.error(data.error)
			});
		}
	}

	const handleDelete = async (id: number) => {
		await axios.delete("http://localhost:3000/api/deleteUser", {
			data: { uid: id }
		})
		.then(({ data }) => {
			toast.success(data.message);
			console.log('Sucesso: ', data.message);
			getUsers();
		})
		.catch(({ data }) => {
			toast.error(data.error);
			console.log('Erro: ', data.error);
		});
	};

	const handleDeleteModal = () => {
		handleDelete(userDelete);
		setDeleteModal(!deleteModal);
	}

	const toggleDeleteModal = (id: number) => {
		setDeleteModal(!deleteModal);
		setUserDelete(id);
	}

	useEffect(() => {
		getUsers();
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
								<input 
									type="text" 
									name="cdu_nome" 
									className="cdu-input" 
									placeholder="Nome completo"
									required
									value={formCadastro.values.cdu_nome || ""}
									onChange={formCadastro.handleChange}
								/>
							</div>
							<div className="cdu-form--group email">
								<input 
									type="email" 
									name="cdu_email" 
									className="cdu-input"
									placeholder="E-mail"
									required 
									value={formCadastro.values.cdu_email || ""}
									onChange={formCadastro.handleChange}
								/>
							</div>
							<div className="cdu-form--group phone">
								<input 
									type="text" 
									name="cdu_phone" 
									className="cdu-input"
									placeholder="Telefone"
									required 
									value={formCadastro.values.cdu_phone || ""}
									onChange={formCadastro.handleChange}
								/>
							</div>
							<div className="cdu-form--group date">
								<input 
									type="date" 
									name="cdu_date" 
									className="cdu-input" 
									required 
									value={formCadastro.values.cdu_date || ""}
									onChange={formCadastro.handleChange}
								/>
							</div>
							<div className="cdu-form--group submit">
								<button
									type="submit"
									name="cdu_submit"
									className={`cdu-submit ${onEdit ? "edit" : "add"}`}
								>
									<FontAwesomeIcon icon={onEdit ? faCheck : faPlus} width={23} height={23} />
									<span className="cdu-submit--text">{onEdit ? "Editar" : "Adicionar"}</span>
								</button>
								{onEdit && (
									<button
										type="reset"
										name="cdu_cancel"
										className="cdu-submit cancel"
										onClick={() => {
											setOnEdit(false);
											formCadastro.clearForm();
										}}
									>
										<FontAwesomeIcon icon={faCancel} />
										<span className="cdu-submit--text">Cancelar</span>
									</button>
								)}
							</div>
						</form>
					</div>
				</div>

				<div className="cdu-card card">
					<div className="cdu-card--body card-body">
						<div className="cdu-table__container">
							<div className="cdu-table__container-scroll">
								<div className="cdu-table__head">
									<table className="cdu-table">
										<thead>
											<tr>
												<th>Nome</th>
												<th>Email</th>
												<th>Telefone</th>
												<th>Dt. Nascimento</th>
												<th>Ações</th>
											</tr>
										</thead>
									</table>
								</div>
								<PerfectScrollbar
									className="cdu-table__body"
									options={{
										wheelPropagation: true,
										wheelSpeed: 0.25,
									}}
								>
									<table className="cdu-table">
										<tbody>
											{users.map((item, i) => (
												<tr key={i}>
													<td><span className="table-text">{item.NOME}</span></td>
													<td><span className="table-text">{item.EMAIL}</span></td>
													<td><span className="table-text">{item.FONE}</span></td>
													<td><span className="table-text">{item.DATA_NASCIMENTO}</span></td>
													<td>
														<FontAwesomeIcon icon={faTrash} onClick={() => toggleDeleteModal(item.ID)} style={{cursor: 'pointer'}} />
														<FontAwesomeIcon 
															icon={faPenToSquare} 
															onClick={() => {
																setOnEdit(true);
																formCadastro.handleEdit(item);
															}} 
															style={{cursor: 'pointer'}} 
														/>
													</td>
												</tr>
											))}
										</tbody>
									</table>
								</PerfectScrollbar>
							</div>
						</div>
					</div>
				</div>
			</main>

			<footer className="cdu-footer container">
				<div className="cdu-footer--content">
					<p className="footer-content--text">Desenvolvido por <a href="" target="_blank">Pedro Estevão</a></p>
				</div>
			</footer>

			<ToastContainer autoClose={3000} position={"top-right"} />

			<DeleteModal 
				title="Excluir usuário"
				message="Tem certeza que deseja excluir este usuário?"
				show={deleteModal}
				toggle={() => setDeleteModal(!deleteModal)}
				onDeleteClick={handleDeleteModal}
			/>
		</>
	)
}

export default Home;