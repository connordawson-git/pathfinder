import departments from '@/routes/departments';
import pages from '@/routes/pages';
import passwords from '@/routes/passwords';
import users from '@/routes/users';

export default [
    ...departments,
    ...pages,
    ...passwords,
    ...users,
];
