import React from "react";
import { LogOut } from "lucide-react";
import { useNavigate } from "@tanstack/react-router";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import type { User } from "../hook/use-get-users.hook";

function UserProfile({ user }: { user: User }) {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("token");
    navigate({ to: "/auth/sign-in" });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={
           <button className="flex w-full cursor-pointer items-center gap-4 px-5 py-4 text-left transition-colors hover:bg-muted/50">
          <div className="relative">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-lg font-semibold text-primary-foreground">
              {user.name.charAt(0).toUpperCase()}
            </div>

            <span
              className={`absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-white ${
                user.active ? "bg-green-500" : "bg-gray-400"
              }`}
            />
          </div>

          <div className="flex-1">
            <h3 className="font-medium">{user.name}</h3>

            <p
              className={`text-sm ${
                user.active ? "text-green-600" : "text-muted-foreground"
              }`}
            >
              {user.active ? "Active" : "Inactive"}
            </p>
          </div>

          <span
            className={`rounded-full px-3 py-1 text-xs font-medium ${
              user.active
                ? "bg-green-100 text-green-700"
                : "bg-gray-100 text-gray-600"
            }`}
          >
            {user.active ? "Online" : "Offline"}
          </span>
        </button>
      }>
     
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem
          onClick={logout}
          className="cursor-pointer text-destructive focus:text-destructive"
        >
          <LogOut className="mr-2 h-4 w-4" />
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export default React.memo(UserProfile);