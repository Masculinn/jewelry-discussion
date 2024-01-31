import Head from "next/head";
import React from "react";
import getCategories from "@/utils/getCategories";
import isProfileExists from "@/utils/isProfileExists";
import { supabase } from "@/utils/supabaseClient";
import Layout from "./Layout";

class PostForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: '',
      body: '',
      tag: '',
      userId: null,
      updateSlug: '',
      token: null,
      categories: getCategories(),
    };
  }

  componentDidMount() {
    this.fetchUserData();
    this.fetchSession();
  }

  fetchUserData = async () => {
    const profileExists = await isProfileExists();
    this.setState({ userId: profileExists.data.user.id });

    if (!profileExists) {
      alert('Create username first');
      window.location.href = '/';
    }
  }

  fetchSession = async () => {
    try {
      const { data, error } = await supabase.auth.getSession();
      
      if (error || !data.session.access_token) {
        return error;
      }

      this.setState({ token: data.session.access_token });
    } catch (error) {
      console.error(error);
    }
  }

  onSubmit = async () => {
    const { title, body, tag, userId } = this.state;
    const slugIn = title + '-' + Date.now();
    this.setState({ updateSlug: slugIn });

    if (title !== '' && tag) {
      try {    
        const { data, error } = await supabase
          .from('posts')
          .insert([{ 
            title: title,
            body: body,
            tag: tag,
            user_id: userId,
            slug: this.state.updateSlug
          }]).select();

        error && console.log(error);
        window.location.href = '/posts';
      } catch (err) {
        console.log(err);
      }
    }
  };

  render() {
    const { title, body, tag, categories } = this.state;

    return (
      <Layout>
        <Head>
          <title>Post discuss</title>
        </Head>
        <h1 className='is-size-3 mb-2'>Create/Edit Post</h1>
        <div className='fields mb-4'>
          <label className='label'>Title</label>
          <input
            className='input'
            type="text"
            placeholder="your post title"
            onChange={(e) => this.setState({ title: e.target.value })}
          />
        </div>

        <div className='fields mb-4'>
          <label className='label'>Subject</label>
          <textarea
            className='textarea'
            placeholder="I'm going to ask about ..."
            onChange={(e) => this.setState({ body: e.target.value })}
          >
          </textarea>
        </div>
        <div className='fields mb-4'>
          <label className='label'>Category</label>
          <div className='select'>
            <select 
              onChange={(e) => this.setState({ tag: e.target.value })}
              defaultValue={'random'}
            >
              {categories.map((cat, index) => (
                <option key={index} value={cat.key}>{cat.name} - {cat.desc}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="submit mt-5">
          <button type="submit" onClick={this.onSubmit} className="button is-fullwidth is-primary">Submit</button>
        </div>
      </Layout>
    );
  }
}

export default PostForm;
