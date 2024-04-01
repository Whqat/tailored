//Components
import { SignInButtonWithProvider } from "./SignInButtonWithProvider";
import Image from "next/image";

export const AuthCard = () => {
  return (
    
      <div className="flex flex-col border-2 border-black gap-12 bg-slate-50 w-[90%] md:w-[50%] lg:w-[30%] h-[50%] items-center rounded-lg shadow-black justify-center">
        <Image 
          src="logo-no-background.svg"
          width="200"
          height="200"
          alt="Logo"
          className="bg-slate-950 px-2"
        />
      <div className="flex flex-col gap-2 lg:w-[80%]">
        <p className="text-center text-gray-600">Sign-in</p>
        <SignInButtonWithProvider provider="google" />
        <SignInButtonWithProvider provider="github" />
      </div>
    </div>
  );
};
