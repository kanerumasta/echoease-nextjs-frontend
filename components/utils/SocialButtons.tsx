import SocialButton from "./SocialButton";
import { continueWithGoogle, continueWithFacebook } from "@/utils";
import { ImGoogle, ImFacebook } from "react-icons/im";

export default function SocialButtons() {
    return (
        <div className="flex items-center ">
            <SocialButton
                callBack={continueWithGoogle}
                text="Google"
                icon={<ImGoogle />}
                color="bg-red-400"
            />
            <SocialButton
                callBack={continueWithFacebook}
                text="Facebook"
                icon={<ImFacebook />}
                color="bg-blue-400"
            />
        </div>
    );
}
