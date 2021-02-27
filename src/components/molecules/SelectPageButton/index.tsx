import React from 'react';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Button from '@material-ui/core/Button';

const styles = require('./styles.module.scss');

export default function SelectPageButton() {
  return (
    <div className={styles.container}>
      <ButtonGroup variant="contained" color="primary">
        <Button href="/ProductIndex">商品</Button>
        <Button href="/PostageIndex">送料</Button>
        <Button href="/UserIndex">ユーザー</Button>
        <Button href="/CompanyLogo">会社ロゴ</Button>
      </ButtonGroup>
    </div>
  );
}
