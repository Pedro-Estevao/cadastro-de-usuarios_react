// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiResponse } from 'next';
import { conn } from '@/config/database';

export default function listUsers(_: any, res: NextApiResponse) {
	const query = "SELECT * FROM usuarios";

	conn.query(query, (err, results) => {
		if (err) {
			return res.status(500).json({ error: err.message });
		}

		return res.status(200).json(results);
	});
}