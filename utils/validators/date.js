import moment from 'moment'

export const isDate = (value) => {
    return moment(value, 'DD.MM.YYYY').isValid();
}
