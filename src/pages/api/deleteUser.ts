// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import { conn } from '@/config/database';

export default function deleteUserG(req: NextApiRequest, res: NextApiResponse) {
	const { uid } = req.body;
	
	const query = "DELETE FROM usuarios WHERE `ID` = ?";

	conn.query(query, [uid], (err, results) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}

		return res.status(200).json({ message: "Usuário excluído com sucesso!", response: results });
	});
}