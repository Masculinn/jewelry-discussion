import { supabase } from "@/utils/supabaseClient";
import { jwtDecode } from "jwt-decode";

const updateReply = async(req, res) => {
    const { body, reply_id, access_token } = req.body;

    const decoded = jwtDecode(access_token);
    const user_id = decoded.sub

    try {
        supabase.auth.setAuth(access_token)
        const { data, error } =  await supabase
                  .from('replies')
                  .update({ body: body })
                  .match({ id: reply_id })
        
        let reply = data[0]

        res.status(200).json({ status: 'success', reply: reply })
    } catch (e) {
        res.status(500).json({ error: e.message });
    }
}

export default updateReply;