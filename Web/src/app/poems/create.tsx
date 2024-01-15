"use client"

import { supabase } from "@/lib/supabase"
import Link from "next/link";
import { useEffect, useState } from "react";
import { Session } from "@supabase/auth-helpers-nextjs";
import { getRhymingWords } from "@/lib/utils";

export default function Create({user_id}: {user_id: string}) {
	const [poemText, setPoemText] = useState("")
	const [rhymingWords, setRhymingWords] = useState([]);

	useEffect(() => {
		// Fetch rhyming words when poemText changes
		const fetchRhymingWords = async () => {
			const words = poemText.split(' ');
			const rhymingPromises = words.map(async (word) => {
				const rhymes = await getRhymingWords(word);
				return rhymes.length > 0 ? rhymes : [word];
			});

			const rhymingResults = await Promise.all(rhymingPromises);
			const flattenedRhymes = rhymingResults.flat();
			setRhymingWords(flattenedRhymes);
		};

		fetchRhymingWords();
	}, [poemText]);

	function combineWords() {
		const words = poemText.split(' ');
		return words
		  .map((word, index) => (rhymingWords[index] ? `${word} ${rhymingWords[index]}` : word))
		  .join(' ');
	}


	const createPoem = async (e: any) => {
		e.preventDefault()
		const { data, error } = await supabase.from("poems").insert([
			{
				user_id,
				text: combineWords(),
			},
		])
		setPoemText("")
		if (error) {
			console.log("ERROR", error)
			return
		}
		console.log("Created new poem: ", data)

	}
	return (
		<div>
			<label htmlFor="poem" className="block text-sm font-medium leading-6 text-gray-900">
				Create a Poem
			</label>
			<div className="mt-2 w-2/3">
				<form onSubmit={createPoem}>
					<textarea
						rows={4}
						name="poem"
						id="poem"
						className="block w-full m-4 p-3 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
						defaultValue={''}
						onChange={(e) => setPoemText(e.target.value)}
					/>
					<div className="flex justify-end">
						<button
							type="submit"
							className="inline-flex items-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
						>
							Submit
						</button>
					</div>
				</form>
			</div>
		</div>
	)
}
