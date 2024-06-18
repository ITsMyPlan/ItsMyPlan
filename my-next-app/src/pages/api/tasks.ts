import {NextApiRequest, NextApiResponse} from "next";
import {supabase} from "../../utils/supabaseClient";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
	const {method} = req;

	console.log(`Received ${method} request`);

	switch (method) {
		case "GET":
			const {data, error} = await supabase.from("tasks").select("*");
			if (error) return res.status(400).json({error: error.message});
			return res.status(200).json({data});
		case "POST":
			const {id, title, detail, time} = req.body;
			const {data: newTask, error: insertError} = await supabase.from("tasks").insert([{id, title, detail, time}]);
			if (insertError) return res.status(400).json({error: insertError.message});
			return res.status(201).json({task: newTask});
		case "DELETE":
			const {id: taskId} = req.query;
			const {data: deletedTask, error: deleteError} = await supabase
				.from("tasks")
				.delete()
				.eq("id", taskId as string);
			if (deleteError) return res.status(400).json({error: deleteError.message});
			return res.status(200).json({task: deletedTask});
		default:
			res.setHeader("Allow", ["GET", "POST", "DELETE"]);
			return res.status(405).end(`Method ${method} Not Allowed`);
	}
}
