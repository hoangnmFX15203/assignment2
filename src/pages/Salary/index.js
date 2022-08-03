import styles from './Salary.module.scss';
import className from 'classnames/bind';
import { STAFFS } from '~/assets/data/staffs';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { staffListSelector, salarySelector } from '~/redux/selector';
import { fetchStaff, fetchSalary } from '~/redux/reducer/staffsReducer';
import { useDispatch, useSelector } from 'react-redux';

const cx = className.bind(styles);

function Salary() {
    const dispatch = useDispatch(staffListSelector);
    useEffect(() => {
        dispatch(fetchStaff());
        dispatch(fetchSalary());
    }, []);
    const staffListSalary = useSelector(salarySelector);

    const [sort, setSort] = useState(0);
    const [staffs, setStaffs] = useState(staffListSalary);

    const sortHandler = (e) => {
        setSort(e.target.value);
    };

    useEffect(() => {
        if (sort == '1') {
            const increaseSalary = [...staffs].sort(function (a, b) {
                // const salaryA = Math.round(
                //     a.salaryScale * 3000000 + a.overTime * 200000,
                // );
                // const salaryB = Math.round(
                //     b.salaryScale * 3000000 + b.overTime * 200000,
                // );
                return a.salary - b.salary;
            });

            setStaffs(increaseSalary);
        } else if (sort == '2') {
            const decreaseSalary = [...staffs].sort(function (a, b) {
                // const salaryA = Math.round(
                //     a.salaryScale * 3000000 + a.overTime * 200000,
                // );
                // const salaryB = Math.round(
                //     b.salaryScale * 3000000 + b.overTime * 200000,
                // );
                return b.salary - a.salary;
            });
            setStaffs(decreaseSalary);
        } else {
            setStaffs(staffListSalary);
        }
    }, [sort]);
    return (
        <>
            <div className={cx('sub-nav')}>
                <div className={cx('link')}>
                    <Link to="/staff">Nhân viên</Link>
                    <span> / Bảng lương</span>
                </div>
                <div className={cx('sort-by')}>
                    <label htmlFor={'sortBy'} className={cx('label')}>
                        Sort by :{' '}
                    </label>
                    <select
                        className={cx('sort')}
                        onChange={sortHandler}
                        name={'sortBy'}
                    >
                        <option value={0}>--Chọn--</option>
                        <option value={1}>Tăng dần</option>
                        <option value={2}>Giảm dần</option>
                    </select>
                </div>
            </div>
            <div className={cx('wrapper')}>
                {staffs &&
                    staffs.map((staff) => {
                        const total = Math.round(staff.salary);
                        return (
                            <div
                                key={staff.id}
                                className={cx(
                                    'staff-detail',
                                    'col-md-4',
                                    'col-xs-6',
                                    'col-12',
                                )}
                            >
                                <div className={cx('staff-name')}>
                                    <p>{staff.name}</p>
                                </div>
                                <div className={cx('staff-info')}>
                                    <p>Mã nhân viên: {staff.id}</p>
                                    <p>Hệ số lương: {staff.salaryScale}</p>
                                    <p>Số ngày làm thêm: {staff.overTime}</p>
                                </div>
                                <div className={cx('staff-salary')}>
                                    <p>Lương: {total}</p>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </>
    );
}

export default Salary;
