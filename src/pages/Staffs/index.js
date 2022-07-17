import { STAFFS } from '~/assets/data/staffs';
import styles from './Staffs.module.scss';
import className from 'classnames/bind';
import images from '~/assets/images';
import { Link } from 'react-router-dom';
import AddModalBox from '~/pages/Modalbox/AddModalBox';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const cx = className.bind(styles);

function Staffs(props) {
    const staffList = useSelector((state) => state.handleStaffs.list);
    const [staffs, setStaffs] = useState(staffList);

    const handleSearch = () => {
        const input = document.querySelector('#input');
        const searchStaffs = staffList.filter((staff) =>
            staff.name.includes(input.value),
        );
        setStaffs(searchStaffs);
    };

    useEffect(() => {
        setStaffs(staffList);
    }, [staffList]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('sub-nav')}>
                <div className={cx('title')}>Nhân viên</div>
                <div className={cx('add-btn')}>
                    <AddModalBox />
                </div>
                <div className={cx('search')}>
                    <input
                        className={cx('search-input')}
                        type="text"
                        placeholder="Tìm nhân viên"
                        id="input"
                    />
                    <button className={cx('search-btn')} onClick={handleSearch}>
                        Tìm
                    </button>
                </div>
            </div>
            <ul className={cx('staff-list row')}>
                {staffs.map((staff) => {
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
