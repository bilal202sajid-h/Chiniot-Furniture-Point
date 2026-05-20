import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import AdminLayout from '../../components/AdminLayout'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Alert, AlertDescription } from '../../components/ui/alert'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '../../components/ui/dialog'
import {
  listProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  uploadProductImage,
  listCategories,
  listCollections,
} from '../../services/api'
import { getToken, isAdminLoggedIn } from '../../services/auth'
import { Plus, Trash2, Edit2, Upload } from 'lucide-react'

interface Product {
  id?: number
  name: string
  subtitle: string
  price: string
  category: string
  description: string
  details?: string
  image_url: string
  badge?: string
  featured: boolean
  collection_id?: number | null
  material?: string
  dimensions?: string
  stock: number
}

export default function ProductsPage() {
  const navigate = useNavigate()
  const token = getToken()
  const [products, setProducts] = useState<Product[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [collections, setCollections] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState<Product>({
    name: '',
    subtitle: '',
    price: '',
    category: '',
    description: '',
    details: '',
    image_url: '',
    badge: '',
    featured: false,
    collection_id: null,
    material: '',
    dimensions: '',
    stock: 0,
  })

  const normalizeCategory = (value: string) => {
    const trimmed = value.trim()
    const matched = categories.find((category) => {
      return category.name === trimmed || category.display_name === trimmed
    })

    if (matched) {
      return matched.name
    }

    return trimmed.toLowerCase().replace(/\s+/g, '-')
  }

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate('/admin/login')
      return
    }

    const fetchData = async () => {
      try {
        const [productsData, categoriesData, collectionsData] = await Promise.all([
          listProducts(),
          listCategories(),
          listCollections(),
        ])
        setProducts(productsData)
        setCategories(categoriesData)
        setCollections(collectionsData)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load data')
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [navigate])

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !token) return

    setUploading(true)
    try {
      const result = await uploadProductImage(token, file)
      setFormData({ ...formData, image_url: result.image_url })
      setError('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Image upload failed')
    } finally {
      setUploading(false)
    }
  }

  const handleSave = async () => {
    if (!token) return

    try {
      const payload = {
        ...formData,
        price: String(formData.price),
        category: normalizeCategory(formData.category),
      }
      if (editingId) {
        await updateProduct(token, editingId, payload)
        setProducts(
          products.map((p) => (p.id === editingId ? { ...payload, id: editingId } : p))
        )
      } else {
        const newProduct = await createProduct(token, payload)
        setProducts([...products, newProduct])
      }

      setDialogOpen(false)
      setFormData({
        name: '',
        subtitle: '',
        price: '',
        category: '',
        description: '',
        details: '',
        image_url: '',
        badge: '',
        featured: false,
        collection_id: null,
        material: '',
        dimensions: '',
        stock: 0,
      })
      setEditingId(null)
      setError('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save product')
    }
  }

  const handleEdit = (product: Product) => {
    setFormData({
      ...product,
      price: String(product.price ?? ''),
      category: normalizeCategory(product.category),
    })
    setEditingId(product.id || null)
    setDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (!token || !confirm('Are you sure?')) return

    try {
      await deleteProduct(token, id)
      setProducts(products.filter((p) => p.id !== id))
      setError('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete product')
    }
  }

  const handleDialogOpenChange = (open: boolean) => {
    setDialogOpen(open)
    if (!open) {
      setEditingId(null)
      setFormData({
        name: '',
        subtitle: '',
        price: '',
        category: '',
        description: '',
        details: '',
        image_url: '',
        badge: '',
        featured: false,
        collection_id: null,
        material: '',
        dimensions: '',
        stock: 0,
      })
    }
  }

  if (loading) {
    return (
      <AdminLayout>
        <div className="text-center py-12">
          <p className="text-gray-500">Loading...</p>
        </div>
      </AdminLayout>
    )
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Products</h1>
            <p className="mt-1 text-sm text-gray-600 sm:text-base">Manage furniture products</p>
          </div>

          <Dialog open={dialogOpen} onOpenChange={handleDialogOpenChange}>
            <DialogTrigger asChild>
              <Button className="w-full bg-amber-700 hover:bg-amber-800 sm:w-auto">
                <Plus size={18} className="mr-2" />
                Add Product
              </Button>
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto sm:max-h-[85vh]">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? 'Edit Product' : 'Add New Product'}
                </DialogTitle>
              </DialogHeader>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4 py-4">
                {/* Image Upload */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Product Image</label>
                  {formData.image_url && (
                    <img
                      src={formData.image_url}
                      alt="Product preview"
                      className="w-full h-48 object-cover rounded"
                    />
                  )}
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="min-w-0 flex-1"
                    />
                    {uploading && <span className="text-sm text-gray-500">Uploading...</span>}
                  </div>
                </div>

                {/* Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Name *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Product name"
                    required
                  />
                </div>

                {/* Subtitle */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Subtitle *</label>
                  <Input
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="Product subtitle"
                    required
                  />
                </div>

                {/* Price */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Price (PKR) *</label>
                  <Input
                    type="text"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g., PKR 12,000 or 12000"
                    required
                  />
                </div>

                {/* Category */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Category *</label>
                  <select
                    aria-label="Category"
                    value={formData.category}
                    onChange={(e) =>
                      setFormData({ ...formData, category: normalizeCategory(e.target.value) })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((cat) => (
                      <option key={cat.id} value={cat.name}>
                        {cat.display_name}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Product description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={3}
                    required
                  />
                </div>

                {/* Details */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Details/Specifications</label>
                  <textarea
                    value={formData.details}
                    onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                    placeholder="Additional details"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={3}
                  />
                </div>

                {/* Material */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Material</label>
                  <Input
                    value={formData.material}
                    onChange={(e) => setFormData({ ...formData, material: e.target.value })}
                    placeholder="e.g., Sheesham Wood, Kikar"
                  />
                </div>

                {/* Dimensions */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Dimensions</label>
                  <Input
                    value={formData.dimensions}
                    onChange={(e) => setFormData({ ...formData, dimensions: e.target.value })}
                    placeholder="e.g., 200 x 100 x 80 cm"
                  />
                </div>

                {/* Stock */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Stock Quantity</label>
                  <Input
                    type="number"
                    value={formData.stock}
                    onChange={(e) =>
                      setFormData({ ...formData, stock: parseInt(e.target.value) })
                    }
                    placeholder="0"
                  />
                </div>

                {/* Badge */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Badge</label>
                  <select
                    aria-label="Badge"
                    value={formData.badge}
                    onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">No badge</option>
                    <option value="New">New</option>
                    <option value="Bestseller">Bestseller</option>
                    <option value="Sale">Sale</option>
                  </select>
                </div>

                {/* Collection */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Collection</label>
                  <select
                    aria-label="Collection"
                    value={formData.collection_id || ''}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        collection_id: e.target.value ? parseInt(e.target.value) : null,
                      })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                  >
                    <option value="">Select a collection</option>
                    {collections.map((col) => (
                      <option key={col.id} value={col.id}>
                        {col.title}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Featured */}
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="featured"
                    checked={formData.featured}
                    onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                    className="h-4 w-4"
                  />
                  <label htmlFor="featured" className="text-sm font-medium cursor-pointer">
                    Featured on homepage
                  </label>
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => handleDialogOpenChange(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave} className="bg-amber-700 hover:bg-amber-800">
                  {editingId ? 'Update' : 'Create'} Product
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Products Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Products ({products.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {products.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No products yet</p>
            ) : (
              <>
                <div className="space-y-3 md:hidden">
                  {products.map((product) => {
                    const p = product.price
                    const num =
                      typeof p === 'number' ? p : Number(String(p).replace(/[^0-9.-]+/g, ''))
                    const priceDisplay =
                      !Number.isNaN(num) && String(p).trim() !== ''
                        ? num.toLocaleString('en-PK', { style: 'currency', currency: 'PKR' })
                        : String(p)

                    return (
                      <div
                        key={product.id}
                        className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 space-y-3"
                      >
                        <div>
                          <p className="font-medium text-gray-900">{product.name}</p>
                          <p className="text-sm text-gray-600">{product.category}</p>
                        </div>
                        <div className="flex flex-wrap gap-3 text-sm">
                          <span className="font-medium">{priceDisplay}</span>
                          <span className="text-gray-600">Stock: {product.stock}</span>
                        </div>
                        <div className="flex gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => handleEdit(product)}
                          >
                            <Edit2 size={16} className="mr-1" />
                            Edit
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            className="flex-1"
                            onClick={() => handleDelete(product.id!)}
                          >
                            <Trash2 size={16} className="mr-1" />
                            Delete
                          </Button>
                        </div>
                      </div>
                    )
                  })}
                </div>

                <div className="hidden overflow-x-auto md:block">
                  <table className="w-full min-w-[640px]">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                          Name
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                          Category
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                          Price (PKR)
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                          Stock
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product) => (
                        <tr key={product.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-2 text-sm">{product.name}</td>
                          <td className="px-4 py-2 text-sm text-gray-600">{product.category}</td>
                          <td className="px-4 py-2 text-sm font-medium">
                            {(() => {
                              const p = product.price
                              const num =
                                typeof p === 'number'
                                  ? p
                                  : Number(String(p).replace(/[^0-9.-]+/g, ''))
                              if (!Number.isNaN(num) && String(p).trim() !== '') {
                                return num.toLocaleString('en-PK', {
                                  style: 'currency',
                                  currency: 'PKR',
                                })
                              }
                              return String(p)
                            })()}
                          </td>
                          <td className="px-4 py-2 text-sm">{product.stock}</td>
                          <td className="px-4 py-2 text-sm">
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(product)}
                              >
                                <Edit2 size={16} />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDelete(product.id!)}
                              >
                                <Trash2 size={16} />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
