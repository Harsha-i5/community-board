export default function Sidebar() {
  return (
    <aside className="sidebar">
      <ul className="menu">
        <li>
          <span className="material-symbols-outlined">group</span>
          <span className="menu-text">Users</span>
        </li>
        <li>
          <span className="material-symbols-outlined">category</span>
          <span className="menu-text">Objects</span>
        </li>
        <li>
          <span className="material-symbols-outlined">space_dashboard</span>
          <span className="menu-text">Layouts</span>
        </li>
        <li>
          <span className="material-symbols-outlined">analytics</span>
          <span className="menu-text">Reports</span>
        </li>
        <li>
          <span className="material-symbols-outlined">dashboard</span>
          <span className="menu-text">Dashboard</span>
        </li>
        <li>
          <span className="material-symbols-outlined">quiz</span>
          <span className="menu-text">Questionnaire</span>
        </li>
        <li>
          <span className="material-symbols-outlined">manage_accounts</span>
          <span className="menu-text">Data Integration</span>
        </li>
        <li>
          <span className="material-symbols-outlined">list_alt_check</span>
          <span className="menu-text">Audit</span>
        </li>
        <li>
          <span className="material-symbols-outlined">event</span>
          <span className="menu-text">Events</span>
        </li>
        <li className="active post">
          <span className="material-symbols-outlined post-icon">article</span>
          <span className="menu-text">Community Posts</span>
        </li>
      </ul>
    </aside>
  );
}
