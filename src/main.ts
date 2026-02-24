import { createApp, provide, h } from 'vue'
import { DefaultApolloClient } from '@vue/apollo-composable'
import { apolloClient } from './apollo/client'
import App from './App.vue'

// Import Tailwind CSS
import './style.css'

const app = createApp({
  setup() {
    // Provide Apollo Client to all components
    provide(DefaultApolloClient, apolloClient)
  },
  render: () => h(App),
})

app.mount('#app')
