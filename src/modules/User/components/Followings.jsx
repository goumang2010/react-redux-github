import React from 'react';
import Immutable from 'immutable';
import ListBlock from 'components/ListBlock';
import UserPlaceholder from 'components/Placeholder/UserPlaceholder';
import Loading from 'components/Loading';

const {
    List,
    Item
} = ListBlock;

const Followings = ({
        followings,
        placeholder,
        isFetching,
    }) =>
    isFetching ? <Loading /> :
    followings.size !== 0 ?
    <List className='followings'>
        {
            followings.map(fol => (
                <Item key={fol.get('id')}>
                    <div className='item-media'>
                        <img src={fol.get('avatar_url')} />
                    </div>
                    <div className='item-inner'>
                        <div className='item-title'>
                            {fol.get('name')}
                            <span>{fol.get('login')}</span>
                        </div>
                        <div className='location'>
                            {fol.get('location')}
                        </div>
                    </div>
                </Item>
            ))
        }
    </List> : <UserPlaceholder text={placeholder} />;

Followings.propTypes = {
    followings: React.PropTypes.instanceOf(Immutable.List),
    placeholder: React.PropTypes.string,
    isFetching: React.PropTypes.bool,
};

export default Followings;