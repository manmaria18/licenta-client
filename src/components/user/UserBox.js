import React from 'react';
import { Avatar } from 'antd';
import { getAvatarColor } from '../../util/Colors';
import { formatDate } from '../../util/Helpers';

function UserBox({ user }) {
    return (
        <div className="user-details">
            <div className="user-avatar">
                <Avatar
                    className="user-avatar-circle"
                    style={{ backgroundColor: getAvatarColor(user.name) }}
                >
                    {user.name[0].toUpperCase()}
                </Avatar>
            </div>
            <div className="user-summary">
                <div className="full-name">{user.name}</div>
                <div className="username">@{user.username}</div>
                <div className="user-joined">Membru din {formatDate(user.joinedAt)}</div>
            </div>
        </div>
    );
}

export default UserBox;