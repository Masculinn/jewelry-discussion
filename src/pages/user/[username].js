import { supabase } from "@/utils/supabaseClient";
import Layout from "@/components/Layout";
import Avatar from "@/components/Avatar";

export default function PostByTag({ user }) {
    return (
        <Layout>
            <div className="columns">
                <div className="column is-half is-offset-one-quarter">
                    <h3 className='title'>Profile</h3>
                    <Avatar username={user.username} avatar_url={user.avatar_url}></Avatar>
                    <p>@{user.username}</p>
                    {user.website &&
                        <p> <a href={user.website}>{user.website}</a> </p>
                    }
                    
                    <div className='mt-3'>
                        <h3>Post</h3>
                        {user.posts.map((post, index) => (
                            <li key={index}>
                                <a href={'/posts/' + post.slug} className='has-text-info'> {post.title} </a>
                            </li>
                        ))}
                    </div>

                    <div className='mt-3'>
                        <h3>Replies</h3>
                        {user.replies.map((reply, index) => (
                            <li key={index}>
                                <a href={'/posts/' + reply.posts.slug} className='has-text-info'> {reply.body.substr(0, 50)}... </a>
                            </li>
                        ))}
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export async function getServerSideProps(context) {
    const { data: user, error } = await supabase
        .from('profiles')
        .select(`
            *,
            posts!user_id (user_id, title, slug, created_at),
            replies(post_id, body, created_at, posts(slug))
        `)
        .eq('username', context.params.username)
        .order('created_at', { ascending: false, foreignTable: 'posts' })
        .order('created_at', { ascending: false, foreignTable: 'replies' })
        .single()

    console.log(error)

    if (!user) {
        return {
            notFound: true,
        }
    }

    return {
        props: {
            user
        },
    };
}
