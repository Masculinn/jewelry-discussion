import { supabase } from "./supabaseClient";

export default async function isProfileExists() {
    try {
        const user = supabase.auth.getUser();


            return user
    } catch (error) {
        console.log(error.message)
    }
};