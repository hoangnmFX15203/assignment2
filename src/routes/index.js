import Home from '~/pages/Home';
import Staffs from '~/pages/Staffs';
import StaffWithId from '~/pages/StaffWithId';
import Salary from '~/pages/Salary';
import Department from '~/pages/Department';
import { HeaderOnly } from '~/component/Layout';

export const publicRoutes = [
    { path: '/', component: Home },
    { path: '/staff', component: Staffs },
    { path: '/staff/:id', component: StaffWithId },
    { path: '/department', component: Department },
    { path: '/salary', component: Salary },
];

// export const privateRoutes = [];
