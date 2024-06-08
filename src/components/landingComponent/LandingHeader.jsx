import { Link, useLocation, useNavigate } from "react-router-dom";
import { useStore } from "zustand";
import storeDepositUserInfor from "../../clients/DepositUserInfor";
import { getName } from "../../apis/getName";
import { useEffect } from "react";
import { getColdstart } from "../../apis/getColdstart";
import storeColdStartInfor from "../../clients/ColdStartInfor";

export default function LandingHeader() {
    const { setId, setNickname, setMemberId, setGender, setPhone, setBirth } =
        useStore(storeDepositUserInfor);
    const location = useLocation();
    const { nickname } = useStore(storeDepositUserInfor);
    const { setInfor } = useStore(storeColdStartInfor);
    const access = localStorage.getItem("access");

    const navi = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            if (access) {
                try {
                    const data = await getName();

                    if (data.preferenceYn) {
                        setMemberId(data.memberId);
                        setId(data.email);
                        setNickname(data.nickname);
                        setGender(data.gender);
                        data.phone ? setPhone(data.phone) : null;
                        data.birthOfDate ? setBirth(data.birthOfDate) : null;
                    } else {
                        const res = await getColdstart();
                        setInfor(res);
                        navi("/react-actions/coldstart");
                    }
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            }
        };

        fetchData();
    }, [access]);

    return (
        <header className="w-full h-[10dvh] border-b-[#d9d9d9] border-b-[1px] bg-white/opacity-50 backdrop-blur-xl flex items-center justify-between px-24 fixed top-0 z-10">
            <div className="flex items-center gap-4">
                <Link
                    to={"/react-actions"}
                    className="font-[Pretendard-Bold] text-[#6E3Bff] text-[36px] cursor-pointer"
                >
                    Palette
                </Link>
                <Link
                    to={"/react-actions"}
                    className="text-[#c1c1c1] text-lg leading-normal flex pt-1 cursor-pointer"
                >
                    Home
                </Link>
                {access ? (
                    <Link
                        to={"/react-actions/history"}
                        className="text-[#c1c1c1] text-lg leading-normal flex pt-1 cursor-pointer"
                    >
                        History
                    </Link>
                ) : null}
                <Link
                    to={"/react-actions/infor"}
                    className="text-[#c1c1c1] text-lg leading-normal flex pt-1 cursor-pointer"
                >
                    About us
                </Link>
            </div>
            <div
                className="gap-2"
                style={{
                    display:
                        location.pathname === "/react-actions/login" ||
                        location.pathname === "/react-actions/signup" ||
                        location.pathname === "/react-actions/coldstart"
                            ? "none"
                            : "flex",
                }}
            >
                {access ? (
                    <Link
                        to={"/react-actions/profile"}
                        className="flex gap-1 border-b-2 cursor-pointer"
                        style={{
                            borderBottomColor:
                                location.pathname === "/react-actions/profile"
                                    ? "#6e3bff"
                                    : "#c1c1c1",
                        }}
                    >
                        <div className="text-[#6e3bff] font-[Pretendard-SemiBold] text-lg">
                            {nickname}
                        </div>
                        <div className="text-[#c1c1c1] text-lg">님</div>
                    </Link>
                ) : (
                    <>
                        <Link
                            to={"/react-actions/signup"}
                            className="flex items-center justify-center px-4 py-2 text-lg rounded-xl text-[#606060] cursor-pointer"
                        >
                            Sign up
                        </Link>
                        <Link
                            to={"/react-actions/login"}
                            className="flex items-center justify-center px-4 py-2 text-lg rounded-xl bg-[#6e3bff] text-white cursor-pointer hover:opacity-80"
                        >
                            Log in
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
}
