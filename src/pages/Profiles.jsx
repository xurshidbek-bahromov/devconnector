import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { fetchProfiles } from "../actions/profileActions";


const Profiles = () => {
  const dispatch = useDispatch();
  const { profiles, loading, error } = useSelector((state) => state.profiles);

  useEffect(() => {
    dispatch(fetchProfiles());
  }, [dispatch]);

  if (loading) return <div className="loading-spinner"></div>;
  if (error)
    return (
      <p style={{ color: "red" }}>
        Xatolik: {error.msg || "Ma'lumotlarni olishda xatolik yuz berdi."}
      </p>
    );

  return (
    <div className="profiles">
      <h2 className="profiles-title">Dasturchilar Profillari</h2>

      {profiles && profiles.length > 0 ? (
        <div className="profiles-container">

          {profiles.map((profile) => (
            <div className="profile-card"
              key={profile._id}
              style={{
                border: "1px solid #ccc",
                borderRadius: "4px",
                padding: "1rem",
                width: "300px",
              }}
            >
              <h3 className="profile-name">{profile.user.name}</h3>

              <p className="profile-status">

                {profile.status} {profile.company && `@ ${profile.company}`}
              </p>
              <Link to={`/profile/${profile.user._id}`} className="profile-link">Batafsil</Link>

            </div>
          ))}
        </div>
      ) : (
        <p>Hozircha profillar mavjud emas.</p>
      )}
    </div>
  );
};

export default Profiles;
