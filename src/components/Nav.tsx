export const Nav = () => {
  return (
    <div
      data-theme="light"
      className="navbar items-center z-10 fixed bg-base-100 h-min "
    >
      <div className="flex-1 gap-4">
        <img className="w-32 " src="/white-logo.png" alt="" />
        <span className="flex flex-col text-white font-bold text-2xl">
          <h1 className="text-5xl tracking-widest uppercase">Trinity </h1>
          <h1 className="text-base">International Bible Church</h1>
        </span>
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
            <a href="https://maps.app.goo.gl/EbXZGBmCVgB5M6N19">Maps</a>
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
