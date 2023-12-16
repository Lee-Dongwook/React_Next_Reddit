import Link from "next/link";
import React from "react";
import dayjs from "dayjs";
import { useAuthState } from "@/src/context/auth";
import { Sub } from "@/src/types";

type Props = {
  sub: Sub;
};

const SideBar = ({ sub }: Props) => {
  const { authenticated } = useAuthState();

  return (
    <div className="hidden w-4/12 ml-3 md:block">
      <div className="bg-white border rounded">
        <div className="p-3 bg-gray-400 rounded-t">
          <p className="font-semibold text-white">커뮤니티에 대해서</p>
        </div>
        <div className="p-3">
          <p className="mb-3 text-base">{sub?.description}</p>
          <div className="flex mb-3 text-sm font-medium">
            <div className="w-1/2">
              <p>100</p>
              <p>멤버</p>
            </div>
          </div>
          <p className="my-3">
            <i className="mr-2 fas fa-birthday-cake"></i>
            {dayjs(sub.createdAt).format("DD.MM.YYYY")}
          </p>

          {authenticated && (
            <div className="mx-0 my-2">
              <Link href={`/r/${sub.name}/create`} legacyBehavior>
                <a className="w-full p-2 text-sm text-white bg-gray-400 rounded">
                  포스트 생성
                </a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBar;
