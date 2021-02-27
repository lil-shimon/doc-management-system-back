import React from 'react';
import { CreateButton } from '../../atoms/Buttons/index';

const styles = require('./styles.module.scss');

export default function PostageCreateButton() {
  return (
    <div className={styles.new}>
      <CreateButton />
    </div>
  );
}
