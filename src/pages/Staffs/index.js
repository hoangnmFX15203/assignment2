import { STAFFS } from '~/assets/data/staffs';
import styles from './Staffs.module.scss';
import className from 'classnames/bind';
import images from '~/assets/images';
import { Link } from 'react-router-dom';

const cx = className.bind(styles);

function Staffs() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>Nhân viên</div>
            <ul className={cx('staff-list row')}>
                {STAFFS.map((staff) => {
                    const to = `/staff/${staff.id}`;
                    return (
                        <li
                            key={staff.id}
                            className={cx(
                                'staff-content',
                                'col-md-2',
                                'col-sm-4',
                                'col-6',
                            )}
                        >
                            <Link to={to}>
                                <div className={cx('staff-image')}>
                                    <img src={images.avarta} alt="avarta" />
                                </div>
                                <div className={cx('staff-name')}>
                                    <p>{staff.name}</p>
                                </div>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default Staffs;
