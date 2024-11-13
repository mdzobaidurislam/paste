/* eslint-disable react/no-unescaped-entities */

import {
  ChevronRight,
  MegaphoneOff,
  Minus,
  Plus,
  Shell,
  ShieldAlert,
  Wallet,
  X,
} from "lucide-react";
import { Switch } from "../ui/switch";
import styles from "./../Dialog.module.css";
import { useEffect, useState } from "react";
import { ToastAction } from "../ui/toast";
import { useSelector } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";

export default function Monetization({ setDialogOpen }) {
  const user = useSelector((state) => state.auth);

  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const timeOptions = [
    "15 seconds",
    "30 seconds",
    "1 minute",
    "5 minutes",
    "15 minutes",
    "30 minutes",
    "1 hour",
    "3 hours",
  ];

  const [currentIndex, setCurrentIndex] = useState(2); // Start at "1 minute"
  const [errorMessage, setErrorMessage] = useState("");
  const [monetizationOn, setMonetizationOn] = useState(false);

  useEffect(() => {
    if (user?.user?.monetization) {
      setMonetizationOn(user?.user?.monetization);
    }
    if (user?.user?.waiting_time) {
      setCurrentIndex(user?.user?.waiting_time);
    }
  }, [user?.user]);

  const incrementTime = () => {
    if (currentIndex < timeOptions.length - 1) {
      setCurrentIndex(currentIndex + 1);
      handledUpdate("waiting_time", currentIndex + 1, "waiting_time");
      setErrorMessage(""); // Clear error if time is above 1 minute
    }
  };

  const decrementTime = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      handledUpdate("waiting_time", currentIndex - 1, "waiting_time");
      // Show error if the time drops below "1 minute"
      if (
        timeOptions[currentIndex - 1] === "1 minute" ||
        timeOptions[currentIndex - 1] === "30 seconds" ||
        timeOptions[currentIndex - 1] === "15 seconds"
      ) {
        setErrorMessage("Little to no earnings expected.");
      } else {
        setErrorMessage(""); // Clear error if time is above 1 minute
      }
    }
  };

  const handledUpdate = async (key, value, type) => {
    setLoading(true);
    try {
      const { data } = await axios.post("/api/auth/update", {
        email: user?.user?.email,
        [key]: value,
        type: type,
      });

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

  return (
    <div
      style={{
        height: "653px",
        opacity: "1",
      }}
      className="bg-primary-gradient overflow-auto"
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
                <Shell />
              </div>
            </div>
            <div className={styles.dialog_heading}>Monetization</div>
            <div className={styles.dialog_description}>
              Your RPM (revenue per 1000 visitors) depends on how many premium
              sales you get. Advertising settings influence how much your
              visitors want to buy Premium.
            </div>
          </div>
          <div className={styles.dialog_body_wrapper}>
            <button className={styles.buttons_wrapper}>
              <div className={styles.buttons_start_wrapper}>
                <Wallet />
                <div>Request new cashout</div>
              </div>
              <ChevronRight />
            </button>
            <div className={styles.dialog_divider}></div>
            <div className={styles.dialog_progressive_wrapper}>
              <div>
                <div className={styles.dialog_progressive_heading}>
                  Progressive waiting time
                </div>
                <div className={styles.dialog_progressive_description}>
                  Balances waiting time based on visitor buy power.
                </div>
              </div>
              <Switch
                className={styles.dialog_toggle}
                checked={monetizationOn}
                onCheckedChange={(e) => {
                  console.log(e);
                  setMonetizationOn(e);
                  handledUpdate("monetization", e, "monetization");
                }}
              />
            </div>
            <div className={styles.dialog_divider}></div>
            <div className={styles.dialog_waiting_time_heading}>
              Waiting time
            </div>
            <div className={styles.dialog_waiting_time_description}>
              Waiting time until paste content becomes visible. 10% get higher
              waiting time to improve sales and thus RPM. It's the most
              important setting.
            </div>

            <div className={styles.dialog_waiting_wrapper}>
              <button
                aria-label="Decrease waiting time"
                onClick={decrementTime}
                disabled={currentIndex === 0}
              >
                <Minus />
              </button>
              <span style={{ opacity: 1, transform: "none" }}>
                {timeOptions[currentIndex]}
              </span>
              <button
                aria-label="Increase waiting time"
                onClick={incrementTime}
                disabled={currentIndex === timeOptions.length - 1}
              >
                <Plus />
              </button>
            </div>
            {errorMessage && (
              <div className={styles.dialog_waiting_error}>
                <ShieldAlert />
                Little to no earnings expected.
              </div>
            )}

            <div className={styles.dialog_divider}></div>
            <button className={styles.buttons_wrapper}>
              <div className={styles.buttons_start_wrapper}>
                <MegaphoneOff />
                <div>Blacklisted domains</div>
              </div>
              <ChevronRight />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
