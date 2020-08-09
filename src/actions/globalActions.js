
import { getAllBooks } from './bookActions'

export function login(username) {
  return (dispatch) => {
    dispatch({type: 'SET_USER', payload: username});
    dispatch(getAllBooks());
  }
}
export function getDateFromMySQLFormat(date) {
  const dateTime = '2017-02-04 11:23:54';
  let dateTimeParts= dateTime.split(/[- :]/); 
  dateTimeParts[1]--;
  return JSON.stringify(Date(...dateTimeParts)); 
}