import { useEffect, useState } from 'react'
import { turntable } from '../config'
import { useI18n } from '../i18n'

export function CarStage() {
  const { t } = useI18n()
  const calm = useReducedMotion()

  return (
    <div className="stage">
      <span className="stage-corner tl" />
      <span className="stage-corner tr" />
      <span className="stage-corner bl" />
      <span className="stage-corner br" />

      {turntable ? (
        <video
          className="stage-video"
          poster={turntable.poster}
          autoPlay={!calm}
          controls={calm}
          muted
          loop
          playsInline
          preload="metadata"
        >
          {turntable.webm ? <source src={turntable.webm} type="video/webm" /> : null}
          {turntable.mp4 ? <source src={turntable.mp4} type="video/mp4" /> : null}
        </video>
      ) : (
        <div className="stage-slot">
          <CarSilhouette />
          <p className="stage-label">{t.hero.slotLabel}</p>
          <p className="stage-spec">{t.hero.slotSpec}</p>
          <p className="stage-hint">{t.hero.slotHint}</p>
        </div>
      )}

      <div className="stage-floor" />
    </div>
  )
}

function useReducedMotion() {
  const [calm, setCalm] = useState(false)

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: reduce)')
    setCalm(query.matches)
    const onChange = () => setCalm(query.matches)
    query.addEventListener('change', onChange)
    return () => query.removeEventListener('change', onChange)
  }, [])

  return calm
}

function CarSilhouette() {
  return (
    <svg className="car" viewBox="0 0 800 300" role="img" aria-label="UNSLEPTOV concept">
      <ellipse className="car-glow" cx="400" cy="246" rx="300" ry="18" />
      <path
        className="car-body"
        d="M40 210 L92 168 Q148 140 238 132 L320 110 Q396 88 490 90 Q582 92 648 124 L730 160 Q770 176 764 210 Z"
      />
      <path className="car-line" d="M96 166 Q300 128 500 122 Q640 122 728 158" />
      <path className="car-lightbar" d="M700 148 L756 164" />
      <text className="car-name" x="400" y="186" textAnchor="middle">
        UNSLEPT
      </text>
      <g className="car-wheel">
        <circle cx="196" cy="200" r="38" />
        <circle className="car-rim" cx="196" cy="200" r="18" />
      </g>
      <g className="car-wheel">
        <circle cx="596" cy="200" r="38" />
        <circle className="car-rim" cx="596" cy="200" r="18" />
      </g>
    </svg>
  )
}
