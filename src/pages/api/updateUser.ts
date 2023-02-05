// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { conn } from '@/config/database';

export default function updateUser(req: NextApiRequest, res: NextApiResponse) {
	const { id, nome, email, fone, data_nascimento } = req.body;

	const query = "UPDATE usuarios SET `NOME` = ?, `EMAIL` = ?, `FONE` = ?, `DATA_NASCIMENTO` = ? WHERE `ID` = ?";

	conn.query(query, [nome, email, fone, data_nascimento, id], (err, results) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}

		return res.status(200).json({ message: "Usuário atualizado com sucesso!", response: results });
	});
}