import React from "react";
import Layout from "@/components/Layout";
import AvatarForm from "@/components/AvatarForm";
import { supabase } from "@/utils/supabaseClient";

class Profile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
      loading: true,
      user: [],
      username: null,
      website: null,
      avatar_url: null,
    };
  }

  componentDidMount() {
    const user = supabase.auth.getUser();
    this.setState({ user });
    this.getProfile();
  }

  async getProfile() {
    try {
      this.setState({ loading: true });
      const { data, error } = await supabase.auth.getUser();

      if (error || !data.user.id) {
        this.setState({ error: true });
        return;
      }

      this.setState({ user: data.user });

      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select(`username, website, avatar_url`)
        .eq("id", data.user.id)
        .single();

      if (profileError) {
        this.setState({ error: true });
      }

      if (profileData) {
        this.setState({
          username: profileData.username,
          website: profileData.website,
          avatar_url: profileData.avatar_url,
          error: false,
        });
      } else {
        this.setState({ error: true });
      }
    } catch (error) {
      alert(error.message);
    } finally {
      this.setState({ loading: false });
    }
  }

  async updateProfile({ username, website, avatar_url }) {
    try {
      this.setState({ loading: true });

      if (username == null) {
        alert("username min 4 and max 12 characters");
        return;
      }
      if (username.trim().length < 4 || username.trim().length > 12) {
        alert("username min 4 and max 12 characters");
        return;
      }
      var expr = /^[a-zA-Z0-9_]{4,12}$/;
      if (!expr.test(username)) {
        alert("Only Character, number and _ allowed");
        return;
      }

      const updates = {
        id: this.state.user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      };
      console.log("Updates:", updates);
      let { error } = await supabase
        .from("profiles")
        .upsert(updates, {
          returning: "minimal",
        });

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error.message.includes("duplicate key value"))
        alert("username is already exists, pick another one");
      else if (error.message.includes("username"))
        alert("username can't be empty");
      else alert(error.message);
    } finally {
      this.setState({ loading: false });
      window.location.href = "/posts";
    }
  }

  render() {
    const { user, error, loading, username, website, avatar_url } = this.state;

    return (
      <Layout>
        <div className="form-widget">
          <h1 className="is-size-2 mb-5">Update Profile</h1>

          {error && (
            <div className="notification">
              <h3>
                <b> Oops </b>
              </h3>
              Looks like you don&apos;t have any profile yet. Add your username
            </div>
          )}

          <div className="field">
            <label className="label" htmlFor="email">
              Email
            </label>
            <div className="control">
              <input
                id="email"
                className="input"
                type="text"
                value={user.email}
                disabled
              />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="username">
              Username
            </label>
            <div className="control">
              <input
                id="username"
                className="input"
                type="text"
                value={username || ""}
                onChange={(e) => this.setState({ username: e.target.value })}
              />
            </div>
          </div>

          <div className="field">
            <label className="label" htmlFor="website">
              Website
            </label>
            <div className="control">
              <input
                id="website"
                className="input"
                type="text"
                value={website || ""}
                onChange={(e) => this.setState({ website: e.target.value })}
              />
            </div>
          </div>

          <AvatarForm
            username={username}
            avatar_url={avatar_url}
            onUpload={(url) => {
              this.setState({ avatar_url: url });
              this.updateProfile({ username, website, avatar_url: url });
            }}
          />

          <div>
            <button
              className="button is-primary is-fullwidth"
              onClick={() =>
                this.updateProfile({ username, website, avatar_url })
              }
              disabled={loading}
            >
              {loading ? "Loading ..." : "Update"}
            </button>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Profile;
