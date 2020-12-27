import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import * as trackActions from "../../store/tracks";
import ProfileHeader from "./ProfileHeader";
import ProfileMeta from "./ProfileMeta";
import "./Profile.css";
import { useEffect } from 'react';
//-----------------------------------------------------
const Profile = () => {
  const dispatch = useDispatch();

  // State
  const user = useSelector(state => state.session.user);
  const [testImg, setTestImg] = useState();

  // Handler
  const click = () => {
    dispatch(trackActions.getTracks())
      .then((res) => {
        console.log(res)
        setTestImg(res.data.tracks[0].coverImg);
      });
  }

  useEffect(()=>{}, [testImg]);

  return (
    <div className="profile__outer-container">
      <div className="profile__inner-container">
        <ProfileHeader user={user}/>
        <ProfileMeta user={user}/>
        <div className="test-display">
          <img src={`backend/uploads/covers/${testImg}`} alt="test"/>
        </div>
        <button onClick={click}>Test</button>
      </div>
    </div>
  )
}

export default Profile;