import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import { CssBaseline } from '@material-ui/core';
import CompanyLogoIndex from '../../components/organisms/CompanyLogoPage';
import SelectCompanyLogoTab from '../../components/molecules/SelectCompanyLogoTab';
import Link from 'next/link';
import { CreateButton } from '../../components/atoms/Buttons';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  content: {
    flexGrow: 1,
  },
  body: {
    width: 'calc(100% - 240px)',
    marginLeft: '240px',
  },
  btn: {
    marginTop: '25px',
    marginBottom: '25px',
  },
}));

export default function CompanyLogoPage() {
  const classes = useStyles();

  return (
    <div>
      <CssBaseline />
      <main>
        <h2>会社ロゴ一覧</h2>
        <Typography paragraph>
          <div className={classes.btn}>
            <Link href="/company-logo/new">
              <CreateButton />
            </Link>
          </div>
          <CompanyLogoIndex />
        </Typography>
      </main>
    </div>
  );
}

export const getStaticProps = async () => {
  return {
    props: {
      layout: true,
    },
  };
};
