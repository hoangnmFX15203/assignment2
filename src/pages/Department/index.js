import { DEPARTMENTS } from '~/assets/data/staffs';
import styles from './Department.module.scss';
import className from 'classnames/bind';

const cx = className.bind(styles);
function Department() {
    return (
        <div className={cx('wrapper')}>
            {DEPARTMENTS.map((dep) => {
                return (
                    <div
                        className={cx(
                            'department-detail',
                            'col-md-4',
                            'col-xs-6',
                            'col-12',
                        )}
                    >
                        <h3 className={cx('department-title')}>{dep.name}</h3>
                        <p className={cx('department-count')}>
                            <span>Số lượng nhân viên:</span> {dep.numberOfStaff}
                        </p>
                    </div>
                );
            })}
        </div>
    );
}

export default Department;
