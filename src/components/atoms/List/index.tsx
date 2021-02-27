import { createStyles, makeStyles, Theme } from '@material-ui/core';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MailIcon from '@material-ui/icons/Mail';
import MenuIcon from '@material-ui/icons/Menu';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import React from 'react';

const  useStyles = makeStyles(() => 
  createStyles({
    title: {
      flexGrow: 1
    },
    list: {
      listStyle: "none",
      textDecoration: "none",
      borderBottom: "none"
    },
    li: {
      textDecoration: "none",
      borderBottom: "none"
    }
  })
)

export default function AccordionMenu() {

  const classes = useStyles()

  return (
    <div>
        <Accordion>
            <AccordionSummary>
              <IconButton edge="start" color="inherit" aria-label="menu">
                  <MenuIcon />
              </IconButton>
              <Toolbar>
                <Typography variant="h6" className={classes.title}>
                  クェスタ株式会社
                </Typography>
                <Button color="inherit">ログイン</Button>
              </Toolbar>
            </AccordionSummary>
            <AccordionDetails>
              <List>
                {["新規登録", "項目登録","見積一覧", '受注一覧', '案件管理', 'メンテナンス'].map((text, index) => (
                  <ListItem>
                    <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItem>
                ))}
              </List>
            </AccordionDetails>
        </Accordion>
    </div>
  );
}