import React from 'react';
import Modal from 'react-modal';
import './style.less';
// console.log(Modal);
const customStyles = {
  overlay : {
      zIndex: 9999
  },
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.login = this.login.bind(this);

  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.refs.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.props.hide();
  }

  login() {
      let username = this.refs.username.value;
      let password = this.refs.password.value;
      this.props.login(username, password);
  }

  render() {
    return (
      <div className="loginWraper">
        <Modal
          isOpen={this.props.show}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          style={customStyles}
          contentLabel="Login Modal"
        >
						<div className="login-box">
							<div className="login-heading">
								<h3>登录</h3>
							</div>
							<div className="login-body">
								<input type="text" className="form-control input-sm" placeholder="用户名" autoFocus="autofocus" ref='username'></input>
								<input type="password" className="form-control input-sm" placeholder="密码" ref='password'></input>
								<div className="remember-me checkbox">
									<label>
										<input type="checkbox" ></input>
										<span>记住密码</span>
									</label>
									<div className="error-box">
										<p className="error"></p>
									</div>
								</div>
								<button type="button" className="btn btn-sm btn-success" onClick={this.login}>登录</button>
							</div>

						</div>
        </Modal>
      </div>
    );
  }
}

export default Login;