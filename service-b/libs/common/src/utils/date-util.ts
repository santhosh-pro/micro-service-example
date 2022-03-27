import * as moment from 'moment';
export class DateUtil {
  public static getUtcDate() {
    let now = new Date();
    const date = moment.utc(now).format();
    return moment(date, 'YYYY-MM-DD HH:mm:ss').toDate();
  }

  public static getDateFromTimestamp(timestamp: number) {
    let now = new Date(timestamp * 1000);
    const date = moment.utc(now).format();
    return moment(date, 'YYYY-MM-DD HH:mm:ss').toDate();
  }
  public static lastMinutes(time: number) {
    let now = new Date();
    const date = moment.utc(now).format();
    return moment(date).subtract(time, 'minutes').toDate();
  }
}
