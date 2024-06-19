import {NextApiRequest, NextApiResponse} from "next";
import {supabase} from "../../../utils/supabaseClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const {id} = req.query;
	const {method} = req;

	switch (method) {
		case "GET":
			const {data: taskData, error: getError} = await supabase.from("tasks").select("*").eq("id", id);
			if (getError) return res.status(400).json({error: getError.message});
			return res.status(200).json(taskData);

		case "DELETE":
			const {data: deletedData, error: deleteError} = await supabase.from("tasks").delete().match({id});
			if (deleteError) return res.status(400).json({error: deleteError.message});
			return res.status(200).json(deletedData);

		default:
			res.setHeader("Allow", ["GET", "DELETE"]);
			return res.status(405).end(`Method ${method} Not Allowed`);
	}
}
