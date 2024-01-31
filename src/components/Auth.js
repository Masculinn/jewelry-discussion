import React from "react";
import { supabase } from "@/utils/supabaseClient";

class Auth extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      email: "",
    };
  }

  handleLogin = async (email) => {
    try {
      this.setState({ loading: true });
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: "/profile" },
      });
      if (error) throw error;
      alert(
        "Check your email for the login link! Look at spam folder if not in inbox."
      );
      console.log(supabase.auth.getUser());
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      this.setState({ loading: false });
    }
  };

  render() {
    const { loading, email } = this.state;

    return (
      <div className=" bg-white">
        <div className="column is-half is-offset-one-quarter">
          <h3 className="title">Join the discussion</h3>
          <div>
            <p className="is-size-5 mb-1">One tap email auth:</p>
            <div>
              <input
                className="input mb-2"
                type="email"
                placeholder="Your email"
                value={email}
                onChange={(e) => this.setState({ email: e.target.value })}
              />
            </div>
            <div>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  this.handleLogin(email);
                }}
                className="button is-primary is-fullwidth"
                disabled={loading}
              >
                <span>{loading ? "Loading" : "Send magic link"}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Auth;
