// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { conn } from '@/config/database';

export default function addUser(req: NextApiRequest, res: NextApiResponse) {
	const { nome, email, fone, data_nascimento } = req.body;

	const query = "INSERT INTO usuarios (NOME, EMAIL, FONE, DATA_NASCIMENTO) VALUES (?, ?, ?, ?)";

	conn.query(query, [nome, email, fone, data_nascimento], (err, results) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}

		return res.status(200).json({ message: "Usuário cadastrado com sucesso!", response: results });
	});
}