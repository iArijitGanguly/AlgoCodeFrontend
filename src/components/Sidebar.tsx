import { TypedUseSelectorHook,useSelector } from 'react-redux';

import { RootState } from '../redux/store';

const useTypedSelectorHook: TypedUseSelectorHook<RootState> = useSelector;

function Sidebar() {

  const authState = useTypedSelectorHook((state) => state.auth);
  return (
    <div className="drawer">
      <input id="my-drawer" type="checkbox" className="drawer-toggle" />
      <div className="drawer-side z-10">
        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          {/* Sidebar content here */}
          {!authState.isLoggedIn && (
            <div>
              <li><a>Sign In</a></li>
              <li><a>Sign Out</a></li>
            </div>
          )}
      
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;