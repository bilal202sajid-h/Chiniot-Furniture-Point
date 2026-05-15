import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import AdminLayout from '../../components/AdminLayout'
import { Card, CardContent, CardHeader, CardTitle } from '../../components/ui/card'
import { Button } from '../../components/ui/button'
import { Input } from '../../components/ui/input'
import { Alert, AlertDescription } from '../../components/ui/alert'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs'
import { updateFrontendConfig, uploadProductImage } from '../../services/api'
import { getToken, isAdminLoggedIn } from '../../services/auth'
import { Save, Upload } from 'lucide-react'

interface NavItem {
  label: string
  href: string
}

interface HeroConfig {
  title: string
  subtitle: string
  image_url: string
  cta_text: string
  cta_link: string
}

interface FooterConfig {
  company_name: string
  description: string
  phone: string
  email: string
  address: string
}

export default function FrontendEditorPage() {
  const navigate = useNavigate()
  const token = getToken()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  // Navbar
  const [navItems, setNavItems] = useState<NavItem[]>([
    { label: 'Home', href: '/' },
    { label: 'Collections', href: '/collections' },
    { label: 'About', href: '/about' },
    { label: 'Contact', href: '/contact' },
  ])

  // Hero
  const [heroConfig, setHeroConfig] = useState<HeroConfig>({
    title: 'Premium Wooden Furniture',
    subtitle: 'Handcrafted from Pakistan for your home',
    image_url: 'https://images.unsplash.com/photo-1772797583328-f83bc3f94f80?w=1200&q=80',
    cta_text: 'Shop Now',
    cta_link: '/collections',
  })
  const [heroImageUploading, setHeroImageUploading] = useState(false)

  // Footer
  const [footerConfig, setFooterConfig] = useState<FooterConfig>({
    company_name: 'Chiniot Furniture',
    description: 'Quality wooden furniture crafted for Pakistani homes',
    phone: '+92-XXX-XXXXXXX',
    email: 'info@chinotfurniture.com',
    address: 'Chiniot, Punjab, Pakistan',
  })

  // Social Links
  const [socialLinks, setSocialLinks] = useState({
    facebook: '',
    instagram: '',
    whatsapp: '',
    youtube: '',
  })

  useEffect(() => {
    if (!isAdminLoggedIn()) {
      navigate('/admin/login')
      return
    }
  }, [navigate])

  const handleNavItemChange = (index: number, field: keyof NavItem, value: string) => {
    const updated = [...navItems]
    updated[index][field] = value
    setNavItems(updated)
  }

  const addNavItem = () => {
    setNavItems([...navItems, { label: '', href: '' }])
  }

  const removeNavItem = (index: number) => {
    setNavItems(navItems.filter((_, i) => i !== index))
  }

  const handleHeroImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file || !token) return

    setHeroImageUploading(true)
    setError('')
    try {
      const result = await uploadProductImage(token, file)
      setHeroConfig({ ...heroConfig, image_url: result.image_url })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Image upload failed')
    } finally {
      setHeroImageUploading(false)
    }
  }

  const saveNavbar = async () => {
    if (!token) return
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      await updateFrontendConfig(token, 'navbar', { items: navItems })
      setSuccess('Navbar updated successfully!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save navbar')
    } finally {
      setLoading(false)
    }
  }

  const saveHero = async () => {
    if (!token) return
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      await updateFrontendConfig(token, 'hero', heroConfig)
      setSuccess('Hero section updated successfully!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save hero section')
    } finally {
      setLoading(false)
    }
  }

  const saveFooter = async () => {
    if (!token) return
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      await updateFrontendConfig(token, 'footer', footerConfig)
      setSuccess('Footer updated successfully!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save footer')
    } finally {
      setLoading(false)
    }
  }

  const saveSocial = async () => {
    if (!token) return
    setLoading(true)
    setError('')
    setSuccess('')

    try {
      await updateFrontendConfig(token, 'social_links', socialLinks)
      setSuccess('Social links updated successfully!')
      setTimeout(() => setSuccess(''), 3000)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to save social links')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Frontend Editor</h1>
          <p className="text-gray-600 mt-1">Manage frontend content and configuration</p>
        </div>

        {error && (
          <Alert variant="destructive">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="bg-green-50 border-green-200">
            <AlertDescription className="text-green-800">{success}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="navbar" className="w-full">
          <TabsList className="bg-gray-100">
            <TabsTrigger value="navbar">Navbar</TabsTrigger>
            <TabsTrigger value="hero">Hero Section</TabsTrigger>
            <TabsTrigger value="footer">Footer</TabsTrigger>
            <TabsTrigger value="social">Social Links</TabsTrigger>
          </TabsList>

          {/* Navbar Tab */}
          <TabsContent value="navbar">
            <Card>
              <CardHeader>
                <CardTitle>Navigation Bar</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {navItems.map((item, index) => (
                    <div key={index} className="flex gap-2 items-end">
                      <div className="flex-1 space-y-1">
                        <label className="text-sm font-medium">Label</label>
                        <Input
                          value={item.label}
                          onChange={(e) =>
                            handleNavItemChange(index, 'label', e.target.value)
                          }
                          placeholder="Menu item label"
                        />
                      </div>
                      <div className="flex-1 space-y-1">
                        <label className="text-sm font-medium">Link</label>
                        <Input
                          value={item.href}
                          onChange={(e) => handleNavItemChange(index, 'href', e.target.value)}
                          placeholder="/page"
                        />
                      </div>
                      <Button
                        variant="outline"
                        onClick={() => removeNavItem(index)}
                        className="px-3"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>

                <Button
                  variant="outline"
                  onClick={addNavItem}
                  className="w-full"
                >
                  Add Navigation Item
                </Button>

                <Button
                  onClick={saveNavbar}
                  disabled={loading}
                  className="w-full bg-amber-700 hover:bg-amber-800"
                >
                  <Save size={18} className="mr-2" />
                  Save Navbar
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Hero Tab */}
          <TabsContent value="hero">
            <Card>
              <CardHeader>
                <CardTitle>Hero Section</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Hero Image</label>
                  {heroConfig.image_url && (
                    <img
                      src={heroConfig.image_url}
                      alt="Hero preview"
                      className="w-full h-48 object-cover rounded"
                    />
                  )}
                  <div className="flex gap-2">
                    <Input
                      type="file"
                      accept="image/*"
                      onChange={handleHeroImageUpload}
                      disabled={heroImageUploading}
                      className="flex-1"
                    />
                    {heroImageUploading && (
                      <span className="text-sm text-gray-500 flex items-center">
                        Uploading...
                      </span>
                    )}
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input
                    value={heroConfig.title}
                    onChange={(e) =>
                      setHeroConfig({ ...heroConfig, title: e.target.value })
                    }
                    placeholder="Hero title"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Subtitle</label>
                  <Input
                    value={heroConfig.subtitle}
                    onChange={(e) =>
                      setHeroConfig({ ...heroConfig, subtitle: e.target.value })
                    }
                    placeholder="Hero subtitle"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">CTA Button Text</label>
                    <Input
                      value={heroConfig.cta_text}
                      onChange={(e) =>
                        setHeroConfig({ ...heroConfig, cta_text: e.target.value })
                      }
                      placeholder="Button text"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">CTA Button Link</label>
                    <Input
                      value={heroConfig.cta_link}
                      onChange={(e) =>
                        setHeroConfig({ ...heroConfig, cta_link: e.target.value })
                      }
                      placeholder="/page"
                    />
                  </div>
                </div>

                <Button
                  onClick={saveHero}
                  disabled={loading}
                  className="w-full bg-amber-700 hover:bg-amber-800"
                >
                  <Save size={18} className="mr-2" />
                  Save Hero Section
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Footer Tab */}
          <TabsContent value="footer">
            <Card>
              <CardHeader>
                <CardTitle>Footer Content</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Company Name</label>
                  <Input
                    value={footerConfig.company_name}
                    onChange={(e) =>
                      setFooterConfig({ ...footerConfig, company_name: e.target.value })
                    }
                    placeholder="Company name"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    value={footerConfig.description}
                    onChange={(e) =>
                      setFooterConfig({ ...footerConfig, description: e.target.value })
                    }
                    placeholder="Company description"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md"
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Phone</label>
                  <Input
                    value={footerConfig.phone}
                    onChange={(e) =>
                      setFooterConfig({ ...footerConfig, phone: e.target.value })
                    }
                    placeholder="+92-XXX-XXXXXXX"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Email</label>
                  <Input
                    type="email"
                    value={footerConfig.email}
                    onChange={(e) =>
                      setFooterConfig({ ...footerConfig, email: e.target.value })
                    }
                    placeholder="email@example.com"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Address</label>
                  <Input
                    value={footerConfig.address}
                    onChange={(e) =>
                      setFooterConfig({ ...footerConfig, address: e.target.value })
                    }
                    placeholder="Company address"
                  />
                </div>

                <Button
                  onClick={saveFooter}
                  disabled={loading}
                  className="w-full bg-amber-700 hover:bg-amber-800"
                >
                  <Save size={18} className="mr-2" />
                  Save Footer
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Social Links Tab */}
          <TabsContent value="social">
            <Card>
              <CardHeader>
                <CardTitle>Social Media Links</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Facebook URL</label>
                  <Input
                    value={socialLinks.facebook}
                    onChange={(e) =>
                      setSocialLinks({ ...socialLinks, facebook: e.target.value })
                    }
                    placeholder="https://facebook.com/..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Instagram URL</label>
                  <Input
                    value={socialLinks.instagram}
                    onChange={(e) =>
                      setSocialLinks({ ...socialLinks, instagram: e.target.value })
                    }
                    placeholder="https://instagram.com/..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">WhatsApp Number</label>
                  <Input
                    value={socialLinks.whatsapp}
                    onChange={(e) =>
                      setSocialLinks({ ...socialLinks, whatsapp: e.target.value })
                    }
                    placeholder="+92..."
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">YouTube URL</label>
                  <Input
                    value={socialLinks.youtube}
                    onChange={(e) =>
                      setSocialLinks({ ...socialLinks, youtube: e.target.value })
                    }
                    placeholder="https://youtube.com/..."
                  />
                </div>

                <Button
                  onClick={saveSocial}
                  disabled={loading}
                  className="w-full bg-amber-700 hover:bg-amber-800"
                >
                  <Save size={18} className="mr-2" />
                  Save Social Links
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  )
}
