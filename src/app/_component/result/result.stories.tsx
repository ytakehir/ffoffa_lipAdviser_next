import { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { Result } from './result'

const meta: Meta<typeof Result> = {
  title: 'Components/Result',
  component: Result,
}

export default meta

export const Default: StoryObj<typeof Result> = {
  args: {
    filterClick: action('clicked'),
  },
}
