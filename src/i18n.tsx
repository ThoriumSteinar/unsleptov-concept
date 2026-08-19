import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'

export type Lang = 'ru' | 'en'

type Copy = {
  nav: { exterior: string; specs: string; lead: string }
  hero: {
    eyebrow: string
    claim: string
    model: string
    tagline: string
    scroll: string
    slotLabel: string
    slotSpec: string
    slotHint: string
  }
  exterior: {
    index: string
    title: string
    lead: string
    items: { code: string; name: string; text: string }[]
    shotCaption: string
  }
  specs: {
    index: string
    title: string
    lead: string
    items: { value: string; unit: string; label: string }[]
  }
  lead: {
    index: string
    title: string
    text: string
    discord: string
    copyNick: string
    copied: string
    name: string
    channel: string
    message: string
    send: string
    sentWebhook: string
    sentClipboard: string
  }
  footer: { motto: string; disclaimer: string; note: string }
}

const dict: Record<Lang, Copy> = {
  ru: {
    nav: { exterior: 'экстерьер', specs: 'данные', lead: 'заявка' },
    hero: {
      eyebrow: 'CONCEPT 01 · 2026',
      claim: 'не просто автомобиль',
      model: 'состояние, в котором ночь никогда не заканчивается',
      tagline:
        'Стремительный силуэт, выверенная аэродинамика и характер, который невозможно спутать с чем-либо другим.',
      scroll: 'листай',
      slotLabel: 'слот · turntable 360°',
      slotSpec: '240 кадров · 1920×1080 · webm + mp4',
      slotHint: 'здесь кузов будет крутиться сам, как видео-фон',
    },
    exterior: {
      index: '01',
      title: 'экстерьер',
      lead: 'Серебро подчёркивает каждую линию.',
      items: [
        {
          code: 'A',
          name: 'силуэт',
          text: 'От низкой передней части до плавно уходящей крыши и широкой задней стойки. Ни одной линии, поставленной для украшения.',
        },
        {
          code: 'B',
          name: 'детали',
          text: 'Многоспицевые диски, выразительная оптика и четыре выхлопных патрубка завершают образ.',
        },
        {
          code: 'C',
          name: 'салон',
          text: 'Минималистичная атмосфера и комфорт, созданные для долгих поездок без лишних остановок.',
        },
      ],
      shotCaption: 'Одинаково уверенно — у городских огней и на пустой ночной дороге.',
    },
    specs: {
      index: '02',
      title: 'данные',
      lead: 'Цифры черновые — скажи, что поменять.',
      items: [
        { value: '630', unit: 'л.с.', label: 'мощность' },
        { value: '3.2', unit: 'с', label: '0–100 км/ч' },
        { value: '315', unit: 'км/ч', label: 'максимум' },
        { value: '820', unit: 'Н·м', label: 'крутящий момент' },
        { value: 'AWD', unit: '', label: 'полный привод' },
        { value: '4', unit: 'шт', label: 'выхлопных патрубка' },
      ],
    },
    lead: {
      index: '03',
      title: 'заявка',
      text: 'Создан для тех, кому недостаточно просто ехать.',
      discord: 'discord',
      copyNick: 'копировать ник',
      copied: 'скопировано',
      name: 'имя',
      channel: 'telegram / почта',
      message: 'что нужно собрать',
      send: 'отправить',
      sentWebhook: 'заявка ушла. отвечу в discord',
      sentClipboard: 'бриф скопирован в буфер. пиши в discord: unsleptov',
    },
    footer: {
      motto: 'Stay awake. Stay moving.',
      disclaimer:
        'UNSLEPT — вымышленный концепт. Сайт сделан как портфолио-демо и не связан с существующими автопроизводителями.',
      note: 'unsleep protocol',
    },
  },
  en: {
    nav: { exterior: 'exterior', specs: 'data', lead: 'request' },
    hero: {
      eyebrow: 'CONCEPT 01 · 2026',
      claim: 'not just a car',
      model: 'a state where the night never ends',
      tagline:
        'A fast-forward silhouette, measured aerodynamics and a character you cannot mistake for anything else.',
      scroll: 'scroll',
      slotLabel: 'slot · turntable 360°',
      slotSpec: '240 frames · 1920×1080 · webm + mp4',
      slotHint: 'the body will spin here on its own, like a video background',
    },
    exterior: {
      index: '01',
      title: 'exterior',
      lead: 'Silver underlines every line.',
      items: [
        {
          code: 'A',
          name: 'silhouette',
          text: 'From the low nose to the smoothly falling roof and the wide rear haunch. Not one line drawn for decoration.',
        },
        {
          code: 'B',
          name: 'details',
          text: 'Multi-spoke wheels, expressive lighting and four exhaust tips complete the picture.',
        },
        {
          code: 'C',
          name: 'interior',
          text: 'A minimal atmosphere and comfort built for long drives with no unnecessary stops.',
        },
      ],
      shotCaption: 'Equally sure of itself in city lights and on an empty night road.',
    },
    specs: {
      index: '02',
      title: 'data',
      lead: 'Draft numbers — tell me what to change.',
      items: [
        { value: '630', unit: 'hp', label: 'power' },
        { value: '3.2', unit: 's', label: '0–100 km/h' },
        { value: '315', unit: 'km/h', label: 'top speed' },
        { value: '820', unit: 'Nm', label: 'torque' },
        { value: 'AWD', unit: '', label: 'all-wheel drive' },
        { value: '4', unit: 'pcs', label: 'exhaust tips' },
      ],
    },
    lead: {
      index: '03',
      title: 'request',
      text: 'Built for those who are not satisfied with simply driving.',
      discord: 'discord',
      copyNick: 'copy nick',
      copied: 'copied',
      name: 'name',
      channel: 'telegram / email',
      message: 'what should we build',
      send: 'send',
      sentWebhook: 'request sent. I’ll reply on discord',
      sentClipboard: 'brief copied to clipboard. hit discord: unsleptov',
    },
    footer: {
      motto: 'Stay awake. Stay moving.',
      disclaimer:
        'UNSLEPT is a fictional concept. This site is a portfolio demo and is not affiliated with any existing car manufacturer.',
      note: 'unsleep protocol',
    },
  },
}

type Ctx = { lang: Lang; setLang: (lang: Lang) => void; t: Copy }

const I18nContext = createContext<Ctx | null>(null)

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Lang>('ru')

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, t: dict[lang] }), [lang])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) throw new Error('useI18n outside provider')
  return ctx
}
