import axios from "axios";
import React, { useEffect, useState } from "react";
import { ScaleLoader } from "react-spinners";
import { useRecoilState, useSetRecoilState } from "recoil";
import { balanceAtom, modalAtom } from "../atoms";
import useLoggedUser from "../hooks/userLoggedUser";
import DropDown from "./DropDown";
import Modal from "./Modal";

const Dashboard = () => {
  const setmodal = useSetRecoilState(modalAtom);
  const [users, setUsers] = useState();
  const [inp, setInp] = useState("");
  const [loading, setLoading] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const { user, isLoading } = useLoggedUser(localStorage.getItem("token"));
  const [balance, setBalance] = useRecoilState(balanceAtom);
  useEffect(() => {
    async function getUser() {
      try {
        setLoading(true);
        const res = await axios.get(
          `http://localhost:3003/api/v1/user/bulk?filter=${inp}`
        );
        setUsers(res.data.users);
        const bal = await axios.get(
          "http://localhost:3003/api/v1/account/balance",
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        setBalance(bal.data.balance);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
    getUser();
  }, [inp]);

  return (
    <div className="h-full bg-white text-black">
      <header className="flex items-center justify-between border-b-[1px] border-slate p-5">
        <h1 className="font-bold text-2xl">MyWallet</h1>
        <div className="flex gap-3 items-center ">
          <p className="font-semibold">
            Hello, {!isLoading && user?.firstname}
          </p>
          <div className="relative">
            <span
              className="bg-slate-100 h-12 w-12 flex items-center justify-center rounded-full cursor-pointer"
              onClick={() => setShowDropDown((s) => (s ? false : true))}
            >
              {!isLoading && user?.firstname[0].toUpperCase()}
            </span>
            <DropDown showDropDown={showDropDown} />
          </div>
        </div>
      </header>
      <div className="p-5 text-center">
      <div className="flex justify-center items-center mb-5">
          {/* Display user's profile picture */}
          {!isLoading && user?.profilePic && (
            <img
              src={user.profilePic}
              alt="Profile Picture"
              className="rounded-full w-20 h-20 object-cover"
            />
          )}
        </div>
        <h1 className="font-bold text-xl mb-3">Good Day, {!isLoading && user?.firstname}!</h1>

        <p className="mb-5 font-bold text-xl">
          Your Balance{" "}
          <span className="pl-3">
            {!loading ? `$ ${balance?.toFixed(2)}` : "Loading"}
          </span>
        </p>
      </div>

      <Modal />
    </div>
  );
};

export default Dashboard;
