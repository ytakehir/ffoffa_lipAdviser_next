import { Meta, StoryObj } from '@storybook/react'
import { Notification } from './notification'

const meta: Meta<typeof Notification> = {
  title: 'Components/Notification',
  component: Notification,
}

export default meta

export const Default: StoryObj<typeof Notification> = {}
