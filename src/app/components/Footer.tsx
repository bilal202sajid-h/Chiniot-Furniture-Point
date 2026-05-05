import { Link } from 'react-router'

const WHATSAPP_NUMBER = '923180740205'

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  )
}

export function Footer() {
  return (
    <footer className="bg-[#1C1917] px-6 md:px-16 py-12">
      <div className="flex flex-col md:flex-row justify-between gap-12">
        {/* Brand + WhatsApp CTA */}
        <div className="max-w-xs">
          <div style={{ fontFamily: '"Playfair Display", serif', fontSize: '1.45rem', fontWeight: 600, color: '#F7F4F0', letterSpacing: '0.12em', marginBottom: '1rem' }}>
            CHINIOT FURNITURE POINT
          </div>
          <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', lineHeight: '1.75', color: '#6B6358', marginBottom: '1.5rem' }}>
            Premium furniture crafted with intention. Designed to age beautifully and live forever.
          </p>
          <a
            href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent('Hi, I\'d like to enquire about your furniture collection.')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 transition-opacity hover:opacity-90"
            style={{ backgroundColor: '#25D366', fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: '#fff' }}
          >
            <WhatsAppIcon />
            Chat on WhatsApp
          </a>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {[
            {
              title: 'Shop',
              links: [
                { label: 'New Arrivals', to: '/collections' },
                { label: 'Seating', to: '/collections' },
                { label: 'Tables', to: '/collections' },
                { label: 'Lighting', to: '/collections' },
                { label: 'All Pieces', to: '/collections' },
              ],
            },
            {
              title: 'Enquire',
              links: [
                { label: 'WhatsApp', href: `https://wa.me/${WHATSAPP_NUMBER}` },
                { label: 'Trade Programme', to: '/about' },
                { label: 'Interior Consultancy', to: '/about' },
                { label: 'Showrooms', to: '/about' },
              ],
            },
            {
              title: 'Company',
              links: [
                { label: 'About Us', to: '/about' },
                { label: 'Sustainability', to: '/sustainability' },
                { label: 'Careers', to: '/about' },
                { label: 'Press', to: '/about' },
              ],
            },
          ].map((col) => (
            <div key={col.title}>
              <div style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.65rem', letterSpacing: '0.18em', color: '#C4965A', textTransform: 'uppercase', marginBottom: '1.2rem' }}>
                {col.title}
              </div>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    {'href' in link ? (
                      <a href={link.href} target="_blank" rel="noopener noreferrer"
                        style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', color: '#6B6358' }}
                        className="hover:text-[#C4C0BA] transition-colors inline-flex items-center gap-1.5">
                        <WhatsAppIcon /> {link.label}
                      </a>
                    ) : (
                      <Link to={link.to!}
                        style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.82rem', color: '#6B6358' }}
                        className="hover:text-[#C4C0BA] transition-colors">
                        {link.label}
                      </Link>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 pt-8 flex flex-col md:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid #2D2926' }}>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: '#4A4440', letterSpacing: '0.06em' }}>
          © 2025 Chiniot Furniture Point. All rights reserved.
        </p>
        <div className="flex gap-6">
          {['Privacy Policy', 'Terms of Service', 'Cookie Preferences'].map((item) => (
            <a key={item} href="#" style={{ fontFamily: 'Inter, sans-serif', fontSize: '0.72rem', color: '#4A4440' }} className="hover:text-[#6B6358] transition-colors">
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  )
}
