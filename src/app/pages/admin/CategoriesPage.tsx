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
  listCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../../services/api'
import { getToken, isAdminLoggedIn } from '../../services/auth'
import { Plus, Trash2, Edit2 } from 'lucide-react'

interface Category {
  id?: number
  name: string
  display_name: string
  description?: string
  icon?: string
  sort_order?: number
}

export default function CategoriesPage() {
  const navigate = useNavigate()
  const token = getToken()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [formData, setFormData] = useState<Category>({
    name: '',
    display_name: '',
    description: '',
    icon: '',
    sort_order: 0,
  })

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate('/admin/login')
      return
    }

    const fetchCategories = async () => {
      try {
        const data = await listCategories()
        setCategories(data)
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load categories')
      } finally {
        setLoading(false)
      }
    }

    fetchCategories()
  }, [navigate])

  const handleSave = async () => {
    if (!token) return

    if (!formData.name || !formData.display_name) {
      setError('Name and Display Name are required')
      return
    }

    try {
      if (editingId) {
        await updateCategory(token, editingId, formData)
        setCategories(
          categories.map((c) => (c.id === editingId ? { ...formData, id: editingId } : c))
        )
      } else {
        const newCategory = await createCategory(token, formData)
        setCategories([...categories, newCategory])
      }

      setDialogOpen(false)
      setFormData({
        name: '',
        display_name: '',
        description: '',
        icon: '',
        sort_order: 0,
      })
      setEditingId(null)
      setError('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save category')
    }
  }

  const handleEdit = (category: Category) => {
    setFormData(category)
    setEditingId(category.id || null)
    setDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (!token || !confirm('Are you sure?')) return

    try {
      await deleteCategory(token, id)
      setCategories(categories.filter((c) => c.id !== id))
      setError('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete category')
    }
  }

  const handleDialogOpenChange = (open: boolean) => {
    setDialogOpen(open)
    if (!open) {
      setEditingId(null)
      setFormData({
        name: '',
        display_name: '',
        description: '',
        icon: '',
        sort_order: 0,
      })
      setError('')
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
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">Categories</h1>
            <p className="mt-1 text-sm text-gray-600 sm:text-base">Manage product categories</p>
          </div>

          <Dialog open={dialogOpen} onOpenChange={handleDialogOpenChange}>
            <DialogTrigger asChild>
              <Button className="w-full bg-amber-700 hover:bg-amber-800 sm:w-auto">
                <Plus size={18} className="mr-2" />
                Add Category
              </Button>
            </DialogTrigger>

            <DialogContent className="max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? 'Edit Category' : 'Add New Category'}
                </DialogTitle>
              </DialogHeader>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="space-y-4 py-4">
                {/* Name (slug) */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Name (slug) *</label>
                  <Input
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., chairs (lowercase, no spaces)"
                    required
                  />
                  <p className="text-xs text-gray-500">Used internally in system</p>
                </div>

                {/* Display Name */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Display Name *</label>
                  <Input
                    value={formData.display_name}
                    onChange={(e) =>
                      setFormData({ ...formData, display_name: e.target.value })
                    }
                    placeholder="e.g., Chairs"
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Description</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Category description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={3}
                  />
                </div>

                {/* Icon */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Icon (emoji)</label>
                  <Input
                    value={formData.icon}
                    onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
                    placeholder="e.g., 🪑"
                    maxLength={2}
                  />
                </div>

                {/* Sort Order */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Sort Order</label>
                  <Input
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) =>
                      setFormData({ ...formData, sort_order: parseInt(e.target.value) || 0 })
                    }
                    placeholder="0"
                  />
                </div>
              </div>

              <DialogFooter>
                <Button variant="outline" onClick={() => handleDialogOpenChange(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave} className="bg-amber-700 hover:bg-amber-800">
                  {editingId ? 'Update' : 'Create'} Category
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

        {/* Categories Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Categories ({categories.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {categories.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No categories yet</p>
            ) : (
              <>
                <div className="space-y-3 md:hidden">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="rounded-lg border border-gray-200 bg-gray-50/50 p-4 space-y-3"
                    >
                      <div className="flex items-start gap-3">
                        <span className="text-2xl">{category.icon || '—'}</span>
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900">{category.display_name}</p>
                          <p className="text-sm text-gray-600">{category.name}</p>
                          <p className="text-xs text-gray-500 mt-1">Order: {category.sort_order}</p>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleEdit(category)}
                        >
                          <Edit2 size={16} className="mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => handleDelete(category.id!)}
                        >
                          <Trash2 size={16} className="mr-1" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="hidden overflow-x-auto md:block">
                  <table className="w-full min-w-[560px]">
                    <thead className="bg-gray-50 border-b">
                      <tr>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                          Icon
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                          Display Name
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                          Name (slug)
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                          Order
                        </th>
                        <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories.map((category) => (
                        <tr key={category.id} className="border-b hover:bg-gray-50">
                          <td className="px-4 py-2 text-2xl">{category.icon}</td>
                          <td className="px-4 py-2 text-sm font-medium">{category.display_name}</td>
                          <td className="px-4 py-2 text-sm text-gray-600">{category.name}</td>
                          <td className="px-4 py-2 text-sm">{category.sort_order}</td>
                          <td className="px-4 py-2 text-sm">
                            <div className="flex gap-2">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleEdit(category)}
                              >
                                <Edit2 size={16} />
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => handleDelete(category.id!)}
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
