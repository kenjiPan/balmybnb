import { connect } from 'react-redux';

import { createBooking, clearBookingErrors } from '../../actions/booking_actions';
import BookingForm from './booking_form';


const msp = state => {
  return {
    errors: state.errors.bookings,
    currentUserId: state.session.currentUser ? state.session.currentUser.id : [],
    bookings: Object.values(state.entities.bookings)
  };
};
const mdp = dispatch => ({
  createBooking: booking => dispatch(createBooking(booking)),
  clearBookingErrors: () => dispatch(clearBookingErrors())
});

export default connect(msp, mdp)(BookingForm);
