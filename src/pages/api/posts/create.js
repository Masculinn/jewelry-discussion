import { supabase } from "@/utils/supabaseClient";
import { jwtDecode } from "jwt-decode";

const slugify = require("slugify")

const post = async (req, res) => {
    const { title, body, tag, access_token } = req.body;

    const decoded = jwtDecode(access_token);
    const user_id = decoded.sub

    const slug = slugify(title) + '-' + Date.now()

    try {    
        const { data, error } = await supabase
            .from('posts')
            .insert([{ 
                title: title,
                body: body,
                tag: tag,
                user_id: user_id,
                slug: slug
            }]).select()
        error && console.log(error);
        console.log(user_id)
        console.log(data)
        res.status(200).json({ slug })
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

export default post;