import { createBrowserRouter } from 'react-router'
import { Root } from './Root'
import { HomePage } from './pages/HomePage'
import { CollectionsPage } from './pages/CollectionsPage'
import { ProductDetailPage } from './pages/ProductDetailPage'
import { SustainabilityPage } from './pages/SustainabilityPage'
import { AboutPage } from './pages/AboutPage'
import { NotFoundPage } from './pages/NotFoundPage'

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
      { path: '*', Component: NotFoundPage },
    ],
  },
])
