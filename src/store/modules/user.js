import { defineStore } from 'pinia';
import supabase from '@/supabase/index';

export default defineStore('user', {
  state: () => ({
    user: {},
  }),

  actions: {
    async fetchUser() {
      const user = await supabase.auth.user();
      this.user = user;
    },
    async signUp(email, password) {
      const { user, error } = await supabase.auth.signUp({
        email,
        password,
        shouldCreateUser: true,
      });
      if (error) throw error;
      if (user) this.user = user;
    },
    async signIn(email, password) {
      const { user, error } = await supabase.auth.signIn({
        email,
        password,
        shouldCreateUser: false,
      });
      if (error) throw error;
      if (user) {
        this.user = user;
        console.log(this.user);
      }
    },
    async signOut() {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    },

    async recoverPass(email) {
      const { error } = await supabase.auth.api.resetPasswordForEmail(email);
      if (error) throw error;
    },
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'user',
        storage: localStorage,
      },
    ],
  },
});
