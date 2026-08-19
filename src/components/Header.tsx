import { useState } from 'react'
import { useI18n, type Lang } from '../i18n'

const links = [
  { href: '#exterior', key: 'exterior' as const },
  { href: '#specs', key: 'specs' as const },
  { href: '#lead', key: 'lead' as const },
]

export function Header() {
  const { lang, setLang, t } = useI18n()
  const [open, setOpen] = useState(false)

  return (
    <header className={open ? 'top is-open' : 'top'}>
      <a className="mark" href="#top" onClick={() => setOpen(false)}>
        UNSLEPT
      </a>
      <nav className="nav">
        {links.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
            {t.nav[link.key]}
          </a>
        ))}
      </nav>
      <div className="top-end">
        <div className="lang">
          {(['ru', 'en'] as Lang[]).map((code) => (
            <button
              key={code}
              type="button"
              className={lang === code ? 'is-on' : ''}
              onClick={() => setLang(code)}
            >
              {code}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="burger"
          aria-expanded={open}
          aria-label="menu"
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  )
}
