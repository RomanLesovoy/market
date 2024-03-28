import { OperatorFunction, map } from 'rxjs';

export const handleErrorOnObservable = (callback: Function): OperatorFunction<any, void> => {
  return map((data: any) => {
    if (data.errors?.length) {
      callback(data.errors[0].message);
    }
    return data;
  })
}