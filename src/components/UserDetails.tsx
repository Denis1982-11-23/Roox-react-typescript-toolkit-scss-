import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { updateUser } from "../store/userSlice";
import "../styles/userdetails.scss";

interface Address {
  street: string;
  city: string;
  zipcode: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  comments: string;
}

interface UserDetailsProps {
  user: User;
  onBack: () => void;
  onEdit: () => void;
  isEditing: boolean;
}

const UserDetails: React.FC<UserDetailsProps> = ({
  user,
  onBack,
  onEdit,
  isEditing,
}) => {
  const [localUser, setLocalUser] = useState(user);
  const [errors, setErrors] = useState<{ [key: string]: boolean }>({});
  const dispatch = useDispatch();

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { id, value } = e.target;
    setLocalUser((prevUser) => ({
      ...prevUser,
      [id]: value,
    }));
  };

  const validate = () => {
    const newErrors: { [key: string]: boolean } = {};
    
    Object.keys(localUser).forEach((key) => {
      if (typeof localUser[key as keyof User] === "string" && !localUser[key as keyof User].trim()) {
        newErrors[key] = true; 
      }
    });
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length === 0) {
      dispatch(updateUser(localUser));
      console.log(localUser);
      setErrors({}); 
    } else {
      setErrors(validationErrors); 
    }
  };

  return (
    <div className="user-details">
      <div className="container">
        <div className="user-head-wrapper">
          <h2>Профиль пользователя</h2>
          <button
            className={`user-head-btn ${isEditing ? "disabled" : ""}`}
            onClick={onEdit}
            disabled={isEditing}
          >
            Редактировать
          </button>
        </div>
        <div className="user-details-wrapper">
          <form onSubmit={handleSubmit} className="userdetails-form">
            {[
              { label: "Name", value: localUser.name, id: "name" },
              { label: "Username", value: localUser.username, id: "username" },
              { label: "Email", value: localUser.email, id: "email" },
              {
                label: "Street",
                value: localUser.address.street,
                id: "street",
              },
              { label: "City", value: localUser.address.city, id: "city" },
              {
                label: "Zip code",
                value: localUser.address.zipcode,
                id: "zipcode",
              },
              { label: "Phone", value: localUser.phone, id: "phone" },
              { label: "Website", value: localUser.website, id: "website" },
            ].map(({ label, value, id }) => (
              <div className="form-group-userdetails" key={id}>
                <label htmlFor={id}>{label}:</label>
                <input
                  type="text"
                  id={id}
                  value={value}
                  onChange={handleChange}
                  readOnly={!isEditing}
                  className={`form-input ${
                    isEditing ? "editable" : "readonly"
                  } ${errors[id] ? "error" : ""}`}
                />
              </div>
            ))}
            <div className="form-group-comments">
              <label htmlFor="comments">Comments:</label>
              <textarea
                id="comments"
                value={localUser.comments || ''} 
                onChange={handleChange}
                readOnly={!isEditing}
                className={`form-input ${isEditing ? 'editable' : 'readonly'} ${errors['comments'] ? 'error' : ''}`}
              />
            </div>
            <div className="details-btns">
              <button type="button" className="user-back-btn" onClick={onBack}>
                Назад
              </button>
              <button
                type="submit"
                className={`user-submit-btn ${!isEditing ? "disabled" : ""}`}
                disabled={!isEditing}
              >
                Отправить
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserDetails;

