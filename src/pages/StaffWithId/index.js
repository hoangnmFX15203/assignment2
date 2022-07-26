import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './StaffWithId.module.scss';
import className from 'classnames/bind';
import images from '~/assets/images';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';
import EditModalBox from '~/pages/Modalbox/EditModalBox';
import { staffListRemain, staffListSelector } from '~/redux/selector';

const cx = className.bind(styles);

function StaffWithId() {
    const staffList = useSelector(staffListSelector);
    const [staffs, setStaffs] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        const staff = staffList.filter((s) => s.id === +id);
        setStaffs(staff);
    }, [id]);

    const handleDelete = (id) => {};
    return (
        <div className={cx('wrapper')}>
            {staffs.map((staff) => {
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
                                <p>Phòng ban: {staff.department.name}</p>
                                <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
                                <p>Số ngày đã làm thêm: {staff.overTime}</p>
                            </div>
                            {/* <EditModalBox data={staff.id} /> */}
                            {/* <div
                                className={cx('delete-btn')}
                                onClick={() => handleDelete(staff.id)}
                            >
                                <button>Delete</button>
                            </div> */}
                        </div>
                    </>
                );
            })}
        </div>
    );
}

export default StaffWithId;
