import type { EntryGenerator, PageLoad } from "./$types";
import { data } from "../data"

export const prerender = true

export const entries: EntryGenerator = () => {
    return data
}
