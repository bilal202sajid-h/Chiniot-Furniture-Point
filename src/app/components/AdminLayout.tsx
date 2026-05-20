import { ReactNode, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router'
import { Button } from '../components/ui/button'
import { logout } from '../services/auth'
import { Menu, X, LogOut, LayoutDashboard, Package, Layers, Tag, Settings } from 'lucide-react'

interface AdminLayoutProps {
  children: ReactNode
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    setMobileOpen(false)
  }, [location.pathname])

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setMobileOpen(false)
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  const navItems = [
    { label: 'Dashboard', href: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Products', href: '/admin/products', icon: Package },
    { label: 'Collections', href: '/admin/collections', icon: Layers },
    { label: 'Categories', href: '/admin/categories', icon: Tag },
    { label: 'Frontend Editor', href: '/admin/editor', icon: Settings },
  ]

  const isActive = (href: string) => location.pathname === href
  const showLabels = !sidebarCollapsed || mobileOpen

  const handleNavClick = (href: string) => {
    navigate(href)
    setMobileOpen(false)
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {mobileOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-gray-200 bg-white transition-transform duration-300 lg:static lg:z-auto lg:translate-x-0 ${
          mobileOpen ? 'translate-x-0' : '-translate-x-full'
        } ${sidebarCollapsed ? 'lg:w-20' : 'lg:w-64'}`}
      >
        <div
          className={`flex items-center border-b border-gray-200 p-4 ${
            showLabels ? 'justify-between' : 'justify-center lg:justify-center'
          }`}
        >
          {showLabels && <h2 className="text-lg font-bold text-amber-900">Admin</h2>}
          <button
            type="button"
            onClick={() => {
              if (window.innerWidth < 1024) {
                setMobileOpen(false)
              } else {
                setSidebarCollapsed(!sidebarCollapsed)
              }
            }}
            className="rounded p-2 transition hover:bg-gray-100"
            aria-label={mobileOpen ? 'Close menu' : 'Toggle sidebar'}
          >
            {mobileOpen ? <X size={20} /> : sidebarCollapsed ? <Menu size={20} /> : <X size={20} />}
          </button>
        </div>

        <nav className="flex-1 space-y-2 overflow-y-auto p-4">
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.href}
                type="button"
                onClick={() => handleNavClick(item.href)}
                title={!showLabels ? item.label : undefined}
                className={`flex w-full items-center gap-3 rounded px-4 py-2 transition ${
                  isActive(item.href)
                    ? 'bg-amber-100 font-medium text-amber-900'
                    : 'text-gray-700 hover:bg-gray-100'
                } ${!showLabels ? 'lg:justify-center lg:px-2' : ''}`}
              >
                <Icon size={20} className="shrink-0" />
                {showLabels && <span className="truncate">{item.label}</span>}
              </button>
            )
          })}
        </nav>

        <div className="border-t border-gray-200 p-4">
          <Button
            onClick={handleLogout}
            variant="outline"
            className={`flex w-full items-center gap-2 ${!showLabels ? 'lg:justify-center lg:px-2' : 'justify-center'}`}
          >
            <LogOut size={18} className="shrink-0" />
            {showLabels && <span>Logout</span>}
          </Button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center gap-3 border-b border-gray-200 bg-white px-4 py-3 lg:hidden">
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            className="rounded p-2 transition hover:bg-gray-100"
            aria-label="Open menu"
          >
            <Menu size={20} />
          </button>
          <h2 className="truncate text-lg font-bold text-amber-900">Chiniot Furniture Admin</h2>
        </header>

        <main className="flex-1 overflow-auto">
          <div className="w-full max-w-full p-4 sm:p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
