import {NextApiRequest, NextApiResponse} from "next";
import {supabase} from "../../../utils/supabaseClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const {method} = req;

	switch (method) {
		case "GET":
			const {data, error} = await supabase.from("tasks").select("*");
			if (error) return res.status(400).json({error: error.message});
			return res.status(200).json(data);

		case "POST":
			const {id, title, detail, time} = req.body;
			console.log("Received POST with ID:", id); // 서버에서 받은 ID 로깅
			const {data: newData, error: insertError} = await supabase.from("tasks").insert([{id, title, detail, time}]);
			if (insertError) {
				console.error("Insert error:", insertError.message);
				return res.status(400).json({error: insertError.message});
			}
			return res.status(201).json({message: "Task successfully added"});

		default:
			res.setHeader("Allow", ["GET", "POST"]);
			return res.status(405).end(`Method ${method} Not Allowed`);
	}
}
