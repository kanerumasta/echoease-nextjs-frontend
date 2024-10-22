import SocialButton from "./SocialButton";
import { continueWithGoogle, continueWithFacebook } from "@/utils";
import { ImGoogle, ImFacebook } from "react-icons/im";

export default function SocialButtons() {
    return (
        <div className="flex items-center my-4 justify-between ">
            <SocialButton
                callBack={continueWithGoogle}
                text="Google"
                icon={<ImGoogle />}
                
            />
            <SocialButton
                callBack={continueWithFacebook}
                text="Facebook"
                icon={<ImFacebook />}
                
            />
        </div>
    );
}
