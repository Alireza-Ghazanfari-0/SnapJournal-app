import SigninSignupForm from "@/components/signin-signup/login-form";
import { useSearchParams } from "next/navigation";

function Authentication() {
  const [searchParams, setSearchParams] = useSearchParams();
  // console.log(searchParams);
  let mode;
  if (searchParams && searchParams[1] === "signup") {
    mode = "signup";
  } else {
    mode = "signin";
  }
  return (
    <div>
      <SigninSignupForm mode={mode} />
    </div>
  );
}

export default Authentication;
