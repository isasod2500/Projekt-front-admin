import { defineConfig } from 'vite'

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        intranet: 'intranet.html',
        orders: 'orders.html',
        dishIndex: 'dishIndex.html',
        dishAdd: 'dishAdd.html',
        dishEdit: 'dishEdit.html',
        contact: 'contact.html',
        review: 'review.html',
        admin: 'admin.html',
        userCreate: 'userCreate.html'
      }
    }
  }
})