import { DateUtil } from './date-util';
import { StringUtil } from './string-util';

export class NumberUtil {
  public static generateRandonNumber(length: number): string {
    var digits = '0123456789';
    let value = '';
    for (let i = 0; i < length; i++) {
      value += digits[Math.floor(Math.random() * 10)];
    }
    return value;
  }
  public static generateRandonNumberUpThree(length: number): string {
    var digits = '0123';
    let value = '';
    for (let i = 0; i < length; i++) {
      value += digits[Math.floor(Math.random() * 10)];
    }
    return value;
  }

  public static formatNumberLength(num: number, length: number) {
    var r = '' + num;
    while (r.length < length) {
      r = '0' + r;
    }
    return r;
  }

  public static readableCode(value: number, digit: number): string {
    return (
      DateUtil.getUtcDate().getDate().toString() +
      NumberUtil.formatNumberLength(
        DateUtil.getUtcDate().getMonth() + 1,
        2
      ).toString() +
      DateUtil.getUtcDate().getFullYear().toString().substring(2) +
      NumberUtil.formatNumberLength(value, digit).toString() +
      StringUtil.generateRandomString(1)
    );
  }
}
