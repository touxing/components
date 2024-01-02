import type { ExtractPropTypes } from 'vue'

// todo:
export const widgetProps = {
  /**
   * @description the button will not show until the scroll height reaches this value.
   */
  visibilityHeight: {
    type: Number,
    default: 200,
  },
  /**
   * @description the target to trigger scroll.
   */
  target: {
    type: String,
    default: '',
  },
  /**
   * @description right distance.
   */
  right: {
    type: Number,
    default: 40,
  },
  /**
   * @description bottom distance.
   */
  bottom: {
    type: Number,
    default: 40,
  },
} as const
export type WidgetPropsProps = ExtractPropTypes<typeof widgetProps>

export const widgetEmits = {
  click: (evt: MouseEvent) => evt instanceof MouseEvent,
}
export type widgetEmits = typeof widgetEmits
