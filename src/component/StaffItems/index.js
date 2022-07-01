import styles from './StaffItems.module.scss';
import className from 'classnames/bind';
import { Link } from 'react-router-dom';

const cx = className.bind(styles);

function StaffItems(props) {
    return (
        <div className={cx('wrapper')}>
            <ul>
                {props.data.map((staff) => {
                    const to = `/staff/${staff.id}`;
                    return (
                        <li key={staff.id}>
                            <Link to={to}>{staff.name}</Link>
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default StaffItems;
