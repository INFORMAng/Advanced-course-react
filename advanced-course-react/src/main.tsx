import App from './App.tsx'
import { Provider } from 'react-redux'
import { createRoot } from 'react-dom/client'

import { store } from './store/config/store.ts'

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
      <App />
  </Provider>
)
