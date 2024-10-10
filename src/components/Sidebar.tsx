import "../styles/sidebar.scss";

interface SidebarProps {
  sortByCity: () => void;
  sortByCompany: () => void;
  isDisabled: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({
  sortByCity,
  sortByCompany,
  isDisabled,
}) => {
  return (
    <div className="sidebar">
      <div className="sidebar-wrapper">
        <h2>Сортировка</h2>
        <button
          onClick={sortByCity}
          className={isDisabled ? "disabled" : ""}
          disabled={isDisabled}
        >
          по городу
        </button>
        <button
          onClick={sortByCompany}
          className={isDisabled ? "disabled" : ""}
          disabled={isDisabled}
        >
          по компании
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
