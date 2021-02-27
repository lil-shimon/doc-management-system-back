import React, { useState } from 'react';
import { CreateButton } from '../../components/atoms/Buttons/index';
import CancelButton from '../../components/atoms/Accordion/index';
import Link from 'next/link';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { CssBaseline, Typography } from '@material-ui/core';
import { useDispatch } from 'react-redux';
import { newCompanyLogos } from '../../redux/slicers/companyLogo';
import { useRouter } from 'next/router';
import { CompanyLogoName } from '../../components/molecules/CompanyLogoName';

const UseStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    container: {
      display: 'flex',
    },
    body: {
      width: `calc(100% - 240px)`,
      marginLeft: '240px',
      marginTop: '75px',
    },
    btn: {
      textAlign: 'right',
      marginTop: '25px',
    },
    link: {
      textDecoration: 'none',
      color: 'black',
    },
  })
);

export default function CompanyNewPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [name, setName] = useState<string | number>('');
  const [img, setImg] = useState('');
  const classes = UseStyles();

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(newCompanyLogos(name, img));
    router.push('/company-logo/list');
  };

  const uploadFile = (e: any) => {
    const file = e.target.files[0];
    setImg(file);
  };

  const handleChangeName = (name: string | number): void => {
    setName(name);
  };

  return (
    <div className={classes.container}>
      <CssBaseline />
      <main>
        <div>
          <h2>新規登録</h2>
          <Typography>
            <form onSubmit={handleSubmit}>
              <CompanyLogoName
                handleChangeName={handleChangeName}
                name={name}
              />
              <input type="file" name="img" onChange={uploadFile} />
              <div className={classes.btn}>
                <Link href="/company-logo/list">
                  <a className={classes.link}>
                    <CancelButton />
                  </a>
                </Link>
                <CreateButton type="submit" />
              </div>
            </form>
          </Typography>
        </div>
      </main>
    </div>
  );
}

export const getStaticProps = async () => ({
  props: {
    layout: true,
  },
});
