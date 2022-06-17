export default function ({ app, redirect }) {
    if (!app.store.state.auth.isAuthenticated) {
        return redirect('/');
    }
  }
  
