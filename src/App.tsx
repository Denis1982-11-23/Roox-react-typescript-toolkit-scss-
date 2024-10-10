import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsers,
  selectUser,
  handleBackToList,
  sortByCity,
  sortByCompany,
  toggleEdit,
} from "./store/userSlice";
import Sidebar from "./components/Sidebar";
import Content from "./components/Content";
import UserDetails from "./components/UserDetails";
import "./styles/styles.scss";

const App: React.FC = () => {
  const dispatch = useDispatch();
  const { data, selectedUser, isUserDetailsVisible, isEditing } = useSelector(
    (state: any) => state.users
  );

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <div className="app">
      <Sidebar
        sortByCity={() => dispatch(sortByCity())}
        sortByCompany={() => dispatch(sortByCompany())}
        isDisabled={isUserDetailsVisible}
      />
      <div className="main-content">
        {isUserDetailsVisible ? (
          <UserDetails
            user={selectedUser}
            onBack={() => dispatch(handleBackToList())}
            onEdit={() => dispatch(toggleEdit())}
            isEditing={isEditing}
          />
        ) : (
          <Content
            data={data}
            onUserSelect={(user) => dispatch(selectUser(user))}
          />
        )}
      </div>
    </div>
  );
};

export default App;
