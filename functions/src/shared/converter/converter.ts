export interface Converter<T, U> {

    convert(src: T): U;

}