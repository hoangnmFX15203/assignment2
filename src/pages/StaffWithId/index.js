import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './StaffWithId.module.scss';
import className from 'classnames/bind';
import images from '~/assets/images';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';
import EditModalBox from '~/pages/Modalbox/EditModalBox';
import { departmentSelector, staffListSelector } from '~/redux/selector';
import staffsReducer from '~/redux/reducer/staffsReducer';
import { fetchStaff, fetchDepartment } from '~/redux/reducer/staffsReducer';

const cx = className.bind(styles);

function StaffWithId() {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchStaff());
        dispatch(fetchDepartment());
    }, []);
    const staffList = useSelector(staffListSelector);
    const departmentList = useSelector(departmentSelector);
    const [staffListApi, setStaffListApi] = useState(staffList);
    const [staffs, setStaffs] = useState([]);
    const { id } = useParams();
    // const [staffDetail, setStaffDetail] = useState(staffEdit);
    // const staffEdit = staffList.find((s) => s.id === +id);

    useEffect(() => {
        const staff = staffListApi.filter((s) => s.id === +id);
        setStaffs(staff);
    }, [id]);

    useEffect(() => {
        const staff = staffList.filter((s) => s.id === +id);
        setStaffs(staff);
    }, [id, staffList]);

    return (
        <div className={cx('wrapper')}>
            {staffs.map((staff) => {
                console.log(staff);
                const department = departmentList.find(
                    (deps) => deps.id === staff.departmentId,
                );
                const img = '~/assets/images/avarta.png';
                return (
                    <>
                        <div className={cx('sub-nav')}>
                            <Link to="/staff">Nhân viên</Link>
                            <span> / {staff.name}</span>
                        </div>
                        <div className={cx('staff-detail row')} key={staff.id}>
                            <div className={cx('staff-img col-md-3')}>
                                <img src={images.avarta} alt={staff.name} />
                                <EditModalBox data={id} />
                            </div>
                            <div className={cx('staff-info col-md-9')}>
                                <h4>Họ và tên: {staff.name}</h4>
                                <p>
                                    Ngày sinh:
                                    {dateFormat(staff.doB, 'dd/mm/yyyy')}
                                </p>
                                <p>
                                    Ngày vào công ty:{' '}
                                    {dateFormat(staff.startDate, 'dd/mm/yyyy')}
                                </p>
                                <p>Phòng ban: {department.name}</p>
                                <p>
                                    Số ngày nghỉ còn lại: {staff?.annualLeave}
                                </p>
                                <p>Số ngày đã làm thêm: {staff?.overTime}</p>
                            </div>
                        </div>
                    </>
                );
            })}
        </div>
    );
}

export default StaffWithId;
