import { connect } from 'react-redux';
import Login from './component';
import {mapStateToProps, mapDispatchToProps} from './selectors';

const container = connect(
    mapStateToProps,
    mapDispatchToProps
)(Login);

export default container;