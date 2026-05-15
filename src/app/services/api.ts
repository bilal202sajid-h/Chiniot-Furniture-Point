const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://cfp-backend-a7wo.onrender.com/api'

// Auth
export const adminLogin = async (username: string, password: string) => {
  const response = await fetch(`${API_BASE_URL}/admin/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })
  if (!response.ok) throw new Error('Login failed')
  return response.json()
}

export const getAdminProfile = async (token: string) => {
  const response = await fetch(`${API_BASE_URL}/admin/me`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!response.ok) throw new Error('Failed to fetch profile')
  return response.json()
}

// Products
export const listProducts = async (category?: string, featured?: boolean) => {
  const params = new URLSearchParams()
  if (category) params.append('category', category)
  if (featured !== undefined) params.append('featured', String(featured))
  const response = await fetch(`${API_BASE_URL}/products?${params}`)
  if (!response.ok) throw new Error('Failed to fetch products')
  return response.json()
}

export const getProduct = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/products/${id}`)
  if (!response.ok) throw new Error('Product not found')
  return response.json()
}

export const createProduct = async (token: string, product: any) => {
  const response = await fetch(`${API_BASE_URL}/admin/products`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || 'Failed to create product')
  }
  return response.json()
}

export const updateProduct = async (token: string, id: number, product: any) => {
  const response = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(product),
  })
  if (!response.ok) throw new Error('Failed to update product')
  return response.json()
}

export const deleteProduct = async (token: string, id: number) => {
  const response = await fetch(`${API_BASE_URL}/admin/products/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!response.ok) throw new Error('Failed to delete product')
}

// Collections
export const listCollections = async () => {
  const response = await fetch(`${API_BASE_URL}/collections`)
  if (!response.ok) throw new Error('Failed to fetch collections')
  return response.json()
}

export const getCollection = async (id: number) => {
  const response = await fetch(`${API_BASE_URL}/collections/${id}`)
  if (!response.ok) throw new Error('Collection not found')
  return response.json()
}

export const createCollection = async (token: string, collection: any) => {
  const response = await fetch(`${API_BASE_URL}/admin/collections`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(collection),
  })
  if (!response.ok) {
    try {
      const err = await response.json()
      throw new Error(err.detail || err.message || JSON.stringify(err))
    } catch (e) {
      throw new Error('Failed to create collection')
    }
  }
  return response.json()
}

export const updateCollection = async (token: string, id: number, collection: any) => {
  const response = await fetch(`${API_BASE_URL}/admin/collections/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(collection),
  })
  if (!response.ok) throw new Error('Failed to update collection')
  return response.json()
}

export const deleteCollection = async (token: string, id: number) => {
  const response = await fetch(`${API_BASE_URL}/admin/collections/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!response.ok) throw new Error('Failed to delete collection')
}

// Categories
export const listCategories = async () => {
  const response = await fetch(`${API_BASE_URL}/categories`)
  if (!response.ok) throw new Error('Failed to fetch categories')
  return response.json()
}

export const createCategory = async (token: string, category: any) => {
  const response = await fetch(`${API_BASE_URL}/admin/categories`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
  if (!response.ok) throw new Error('Failed to create category')
  return response.json()
}

export const updateCategory = async (token: string, id: number, category: any) => {
  const response = await fetch(`${API_BASE_URL}/admin/categories/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(category),
  })
  if (!response.ok) throw new Error('Failed to update category')
  return response.json()
}

export const deleteCategory = async (token: string, id: number) => {
  const response = await fetch(`${API_BASE_URL}/admin/categories/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!response.ok) throw new Error('Failed to delete category')
}

// Image Upload
export const uploadProductImage = async (token: string, file: File) => {
  const formData = new FormData()
  formData.append('file', file)
  const response = await fetch(`${API_BASE_URL}/admin/uploads/product-image`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  })
  if (!response.ok) {
    const error = await response.json()
    throw new Error(error.detail || 'Image upload failed')
  }
  return response.json()
}

export const deleteProductImage = async (token: string, publicId: string) => {
  const response = await fetch(`${API_BASE_URL}/admin/uploads/product-image?public_id=${publicId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  })
  if (!response.ok) throw new Error('Failed to delete image')
  return response.json()
}

// Frontend Config
export const listFrontendConfigs = async () => {
  const response = await fetch(`${API_BASE_URL}/frontend-config`)
  if (!response.ok) throw new Error('Failed to fetch configs')
  return response.json()
}

export const getFrontendConfig = async (key: string) => {
  const response = await fetch(`${API_BASE_URL}/frontend-config/${key}`)
  if (!response.ok) throw new Error('Config not found')
  return response.json()
}

export const updateFrontendConfig = async (token: string, key: string, configValue: any) => {
  const response = await fetch(`${API_BASE_URL}/admin/frontend-config/key/${key}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ config_value: configValue }),
  })
  if (!response.ok) throw new Error('Failed to update config')
  return response.json()
}
