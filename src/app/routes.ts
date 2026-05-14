import { createBrowserRouter } from 'react-router'
import { Root } from './Root'
import { HomePage } from './pages/HomePage'
import { CollectionsPage } from './pages/CollectionsPage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { SustainabilityPage } from './pages/SustainabilityPage'
import { AboutPage } from './pages/AboutPage'
import { ContactPage } from './pages/ContactPage'
import { NotFoundPage } from './pages/NotFoundPage'
import AdminLoginPage from './pages/admin/LoginPage'
import AdminDashboard from './pages/admin/DashboardPage'
import ProductsPage from './pages/admin/ProductsPage'
import AdminCollectionsPage from './pages/admin/CollectionsPage'
import CategoriesPage from './pages/admin/CategoriesPage'
import FrontendEditorPage from './pages/admin/EditorPage'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Root,
    children: [
      { index: true, Component: HomePage },
      { path: 'collections', Component: CollectionsPage },
      { path: 'products/:id', Component: ProductDetailPage },
      { path: 'sustainability', Component: SustainabilityPage },
      { path: 'about', Component: AboutPage },
      { path: 'contact', Component: ContactPage },
      { path: '*', Component: NotFoundPage },
    ],
  },
  {
    path: '/admin',
    children: [
      { path: 'login', Component: AdminLoginPage },
      { path: 'dashboard', Component: AdminDashboard },
      { path: 'products', Component: ProductsPage },
      { path: 'collections', Component: AdminCollectionsPage },
      { path: 'categories', Component: CategoriesPage },
      { path: 'editor', Component: FrontendEditorPage },
      { index: true, Component: AdminLoginPage },
    ],
  },
])

