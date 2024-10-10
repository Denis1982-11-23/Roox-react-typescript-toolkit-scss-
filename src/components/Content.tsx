import React from "react";
import "../styles/content.scss";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  company: {
    name: string;
  };
  address: {
    street: string;
    city: string;
    zipcode: string;
  };
  phone: string;
  website: string;
}

interface ContentProps {
  data: User[];
  onUserSelect: (user: User) => void;
}

const Content: React.FC<ContentProps> = ({ data, onUserSelect }) => {
  return (
    <div className="content">
      <h1>Список пользователей:</h1>
      {data.map((user) => (
        <form key={user.id} className="user-form">
          <div className="user-form-wrapper">
            <div className="form-group">
              <label htmlFor={`name-${user.id}`}>ФИО:</label>
              <input
                type="text"
                id={`name-${user.id}`}
                value={user.name}
                readOnly
              />
            </div>
            <div className="form-group">
              <label htmlFor={`city-${user.id}`}>Город:</label>
              <input
                type="text"
                id={`city-${user.id}`}
                value={user.address.city}
                readOnly
              />
            </div>

            <div className="company-wrapper">
              <div>
                <label htmlFor={`company-${user.id}`}>Компания:</label>
                <input
                  type="text"
                  id={`company-${user.id}`}
                  value={user.company.name}
                  readOnly
                />
              </div>
              <button
                type="button"
                className="company-button"
                onClick={() => onUserSelect(user)} 
              >
                Подробнее
              </button>
            </div>
          </div>
        </form>
      ))}
    </div>
  );
};

export default Content;
