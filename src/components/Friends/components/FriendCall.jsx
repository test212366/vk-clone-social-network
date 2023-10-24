import React from 'react';
import c from "../css/friends.module.css";
import { NavLink } from "react-router-dom";

const FriendCall = ({ name, id, currentUser, setUser, user, addFriendId, userPhoto }) => {

	const handlerAddFriend = async () => {
		const responce = await fetch('https://glacial-forest-97928.herokuapp.com/api/user/addCurrentFriend', {
			headers: {
				'Content-Type': 'application/json'
			},
			method: 'POST',
			body: JSON.stringify({ currentUserId: currentUser, addFriendId: addFriendId })
		})
		const data = await responce.json()
		console.log(data)

	}
	return (
		<div className={c.friendFR}>
			<NavLink to={`/profile:${id}`} className={c.linkFriend} >
				<div className="friend__ph">
					<img src={`${userPhoto != 'false' ? `${`https://glacial-forest-97928.herokuapp.com/` + userPhoto}` : "https://okeygeek.ru/wp-content/uploads/2020/03/no_avatar.png"}`}
						width='45px'
						height='45px'
						className={c.friendPH}
						alt="friend" />
				</div>
				<div className={c.friendDesc}>
					<div className={c.friend__name}>
						{name}
					</div>
				</div>
			</NavLink>
			<button className={`${c.message} ${c.addFriendBtn}`} onClick={() => handlerAddFriend()}>Добавить в друзья</button>

		</div>
	);
};

export default FriendCall;