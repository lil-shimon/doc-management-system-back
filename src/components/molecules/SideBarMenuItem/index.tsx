import React from 'react'
import { ListItem, ListItemIcon, ListItemText } from '@material-ui/core'

export type iconNames = 'inbox'

type SideBarMenuItemProps = {
  icon?: React.FC
  to?: string
  title: string
  anotherTab?: boolean
}

export default function SideBarMenuItem ({
  icon,
  title,
  to,
  anotherTab = false
}: SideBarMenuItemProps) {
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    window.open(to, '_blank')
  }

  return to ? (
    anotherTab ? (
      <div onClick={handleClick}>
        <ListItem button key={to}>
          {icon && <IconWrapper Icon={icon} />}
          <ListItemText primary={title} />
        </ListItem>
      </div>
    ) : (
      <ListItem button key={to} >
        {icon && <IconWrapper Icon={icon} />}
        <ListItemText primary={title} />
      </ListItem>
    )
  ) : (
    <ListItem>
      {icon && <IconWrapper Icon={icon} />}
      <ListItemText primary={title} />
    </ListItem>
  )
}


type IconWrapperProps = {
  Icon: React.FC
}

const IconWrapper: React.FC<IconWrapperProps> = ({ Icon }) => (
  <ListItemIcon>
    <Icon />
  </ListItemIcon>
)
