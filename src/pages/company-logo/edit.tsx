import React, { useState, useEffect } from 'react';
import { CreateButton } from '../../components/atoms/Buttons/index';
import CancelButton from '../../components/atoms/Accordion/index';
import Link from 'next/link';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import { CssBaseline, Typography } from '@material-ui/core';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { editCompanyLogos } from '../../redux/slicers/companyLogo';
import { useRouter } from 'next/router';
import { getListCompanyLogo } from '../../redux/selectors/companyLogo';
import { CompanyLogoName } from '../../components/molecules/CompanyLogoName';
import { CompanyLogoUpload } from '../../components/molecules/CompanyLogoUpload';

const UseStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    content: { flexGrow: 1, padding: theme.spacing(3) },
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

export default function CompanyEditPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [name, setName] = useState<string | number>('');
  const [img, setImg] = useState<string>('');
  const classes = UseStyles();
  const companyLogos = useSelector(getListCompanyLogo, shallowEqual);

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    dispatch(editCompanyLogos(name, img));
    router.push('/company-logo/list');
  };

  useEffect(() => {
    companyLogos.map(c => {
      setName(c.name);
      setImg(c.img_path);
    });
  });

  const handleChangeName = (name: string): void => {
    setName(name);
  };

  const uploadFile = (img: string) => {
    setImg(img);
  };

  return (
    <div className={classes.container}>
      <CssBaseline />
      <main>
        <div>
          <h2>ロゴ編集</h2>
          <Typography>
            <form onSubmit={handleSubmit}>
              <CompanyLogoName
                handleChangeName={handleChangeName}
                name={name}
              />
              <CompanyLogoUpload uploadFile={uploadFile} img={img} />
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
