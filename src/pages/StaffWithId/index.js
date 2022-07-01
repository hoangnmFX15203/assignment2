import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { STAFFS } from '~/assets/data/staffs';
import styles from './StaffWithId.module.scss';
import className from 'classnames/bind';
import images from '~/assets/images';
import dateFormat from 'dateformat';
import { Link } from 'react-router-dom';

const cx = className.bind(styles);

function StaffWithId() {
    const [staffs, setStaffs] = useState([]);
    const { id } = useParams();

    useEffect(() => {
        setStaffs(STAFFS.filter((s) => s.id === +id));
    }, [id]);
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
                                    Ngày sinh:{' '}
                                    {dateFormat(staff.dob, 'dd/mm/yyyy')}
                                </p>
                                <p>
                                    Ngày vào công ty:{' '}
                                    {dateFormat(staff.startDate, 'dd/mm/yyyy')}
                                </p>
                                <p>Phòng ban: {staff.department.name}</p>
                                <p>Số ngày nghỉ còn lại: {staff.annualLeave}</p>
                                <p>Số ngày đã làm thêm: {staff.overTime}</p>
                            </div>
                        </div>
                    </>
                );
            })}
        </div>
    );
}

export default StaffWithId;
