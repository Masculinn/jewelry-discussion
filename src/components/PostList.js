import { useState, useEffect } from 'react';
import Layout from './Layout';
import Head from 'next/head';
import ReactTimeago from 'react-timeago';
import capitalize from '@/utils/capitalize';
import Avatar from './Avatar';
import getCategories from '@/utils/getCategories';

export default function PostList({posts, totalPosts, tag = null}) {
    const [pathName, setPathName] = useState(null)
    const perPage = 15   
    const totalPage = Math.ceil(totalPosts/perPage)
    const categories = getCategories()
    const category = categories.find(item => item.key === tag);
    
    useEffect(() => {
        // component is mounted and window is available
        setPathName(window.location.pathname)
    }, []);

    return (
        <Layout>
            <Head>
                <title>All Posts {category && category.name} </title>
            </Head>
            <div>
                <section className="my-5">
                    <h1 className="title">Post {category && category.name}</h1>
                    <h2 className="subtitle">
                        {category ? category.desc : 'Everything in this forum' }
                    </h2>
                </section>

                <div className="columns is-mobile">
                    <div className="column is-hidden-mobile is-3">
                        <p className="is-size-5"> Categories </p>
                            <a href='/posts' className="is-block py-1">All</a>
                        {categories.map((cat, index) => (
                                <a href={'/posts/tag/'+ cat.key} className="is-block py-1">{cat.name}</a>
                        ))}
                    </div>

                    <div className="column">

                        <form className='columns is-mobile' action='/posts/search' method ='GET'>
                            <div className='column'>
                                <input className='input is-small' placeholder='type keyword..' type='search' name='query'/>
                            </div>
                            <div className='column is-3'>
                                <button className='button is-fullwidth is-small'>Search</button>
                            </div>
                        </form>

                        {posts.map((post) => (
                            <div className='is-flex is-flex-mobile mb-5' key={post.id}>
                                <div className='mr-2'>
                                    <Avatar username={post.owner.username} avatar_url={post.owner.avatar_url} />
                                </div>

                                <div className=''>
                                    <p> <a href={'/posts/' + post.slug} className='has-text-dark is-size-4 is-size-5-mobile'> {capitalize(post.title)} </a></p>
                                    <p> <small className='has-text-grey'>
                                    <a href={'/user/' + post.owner.username} className='has-text-grey'>@{post.owner.username} </a>
                                    posted <ReactTimeago date={post.created_at} />
                                    | {post.replies.length} comments
                                    </small> </p>
                                </div>
                            </div>
                        ))}

                        {totalPage > 1 && 
                        <nav className="pagination mt-5" role="navigation" aria-label="pagination">
                            <ul className="pagination-list">
                                {
                                    Array(totalPage).fill(null).map((value, index) => (
                                        <li key={index}>
                                                <a className="pagination-link" href={pathName + '?page=' + (index+1)}> {index+1} </a>
                                        </li>
                                    ))
                                }
                            </ul>
                        </nav>
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}