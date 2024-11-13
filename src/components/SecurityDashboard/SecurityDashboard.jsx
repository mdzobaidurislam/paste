/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import styles from "./../Dialog.module.css";
import { Chrome, MoveUpRight, Settings, ShieldCheck, X } from "lucide-react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "../ui/toast";
import { useSession } from "next-auth/react";

export default function SecurityDashboard({ setDialogOpenSecurity }) {
  const { toast } = useToast();
  // const user = useSelector((state) => state.auth);
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { data, status } = useSession();
  const { user } = data;

  const handlePasswordUpdate = async () => {
    setLoading(true);

    if (!password) {
      toast({
        variant: "destructive",
        title: "Password is requried! ",
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
      setLoading(false);
      return false;
    }
    try {
      const { data } = await axios.post("/api/auth/update-password", {
        email: user?.email,
        password: password,
      });

      if (data.success) {
        console.log(data);
        toast({
          title: data.message,
        });
        setPassword("");
      } else {
        toast({
          variant: "destructive",
          title: data.error || "Failed to update password",
          action: <ToastAction altText="Try again">Try again</ToastAction>,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: error?.response?.data?.error,
        action: <ToastAction altText="Try again">Try again</ToastAction>,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        height: "510px",
        opacity: "1",
      }}
      className="bg-primary-gradient overflow-auto"
    >
      <div className=" text-white">
        {/* header  */}
        <div className={styles.dialog_head_wrapper}>
          <div className={styles.dialog_second_heading}>Security</div>
          <button
            aria-label="Close"
            onClick={() => setDialogOpenSecurity(false)}
            className={styles.dialog_close_btn}
          >
            <span aria-hidden="true">
              <X />
            </span>
          </button>
        </div>
        {/* wrapper  */}
        <div className={styles.dialog_body_wrapper}>
          <div className={styles.dialog_security_heading}>
            <ShieldCheck />
            No security threats found.
          </div>

          <div className={styles.dialog_divider}></div>
          <div className={styles.dialog_heading}>Secret API Key</div>
          <div className={styles.dialog_description}>
            Lets you engage with Paster from your application. Check your
            <button className={styles.dialog_inline_link}>
              key and API Examples →
            </button>
          </div>
          <div className={styles.dialog_divider}></div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="picture">New password</Label>
            <Input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="picture"
              className="border-blue-100 border mt-1"
              type="text"
              placeholder="Password"
            />
            <Button
              onClick={handlePasswordUpdate}
              disabled={loading}
              className="border-blue-100 border mt-1 bg-white text-white hover:bg-transparent bg-opacity-25 hover:text-white "
            >
              {loading ? "Updating..." : "Submit"}
            </Button>
          </div>

          <div className={styles.dialog_divider}></div>
          <div className={styles.dialog_heading}>Devices</div>
          <div className={styles.dialog_description}>
            Where you're signed in
          </div>
          <button
            className={`${styles.dialog_box_wrapper} ${styles.dialog_box_session_wrapper} `}
          >
            <div className={styles.dialog_box_session_start_wrapper}>
              <div className={styles.dialog_box_session_icon}>
                <Chrome />
              </div>
              <div>
                <div className={styles.dialog_box_session_start_heading}>
                  Edge on Windows
                </div>
                <div
                  className={
                    styles.dialog_box_session_start_description_wrapper
                  }
                >
                  <div
                    className={
                      styles.dialog_box_session_start_description_current_dot
                    }
                  ></div>
                  <div
                    className={
                      styles.dialog_box_session_start_description_current
                    }
                  >
                    Current session
                  </div>
                  <div className={styles.dialog_box_session_dot}>·</div>
                  <span>Singapore, SG</span>
                </div>
              </div>
            </div>
          </button>

          <div className={styles.dialog_divider}></div>

          <div>
            <div className={`${styles.dialog_heading} mb-4`}>More details</div>
            <a
              href="/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.buttons_wrapper}
            >
              <div className={styles.buttons_start_wrapper}>
                <Settings />
                <div>Account Portal</div>
              </div>
              <MoveUpRight />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
