import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import AdminLayout from '../../components/AdminLayout'
import { listProducts, listCollections, listCategories } from '../../services/api'
import { isAdminLoggedIn } from '../../services/auth'
import { Package, Layers, Tag, Plus } from 'lucide-react'

export default function AdminDashboard() {
  const navigate = useNavigate()
  const [stats, setStats] = useState({
    products: 0,
    collections: 0,
    categories: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate('/admin/login')
      return
    }

    const fetchStats = async () => {
      try {
        const [products, collections, categories] = await Promise.all([
          listProducts(),
          listCollections(),
          listCategories(),
        ])

        setStats({
          products: products.length,
          collections: collections.length,
          categories: categories.length,
        })
      } catch (err) {
        console.error('Failed to fetch stats:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [navigate])

  const StatCard = ({ 
    title, 
    count, 
    icon: Icon, 
    href,
    actionLabel 
  }: { 
    title: string
    count: number
    icon: any
    href: string
    actionLabel: string
  }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-amber-700" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{loading ? '-' : count}</div>
        <p className="text-xs text-gray-500 mt-2">Total {title.toLowerCase()}</p>
        <Button
          onClick={() => navigate(href)}
          className="mt-4 w-full bg-amber-700 hover:bg-amber-800"
          size="sm"
        >
          <Plus size={16} className="mr-1" /> {actionLabel}
        </Button>
      </CardContent>
    </Card>
  )

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome to Chiniot Furniture Admin Panel</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard
            title="Products"
            count={stats.products}
            icon={Package}
            href="/admin/products"
            actionLabel="Add Product"
          />
          <StatCard
            title="Collections"
            count={stats.collections}
            icon={Layers}
            href="/admin/collections"
            actionLabel="Add Collection"
          />
          <StatCard
            title="Categories"
            count={stats.categories}
            icon={Tag}
            href="/admin/categories"
            actionLabel="Add Category"
          />
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button
                onClick={() => navigate('/admin/products')}
                className="bg-amber-700 hover:bg-amber-800"
              >
                Manage Products
              </Button>
              <Button
                onClick={() => navigate('/admin/editor')}
                className="bg-amber-700 hover:bg-amber-800"
              >
                Edit Frontend Content
              </Button>
              <Button
                onClick={() => navigate('/admin/collections')}
                className="bg-amber-700 hover:bg-amber-800"
              >
                Manage Collections
              </Button>
              <Button
                onClick={() => navigate('/admin/categories')}
                className="bg-amber-700 hover:bg-amber-800"
              >
                Manage Categories
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
