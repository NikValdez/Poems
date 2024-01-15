"use client"

import { supabase } from "@/lib/supabase"
import { useEffect, useState } from "react";
import { Session } from "@supabase/auth-helpers-nextjs";


export default function Page() {
	const [session, setSession] = useState<Session | null>(null);
	const [loading, setLoading] = useState(false);
	const [poems, setPoems] = useState([])

	useEffect(() => {
		supabase.auth.getSession()
			.then(session => setSession(session.data.session ?? null))
			.catch(err => { console.log("ERROR GET SESSION: ", err) })
	}, [])


	useEffect(() => {
		if (session?.user.id) {
			fetchPoems()
		}
	}, [session])

	const fetchPoems = async () => {
		// get poems that have a user_id of session?.user.id
		const { data } = await supabase.from("poems").select("*").eq("user_id", session?.user.id)
		setPoems(data)
	}

	return (
		<main className=" items-center justify-between p-24 m-24">
			<h1>My Poems</h1>
			<ul>
				{session?.user && poems.map((poem: any) => (
					<li key={poem.id}>{poem.text}</li>
				))}
			</ul>

		</main>
	)
}

