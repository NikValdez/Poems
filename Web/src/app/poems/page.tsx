"use client"

import { supabase } from "@/lib/supabase"
import Link from "next/link";
import { useEffect, useState } from "react";
import { Session } from "@supabase/auth-helpers-nextjs";
import Create from "./create";

export default function Poems() {
	const [session, setSession] = useState<Session | null>(null);
	const [loading, setLoading] = useState(false);
	const [poems, setPoems] = useState([])

	useEffect(() => {
		supabase.auth.getSession()
			.then(session => setSession(session.data.session ?? null))
			.catch(err => { console.log("ERROR GET SESSION: ", err) })
	}, [])


	useEffect(() => {
		fetchPoems()
	}, [])

	const fetchPoems = async () => {
		const { data } = await supabase.from("poems").select("*")
		setPoems(data)
	}
	console.log("SESSION", session)
	return (
		<main className=" items-center justify-between p-24 m-24 mt-12">
			<Link
				href="/my-poems"
				className="bg-indigo-600 font-semibold rounded px-4 py-2 text-white absolute right-8"
			>
				My Poems
			</Link>

			<h1>Poems</h1>
			<Create user_id={session?.user.id} />
			<ul>
				{poems.map((poem: any) => (
					<li key={poem.id}>{poem.text}</li>
				))}
			</ul>

		</main>
	)
}

