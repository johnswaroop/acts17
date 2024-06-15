export const Nav = () => {
  return (
    <div data-theme="light" className="navbar  z-10 fixed bg-base-100 h-min">
      <div className="flex-1">
        <a className="btn btn-ghost text-xl font-bold text-white">TIBC</a>
      </div>
      <div className="flex-none">
        <ul className="menu menu-horizontal px-1 text-xl font-bold text-white">
          <li>
            <a>About</a>
          </li>
          <li>
            <a>Statement of Faith</a>
          </li>
          <li>
            <a>Sermons</a>
          </li>
          <li>
            <a>Locate Us - Maps</a>
          </li>
          <li>
            <a>Contact Us</a>
          </li>
          {/* <li>
            <details>
              <summary>Parent</summary>
              <ul className="p-2 bg-base-100 rounded-t-none">
                <li>
                  <a>Link 1</a>
                </li>
                <li>
                  <a>Link 2</a>
                </li>
              </ul>
            </details>
          </li> */}
        </ul>
      </div>
    </div>
  );
};
