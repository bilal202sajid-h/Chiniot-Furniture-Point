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
  listCollections,
  createCollection,
  updateCollection,
  deleteCollection,
  uploadProductImage,
  listCategories,
} from '../../services/api'
import { getToken, isAdminLoggedIn } from '../../services/auth'
import { Plus, Trash2, Edit2 } from 'lucide-react'

interface Collection {
  id?: number
  title: string
  subtitle: string
  description: string
  image_url: string
  categories?: string[]
  sort_order?: number
}

export default function CollectionsPage() {
  const navigate = useNavigate()
  const token = getToken()
  const [collections, setCollections] = useState<Collection[]>([])
  const [categories, setCategories] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [dialogOpen, setDialogOpen] = useState(false)
  const [editingId, setEditingId] = useState<number | null>(null)
  const [uploading, setUploading] = useState(false)
  const [formData, setFormData] = useState<Collection>({
    title: '',
    subtitle: '',
    description: '',
    image_url: '',
    categories: [],
    sort_order: 0,
  })

  const normalizeCategoryValue = (value: string) => {
    const trimmed = value.trim()
    const matched = categories.find((category) => {
      return category.name === trimmed || category.display_name === trimmed
    })

    if (matched) {
      return matched.name
    }

    return trimmed.toLowerCase().replace(/\s+/g, '-')
  }

  const categoryLabelByName = (value: string) => {
    const matched = categories.find((category) => category.name === value)
    return matched?.display_name || value
  }

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate('/admin/login')
      return
    }

    const fetchData = async () => {
      try {
        const [collectionsData, categoriesData] = await Promise.all([
          listCollections(),
          listCategories(),
        ])
        setCollections(collectionsData)
        setCategories(categoriesData)
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
        categories: (formData.categories || []).map((category) => normalizeCategoryValue(category)),
      }
      if (editingId) {
        await updateCollection(token, editingId, payload)
        setCollections(
          collections.map((c) => (c.id === editingId ? { ...payload, id: editingId } : c))
        )
      } else {
        const newCollection = await createCollection(token, payload)
        setCollections([...collections, newCollection])
      }

      setDialogOpen(false)
      setFormData({
        title: '',
        subtitle: '',
        description: '',
        image_url: '',
        categories: [],
        sort_order: 0,
      })
      setEditingId(null)
      setError('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save collection')
    }
  }

  const handleEdit = (collection: Collection) => {
    setFormData({
      ...collection,
      categories: (collection.categories || []).map((category) => normalizeCategoryValue(category)),
    })
    setEditingId(collection.id || null)
    setDialogOpen(true)
  }

  const handleDelete = async (id: number) => {
    if (!token || !confirm('Are you sure?')) return

    try {
      await deleteCollection(token, id)
      setCollections(collections.filter((c) => c.id !== id))
      setError('')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete collection')
    }
  }

  const handleDialogOpenChange = (open: boolean) => {
    setDialogOpen(open)
    if (!open) {
      setEditingId(null)
      setFormData({
        title: '',
        subtitle: '',
        description: '',
        image_url: '',
        categories: [],
        sort_order: 0,
      })
    }
  }

  const toggleCategory = (categoryName: string) => {
    const normalized = normalizeCategoryValue(categoryName)
    const current = formData.categories || []
    if (current.includes(normalized)) {
      setFormData({
        ...formData,
        categories: current.filter((c) => c !== normalized),
      })
    } else {
      setFormData({
        ...formData,
        categories: [...current, normalized],
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
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Collections</h1>
            <p className="text-gray-600 mt-1">Manage product collections</p>
          </div>

          <Dialog open={dialogOpen} onOpenChange={handleDialogOpenChange}>
            <DialogTrigger asChild>
              <Button className="bg-amber-700 hover:bg-amber-800">
                <Plus size={18} className="mr-2" />
                Add Collection
              </Button>
            </DialogTrigger>

            <DialogContent className="max-w-2xl max-h-screen overflow-y-auto">
              <DialogHeader>
                <DialogTitle>
                  {editingId ? 'Edit Collection' : 'Add New Collection'}
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
                  <label className="block text-sm font-medium">Collection Image</label>
                  {formData.image_url && (
                    <img
                      src={formData.image_url}
                      alt="Collection preview"
                      className="w-full h-48 object-cover rounded"
                    />
                  )}
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      disabled={uploading}
                      className="flex-1"
                    />
                    {uploading && <span className="text-sm text-gray-500">Uploading...</span>}
                  </div>
                </div>

                {/* Title */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Title *</label>
                  <Input
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Collection title"
                    required
                  />
                </div>

                {/* Subtitle */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Subtitle *</label>
                  <Input
                    value={formData.subtitle}
                    onChange={(e) => setFormData({ ...formData, subtitle: e.target.value })}
                    placeholder="Collection subtitle"
                    required
                  />
                </div>

                {/* Description */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Collection description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={4}
                    required
                  />
                </div>

                {/* Categories */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Categories</label>
                  <div className="grid grid-cols-2 gap-2">
                    {categories.map((category) => (
                      <label key={category.id} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={(formData.categories || []).includes(category.name)}
                          onChange={() => toggleCategory(category.name)}
                          className="h-4 w-4"
                        />
                        <span className="text-sm">{category.display_name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Sort Order */}
                <div className="space-y-2">
                  <label className="block text-sm font-medium">Sort Order</label>
                  <Input
                    type="number"
                    value={formData.sort_order}
                    onChange={(e) =>
                      setFormData({ ...formData, sort_order: parseInt(e.target.value) })
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
                  {editingId ? 'Update' : 'Create'} Collection
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

        {/* Collections Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {collections.length === 0 ? (
            <p className="text-gray-500 col-span-full text-center py-12">No collections yet</p>
          ) : (
            collections.map((collection) => (
              <Card key={collection.id} className="overflow-hidden">
                <img
                  src={collection.image_url}
                  alt={collection.title}
                  className="w-full h-40 object-cover"
                />
                <CardContent className="pt-4">
                  <h3 className="font-semibold text-lg">{collection.title}</h3>
                  <p className="text-sm text-gray-600">{collection.subtitle}</p>
                  <p className="text-xs text-gray-500 mt-2 line-clamp-2">
                    {collection.description}
                  </p>
                  {collection.categories && collection.categories.length > 0 && (
                    <div className="flex gap-1 flex-wrap mt-3">
                      {collection.categories.map((cat) => (
                        <span key={cat} className="text-xs bg-amber-100 text-amber-800 px-2 py-1 rounded">
                          {categoryLabelByName(cat)}
                        </span>
                      ))}
                    </div>
                  )}
                  <div className="flex gap-2 mt-4">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(collection)}
                      className="flex-1"
                    >
                      <Edit2 size={16} className="mr-1" />
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDelete(collection.id!)}
                      className="flex-1"
                    >
                      <Trash2 size={16} className="mr-1" />
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </AdminLayout>
  )
}
