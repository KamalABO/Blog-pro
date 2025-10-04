import "./profile.css";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams,useNavigate } from "react-router-dom";
import { Oval } from "react-loader-spinner";
import swal from "sweetalert";
import UpdateProfileModal from "./UpdateProfileModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteProfile, getUserProfile, uploadProfilePhoto} from "../../redux/apiCalls/profileApiCall";
import PostItem from "../../components/posts/PostItem";
import { logoutUser } from "../../redux/apiCalls/authApiCall";

const Profile = () => {
  const dispatch = useDispatch();
  const { profile,loading,isProfileDeleted } = useSelector((state) => state.profile);
  const { user } = useSelector((state) => state.auth);

  const [file, setFile] = useState(null);
  const [backgroundImage, setBackgroundImage] = useState('');
  const [updateProfile, setUpdateProfile] = useState(false);

  // backgroundImage
  useEffect(() => {
    if (file) {
      setBackgroundImage(URL.createObjectURL(file));
    } else if (profile?.profilePhoto?.url) {
      setBackgroundImage(profile.profilePhoto.url);
    }
  }, [file, profile]);
  
  const { id } = useParams();
  useEffect(() => {
    dispatch(getUserProfile(id));
    window.scrollTo(0, 0);
  }, [id]);

  const navigate = useNavigate();
  useEffect(() => {
    if(isProfileDeleted) {
      navigate("/");
    }
  }, [navigate, isProfileDeleted]);
  
  // Form Submit Handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (!file) return toast.warning("ther is no file!");

    const formData = new FormData();
    formData.append("image", file);

    dispatch(uploadProfilePhoto(formData));
  };

  // Delete Account Handler
  const deleteAccountHandler = () => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover profile!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((isOk) => {
      if (isOk) {
        dispatch(deleteProfile(user?._id));
        dispatch(logoutUser());
      }
    });
  };

  if(loading) {
    return (
    <div className="profile-loader">
      <Oval
        height={120}
        width={120}
        color="#000"
        wrapperStyle={{}}
        wrapperClass=""
        visible={true}
        ariaLabel='oval-loading'
        secondaryColor="grey"
        strokeWidth={3}
        strokeWidthSecondary={3}
        />
    </div>
  )}

  return (
    <section className="profile">
      {/* <div className="profile-header" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: 'cover' }}> */}
      <div className="profile-header">
        <div className="profile-image-wrapper">
          <a href={file ? URL.createObjectURL(file): profile?.profilePhoto.url}>
          <img src={file ? URL.createObjectURL(file): profile?.profilePhoto.url} alt="" className="profile-image" />
          </a>
          { user?._id === profile?._id && (   
            <form onSubmit={formSubmitHandler}>
            <abbr title="choose profile photo">
              <label htmlFor="file" className="bi bi-camera-fill upload-profile-photo-icon" ></label>
            </abbr>
            <input style={{display:"none"}} type="file" name="file" id="file" onChange={(e) => setFile(e.target.files[0])} />
            <button className="upload-profile-photo-btn" type="submit"> upload </button>
          </form>
            )}
        </div>
        <h1 className="profile-username">{profile?.username}</h1>
        <p className="profile-bio">{profile?.bio}</p>
        <div className="user-date-joined">
          <strong>Date Joined: </strong>
          <span>{new Date(profile?.createdAt).toDateString()}</span>
        </div>
        {user?._id === profile?._id && (
          <button onClick={() => setUpdateProfile(true)} className="profile-update-btn" >
            <i className="bi bi-file-person-fill"></i>
            Update Profile
          </button>
        )}
      </div>
      <div className="profile-posts-list">
        <h2 className="profile-posts-list-title">{profile?.username} Posts</h2>
        {profile?.posts?.map((post) => (
          <PostItem
            key={post._id}
            post={post}
            username={profile?.username}
            userId={profile?._id}
          />
        ))}
      </div>
      {user?._id === profile?._id && (
        <button onClick={deleteAccountHandler} className="delete-account-btn">
          Delete Your Account
        </button>
      )}
        {updateProfile && <UpdateProfileModal profile={profile} setUpdateProfile={setUpdateProfile}/>}
    </section>
  );
};

export default Profile;
