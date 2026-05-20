import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Alert, AlertDescription } from '../../components/ui/alert'
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
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate('/admin/login')
      return
    }

    const fetchStats = async () => {
      setLoading(true)
      setError('')

      try {
        const products = await listProducts().catch((e) => {
          console.error('Failed to load products', e)
          setError((prev) => prev || 'Failed to load products')
          return []
        })

        const collections = await listCollections().catch((e) => {
          console.error('Failed to load collections', e)
          setError((prev) => prev || 'Failed to load collections')
          return []
        })

        const categories = await listCategories().catch((e) => {
          console.error('Failed to load categories', e)
          setError((prev) => prev || 'Failed to load categories')
          return []
        })

        setStats({
          products: Array.isArray(products) ? products.length : 0,
          collections: Array.isArray(collections) ? collections.length : 0,
          categories: Array.isArray(categories) ? categories.length : 0,
        })
      } catch (err) {
        console.error('Failed to fetch stats:', err)
        setError('Failed to fetch dashboard stats')
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
          <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Dashboard</h1>
          <p className="mt-1 text-sm text-gray-600 sm:text-base">Welcome to Chiniot Furniture Admin Panel</p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

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
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
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
