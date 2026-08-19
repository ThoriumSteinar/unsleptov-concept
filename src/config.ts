// Пути к файлам из public/ строим от BASE_URL: на GitHub Pages сайт живёт в подпапке.
const asset = (path: string) => `${import.meta.env.BASE_URL}${path}`

export const turntable: { webm?: string; mp4?: string; poster?: string } | null = {
  mp4: asset('car/turntable.mp4'),
}

export const nightShot = asset('car/night.png')

// Discord webhook для формы. Пока null — бриф копируется в буфер обмена.
export const leadWebhook: string | null = null

export const DISCORD = 'unsleptov'
