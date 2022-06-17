export default function ({ app, redirect }) {
    console.log('no-auth',app.store.state.auth.isAuthenticated);
    if (app.store.state.auth.isAuthenticated) {
        return redirect('/chat');
    }
  }