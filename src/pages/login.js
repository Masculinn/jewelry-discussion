import React from "react";
import { supabase } from "@/utils/supabaseClient";
import Auth from "@/components/Auth";
import Layout from "@/components/Layout";
import { useRouter } from "next/router";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      session: null,
    };
  }

  componentDidMount() {
    this.fetchSession();

    // Subscribe to changes in authentication state
    this.authSubscription = supabase.auth.onAuthStateChange(
      (_event, userSession) => {
        this.setState({ session: userSession });
      }
    );
  }

  componentWillUnmount() {
    // Cleanup subscription on component unmount
    if (this.authSubscription && this.authSubscription.unsubscribe) {
      this.authSubscription.unsubscribe();
    }
  }

  async fetchSession() {
    try {
      const userSession = await supabase.auth.session();
      this.setState({ session: userSession });
    } catch (error) {
      console.error("Error fetching session:", error);
    }
  }

  render() {
    const { session } = this.state;
    const router = useRouter();

    if (session) {
      router.push("/");
    }

    return (
      <Layout>
        {!session && <Auth />}
      </Layout>
    );
  }
}

export default Login;
