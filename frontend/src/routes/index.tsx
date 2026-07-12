import { useEffect, useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { toastConfig } from "@/components/ui/sonner";
import ChatPage from "@/page/chat/chat.page";
import { useAuthStore } from "@/store/auth.store";
import { isTokenExpired, parseJwt } from "@/lib/utils";
import type { User } from "@/feature/chat/hook/use-get-users.hook";

function RootComponent() {
  const navigate = useNavigate();
  const { token, clearToken } = useAuthStore();

  useEffect(() => {
    if (!token) {
      clearToken(); // clear token

      if(isTokenExpired(token)){
       toast.info( "Your session has expired. Please sign in again.",toastConfig);   
      }else{
   toast.info( "Please sign in to continue. Redirecting...", toastConfig  );
      }
    
      navigate({
        to: "/auth/sign-in",
        replace: true,
      });
    }
  }, [token, navigate, clearToken]);

  if (!token || isTokenExpired(token)) {
    return null;
  }

  return <ChatPage />;
}
export const Route = createFileRoute("/")({
  component: RootComponent,
});