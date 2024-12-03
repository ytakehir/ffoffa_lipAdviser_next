import { Meta, StoryObj } from '@storybook/react'
import { Home } from './home'

const meta: Meta<typeof Home> = {
  title: 'Components/Home',
  component: Home,
}

export default meta

const options = [
  { value: 'ブランドA', label: 'ブランドA' },
  { value: 'ブランドB', label: 'ブランドB' },
  { value: 'ブランドC', label: 'ブランドC' },
  { value: 'ブランドD', label: 'ブランドD' },
]

const secondOptions = [
  { value: 'リップA', label: 'リップA' },
  { value: 'リップB', label: 'リップB' },
  { value: 'リップC', label: 'リップC' },
  { value: 'リップD', label: 'リップD' },
]

export const Default: StoryObj<typeof Home> = {
  args: {
    options: options,
    secondOptions: secondOptions,
  },
}
