import dayJs from 'dayjs';
import utc from 'dayjs/plugin/utc';

const UtcTime = dayJs;
UtcTime.extend(utc);

export default UtcTime;
