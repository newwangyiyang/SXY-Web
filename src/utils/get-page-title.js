import defaultSettings from '@/settings'

const title = defaultSettings.title || '书小驿'

export default function getPageTitle(pageTitle) {
  if (pageTitle) {
    return `${pageTitle}`
  }
  return `${title}`
}
