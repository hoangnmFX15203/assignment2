import { DEPARTMENTS } from '~/assets/data/staffs';
import styles from './Department.module.scss';
import className from 'classnames/bind';
import { departmentSelector, staffListSelector } from '~/redux/selector';
import { fetchDepartment, fetchStaff } from '~/redux/reducer/staffsReducer';
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import images from '~/assets/images';
import { Link } from 'react-router-dom';

const cx = className.bind(styles);
function Department() {
    const dispatch = useDispatch();
    const [staffDepartment, setStaffDepartment] = useState([]);
    useEffect(() => {
        dispatch(fetchStaff());
        dispatch(fetchDepartment());
    }, []);
    const departmentList = useSelector(departmentSelector);
    const staffList = useSelector(staffListSelector);
    const staffDepartmentHandler = (id) => {
        const staffDeps = staffList.filter(
            (staff) => staff.departmentId === id,
        );
        setStaffDepartment(staffDeps);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('dep-container')}>
                {departmentList.map((dep) => {
                    return (
                        <>
                            <div
                                className={cx(
                                    'department-list',
                                    'col-md-4',
                                    'col-xs-6',
                                    'col-12',
                                )}
                                onClick={() => staffDepartmentHandler(dep.id)}
                            >
                                <h3 className={cx('department-title')}>
                                    {dep.name}
                                </h3>
                                <p className={cx('department-count')}>
                                    <span>Số lượng nhân viên:</span>{' '}
                                    {dep.numberOfStaff}
                                </p>
                            </div>
                        </>
                    );
                })}
            </div>
            <div className={cx('staff-list-department', 'row')}>
                {staffDepartment.map((staff) => {
                    const to = `/staff/${staff.id}`;
                    return (
                        <ul>
                            <li
                                key={staff.id}
                                className={cx('deps-staffs', 'col-md-2', 'row')}
                            >
                                <Link to={to}>
                                    <div className={cx('staff-wrapper', 'row')}>
                                        {/* <div
                                            className={cx(
                                                'staff-image',
                                                'col-md-3',
                                            )}
                                        > */}
                                        <img src={images.avarta} alt="avarta" />
                                        {/* </div>
                                        <div
                                            className={cx(
                                                'staff-name',
                                                'col-md-6',
                                            )}
                                        > */}
                                        <p>{staff.name}</p>
                                        {/* </div> */}
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    );
                })}
            </div>
        </div>
    );
}

export default Department;
