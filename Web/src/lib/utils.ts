import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const DATAMUSE_API = "https://api.datamuse.com/words"

async function getRhymingWords(word) {
  try {
    const response = await fetch(`${DATAMUSE_API}?rel_rhy=${word}`)
    const data = await response.json()
    return data.map((result) => result.word)
  } catch (error) {
    console.error("Error fetching rhyming words", error)
    return []
  }
}

export { getRhymingWords }
