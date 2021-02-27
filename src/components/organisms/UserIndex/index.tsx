import { Button, Paper, Table, TableHead, TableRow } from '@material-ui/core';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getListUser } from '../../../redux/selectors/user';
import { getUsers, userDelete, selectUsers } from '../../../redux/slicers/user';
import CreateButton from '../../molecules/CreateButton';
import { useRouter } from 'next/router';
import UseStyles from './styles';

export default function UserIndex() {
  const classes = UseStyles();
  const dispatch = useDispatch();
  const users = useSelector(getListUser, shallowEqual);
  const [name, setName] = useState('');
  const [id, setId] = useState(0);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    dispatch(getUsers());
  }, []);

  console.log('users', users);

  const sortUsers = users.sort(function(a, b) {
    if (a.id > b.id) return -1;
    if (a.id < b.id) return 1;
    return 0;
  });

  return (
    <div className={classes.root}>
      <Link href="/users/new">
        <a className={classes.link}>
          <CreateButton />
        </a>
      </Link>
      <Paper>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky tabel">
            <TableHead>
              <TableRow>
                <TableCell>名前</TableCell>
                <TableCell>メールアドレス</TableCell>
                <TableCell>編集</TableCell>
                <TableCell>削除</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {sortUsers.map(user => (
                <TableRow key={user.id}>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <a
                      onClick={(
                        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
                      ): void => {
                        dispatch(selectUsers(user.id));
                        router.push('/users/edit');
                      }}
                    >
                      <Button color="primary" startIcon={<EditIcon />} />
                    </a>
                  </TableCell>
                  <TableCell>
                    <a
                      onClick={(
                        event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
                      ): void => {
                        dispatch(
                          userDelete(dispatch, [Number(user.id)], user.id)
                        );
                      }}
                    >
                      <Button
                        color="secondary"
                        className={classes.button}
                        startIcon={<DeleteIcon />}
                      />
                    </a>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </div>
  );
}
