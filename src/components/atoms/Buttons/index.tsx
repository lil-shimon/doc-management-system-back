import React from 'react';
import {
  Edit,
  Delete,
  Save,
  Details,
  ExitToApp,
  Add,
} from '@material-ui/icons';
import createIcon from '@material-ui/icons/Create';
import CircularProgress from '@material-ui/core/CircularProgress';
import MaterialButton from '@material-ui/core/Button';
import useStyles from './styles';
import clsx from 'clsx';

const styles = require('../../styles/bottons.module.css');

export const CustomButton = ({
  color,
  variant = 'contained',
  ...props
}: any) => {
  const classes = useStyles();

  let className =
    color === 'grey'
      ? ''
      : clsx(
          styles[color],
          props.disabled && [styles.disabled, styles[color + '_disabled']]
        );
  const { className: defaultClassName, ...otherProps } = props;
  className = clsx(className, defaultClassName);

  return color === 'grey' ? (
    <MaterialButton color="default" variant={variant} {...props} />
  ) : (
    <MaterialButton
      className={className}
      variant="contained"
      color="primary"
      {...otherProps}
    />
  );
};

export const WithIconButton = ({
  icon: Icon,
  children,
  loading = false,
  ...props
}: any) => {
  const classes = useStyles();

  return (
    <CustomButton {...props} disabled={loading}>
      {loading ? (
        <CircularProgress
          className={classes.circlureIcon}
          size="1rem"
          data-testid="loadingIcon"
        />
      ) : (
        <Icon className={classes.icon} data-testid="icon" />
      )}
      {children}
    </CustomButton>
  );
};

export const CreateButton = ({ children = '作成', ...props }) => (
  <WithIconButton color="info" icon={createIcon} {...props}>
    {children}
  </WithIconButton>
);

export const AddButton = ({ children = '追加', ...props }) => (
  <WithIconButton color="info" icon={Add} {...props}>
    {children}
  </WithIconButton>
);

export const EditButton = ({ children = '編集', ...props }) => (
  <WithIconButton color="primary" icon={Edit} {...props}>
    {children}
  </WithIconButton>
);

export const DetailButton = ({ children = '詳細', ...props }) => (
  <WithIconButton color="primary" icon={Details} {...props}>
    {children}
  </WithIconButton>
);

export const DeleteButton = ({ children = '削除', ...props }) => (
  <WithIconButton color="secondary" icon={Delete} {...props}>
    {children}
  </WithIconButton>
);

export const SaveButton = ({ children = '保存', ...props }) => (
  <WithIconButton color="success" icon={Save} {...props}>
    {children}
  </WithIconButton>
);

export const LoginButton = ({ children = 'ログイン', ...props }) => {
  return (
    <WithIconButton color="warning" icon={ExitToApp} {...props}>
      {children}
    </WithIconButton>
  );
};

export const BackButton = ({ children = '戻る', url, ...props }: any) => {
  return <div />;
};
