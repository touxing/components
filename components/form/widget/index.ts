import { withInstall } from 'utils'

import Widget from './widget.vue'

export const Widget = withInstall(Widget)
export default Widget

export * from './widget'
export type { WidgetInstance } from './src/instance'