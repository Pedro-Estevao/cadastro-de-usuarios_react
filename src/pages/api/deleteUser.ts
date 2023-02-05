// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { conn } from '@/config/database';

export default function deleteUser(req: NextApiRequest, res: NextApiResponse) {
	const query = "DELETE FROM usuarios WHERE `ID` = ?";

	const { id } = req.body;

	conn.query(query, [id], (err, results) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}

		return res.status(200).json({ message: "Usuário excluído com sucesso!", response: results });
	});
}