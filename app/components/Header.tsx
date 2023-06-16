import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "../store/features/user/userSlice";
import { RootState } from "../store/store";
import { useRouter } from "next/navigation";

const Header=() => {
  const router=useRouter();
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  return (
    <header>
      {user.userId ? 
      (
        <div>
          <p>
            {user.firstName} {user.lastName}
          </p>
          <button onClick={() => dispatch(logoutUser())}>Logout</button>
        </div>
      ) 
      : 
      (
        <button onClick={()=>router.push('/login')}>Login</button>
      )}
    </header>
  );
};

export default Header;
