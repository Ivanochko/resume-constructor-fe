export class EnumUtils {
  constructor() {
  }

  public static getValuesFromEnum(e: any) {
    return Object.keys(e).filter((item) => {
      return isNaN(Number(item));
    });
  }
}
