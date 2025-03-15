import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProfileById } from '../actions/profileActions';
import { useParams } from 'react-router-dom';

const ProfileDetails = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { profile, loading, error } = useSelector(state => state.profiles);

    useEffect(() => {
        dispatch(fetchProfileById(id));
    }, [dispatch, id]);

    if (loading) return <div className="loading-spinner"></div>;

    if (error) return <p>Xatolik: {error.msg || 'Ma`lumotni olishda xatolik'}</p>;
    if (!profile) return <p>Profile topilmadi.</p>;

    return (
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <h2 className="profile-name">{profile.user.name} haqida batafsil</h2>

            <p className="profile-status">Status: {profile.status}</p>

            <p className="profile-company">Kompaniya: {profile.company}</p>

            <p className="profile-bio">{profile.bio}</p>

            {/* Agar mavjud bo’lsa, tajriba, ta`lim va qo’shimcha qism */}
            {profile.experience && profile.experience.length > 0 && (
                <div>
                    <h3 className="experience-title">Tajriba</h3>

                    {profile.experience.map(exp => (
                        <div key={exp._id}>
                            <h4 className="experience-company">{exp.company}</h4>

                            <p className="experience-title">{exp.title}</p>

                            <p className="experience-dates">{exp.from} - {exp.to ? exp.to : 'hozirgi vaqt'}</p>

                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ProfileDetails;
