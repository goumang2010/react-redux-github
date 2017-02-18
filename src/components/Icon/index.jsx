import React from 'react';
import './style.less';
const imgs = {
    align: require('src/img/icon/align.png'),
    bell: require('src/img/icon/bell.png'),
    github: require('src/img/icon/github.png')
}

const Icon = (props) => {

    // const src = '../src/img/icon/' + props.name + '.png';

    return (
        <img
            className='img-icon'
            src={imgs[props.name]}
            style={props.style}
            alt='icon' />
    );
};

Icon.propTypes = {
    children: React.PropTypes.any
};

export default Icon;