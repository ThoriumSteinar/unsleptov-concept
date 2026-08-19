import { useState, type FormEvent } from 'react'
import { Header } from './components/Header'
import { CarStage } from './components/CarStage'
import { DISCORD, leadWebhook, nightShot } from './config'
import { I18nProvider, useI18n } from './i18n'

function Site() {
  const { t } = useI18n()
  const [copied, setCopied] = useState(false)
  const [status, setStatus] = useState<'idle' | 'webhook' | 'clipboard'>('idle')
  const [name, setName] = useState('')
  const [channel, setChannel] = useState('')
  const [message, setMessage] = useState('')

  async function copyNick() {
    try {
      await navigator.clipboard.writeText(DISCORD)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const brief = `UNSLEPTOV concept — заявка\nимя: ${name || '—'}\nканал: ${channel || '—'}\nзадача: ${message || '—'}`

    if (leadWebhook) {
      try {
        await fetch(leadWebhook, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ content: brief }),
        })
        setStatus('webhook')
        return
      } catch {
        // сеть или вебхук недоступны — падаем в буфер обмена
      }
    }

    try {
      await navigator.clipboard.writeText(brief)
    } catch {
      // буфер может быть заблокирован браузером
    }
    setStatus('clipboard')
  }

  return (
    <>
      <div className="fx" aria-hidden="true">
        <div className="fx-grid" />
        <div className="fx-beam" />
        <div className="fx-glow" />
      </div>

      <Header />

      <main id="top">
        <section className="hero">
          <p className="eyebrow">{t.hero.eyebrow}</p>
          <h1 className="wordmark">UNSLEPT</h1>
          <p className="claim">{t.hero.claim}</p>
          <p className="model">{t.hero.model}</p>
          <CarStage />
          <p className="tagline">{t.hero.tagline}</p>
          <p className="scroll">{t.hero.scroll}</p>
        </section>

        <section id="exterior" className="block">
          <header className="block-head">
            <span>{t.exterior.index}</span>
            <h2>{t.exterior.title}</h2>
          </header>
          <p className="lead">{t.exterior.lead}</p>
          <div className="cards">
            {t.exterior.items.map((item) => (
              <article key={item.code} className="card">
                <p className="card-code">{item.code}</p>
                <h3>{item.name}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
          <figure className="shot">
            <img src={nightShot} alt="UNSLEPT в ночном городе" loading="lazy" />
            <figcaption>{t.exterior.shotCaption}</figcaption>
          </figure>
        </section>

        <section id="specs" className="block">
          <header className="block-head">
            <span>{t.specs.index}</span>
            <h2>{t.specs.title}</h2>
          </header>
          <p className="lead">{t.specs.lead}</p>
          <ul className="specs">
            {t.specs.items.map((item) => (
              <li key={item.label}>
                <p className="spec-value">
                  {item.value}
                  <span>{item.unit}</span>
                </p>
                <p className="spec-label">{item.label}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="lead" className="block">
          <header className="block-head">
            <span>{t.lead.index}</span>
            <h2>{t.lead.title}</h2>
          </header>
          <p className="lead">{t.lead.text}</p>
          <div className="lead-grid">
            <div className="card discord">
              <p className="card-code">{t.lead.discord}</p>
              <p className="nick">{DISCORD}</p>
              <button type="button" className="btn btn-acid" onClick={copyNick}>
                {copied ? t.lead.copied : t.lead.copyNick}
              </button>
            </div>
            <form className="form" onSubmit={onSubmit}>
              <label>
                {t.lead.name}
                <input value={name} onChange={(e) => setName(e.target.value)} autoComplete="name" />
              </label>
              <label>
                {t.lead.channel}
                <input
                  value={channel}
                  onChange={(e) => setChannel(e.target.value)}
                  autoComplete="email"
                />
              </label>
              <label>
                {t.lead.message}
                <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4} />
              </label>
              <button className="btn btn-acid" type="submit">
                {t.lead.send}
              </button>
              {status !== 'idle' ? (
                <p className="sent">
                  {status === 'webhook' ? t.lead.sentWebhook : t.lead.sentClipboard}
                </p>
              ) : null}
            </form>
          </div>
        </section>
      </main>

      <footer className="foot">
        <p className="motto">{t.footer.motto}</p>
        <p className="disclaimer">{t.footer.disclaimer}</p>
        <p className="foot-note">{t.footer.note}</p>
      </footer>
    </>
  )
}

export default function App() {
  return (
    <I18nProvider>
      <Site />
    </I18nProvider>
  )
}
