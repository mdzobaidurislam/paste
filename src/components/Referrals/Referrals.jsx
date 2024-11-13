import {
  BadgeDollarSign,
  ChevronRight,
  Link2,
  Sparkles,
  X,
} from "lucide-react";
import styles from "./../Dialog.module.css";
import { Input } from "../ui/input";
import { ToastAction } from "../ui/toast";
import { useToast } from "@/hooks/use-toast";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Referrals({ setDialogOpen }) {
  const NEXT_PUBLIC_BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
  const [referral_code, setReferral_code] = useState("");
  const user = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  useEffect(() => {
    if (user?.user?.referral_code) {
      setReferral_code(user?.user?.referral_code);
    }
  }, [user?.user?.referral_code]);

  const handledUpdate = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/referal_update", {
        email: user?.user?.email,
        referral_code: referral_code,
      });
      console.log(data);

      if (data.success) {
        toast({
          title: data.message,
        });
      } else {
        toast({
          variant: "destructive",
          title: data.error || "Failed to update password",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: "destructive",
        title: error?.response?.data?.error,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setLoading(false);
    }
  };

  // handleCopy url
  const handleCopy = async (textToCopy, num) => {
    try {
      await navigator.clipboard.writeText(textToCopy);
      // setIsCopied(true)
      toast({
        title: num
          ? "Publisher referral link copied to clipboard."
          : "Premium referral link copied to clipboard.",
      });

      setTimeout(() => {
        // setIsCopied(false)
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return (
    <div
      style={{
        height: "510px",
        opacity: "1",
      }}
      className="bg-primary-gradient overflow-auto "
    >
      <div>
        <div data-overflow-hidden="true">
          <div className={styles.dialog_head_wrapper}>
            <button
              onClick={() => setDialogOpen(false)}
              aria-label="Close"
              className={styles.dialog_close_btn}
            >
              <span aria-hidden="true">
                <X />
              </span>
            </button>
            <div>
              <div data-disabled="false">
                <BadgeDollarSign />
              </div>
            </div>
            <div className={styles.dialog_heading}>Referrals</div>
            <div className={styles.dialog_description}>
              Boost your publisher friends with $3 starting balance. Earn 8.5%
              on their earnings. Or make others join Premium to boost your RPM.
            </div>
          </div>
          <div className={styles.dialog_body_wrapper}>
            <div>
              <div className={styles.dialog_body_item_heading}>
                Create referral code
              </div>
              <div className={styles.dialog_creation_wrapper}>
                <div className={styles.dialog_input_container}>
                  <Input
                    value={referral_code}
                    onChange={(e) => setReferral_code(e.target.value)}
                    className={`${styles.dialog_input} border-blue-100 bg-transparent`}
                    required
                  />
                </div>
                <div className={styles.dialog_creation_divider}></div>
                <button
                  onClick={handledUpdate}
                  className={styles.dialog_create_btn}
                  type="submit"
                >
                  <span style={{ opacity: 1, transform: "none" }}>
                    <span>{loading ? "Updating..." : "Claim"}</span>
                  </span>
                </button>
              </div>
            </div>
            <div className={styles.dialog_divider}></div>

            {/* copy start  */}
            <div className={styles.dialog_body_item_list_wrapper}>
              <div>
                <div className={styles.dialog_body_item_heading_small}>
                  Refer publishers
                </div>
                <div>
                  <div className={styles.dialog_copy_box}>
                    <span>
                      {NEXT_PUBLIC_BASE_URL}/r/{referral_code}
                    </span>
                    <button
                      onClick={() =>
                        handleCopy(
                          `${NEXT_PUBLIC_BASE_URL}/r/${referral_code}`,
                          true
                        )
                      }
                    >
                      <Link2 />
                      Copy
                    </button>
                  </div>
                </div>
              </div>
              <div>
                <div className={styles.dialog_body_item_heading_small}>
                  Refer premium users
                </div>
                <div>
                  <div className={styles.dialog_copy_box}>
                    <span>
                      {NEXT_PUBLIC_BASE_URL}/premium?ref={referral_code}
                    </span>
                    <button
                      onClick={() =>
                        handleCopy(
                          `${NEXT_PUBLIC_BASE_URL}/premium?ref/${referral_code}`,
                          false
                        )
                      }
                    >
                      <Link2 />
                      Copy
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {/* copy end */}
            <div className={styles.dialog_divider}></div>

            <button className={styles.buttons_wrapper}>
              <div className={styles.buttons_start_wrapper}>
                <Sparkles />
                <div>Analytics</div>
              </div>
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
