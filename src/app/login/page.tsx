"use client";
import Header from "@/components/Header";
import PasswordInput from "@/components/PasswordInput";
import { Input } from "@nextui-org/input";
import { Button } from "@nextui-org/button";
import { useContext, useEffect, useRef, useState } from "react";
import { LoadingContext } from "@/app/providers";
import EmailInput from "@/components/EmailInput";
import { EmailPattern } from "@/consts/pattern";
import { SendEmailCode, Login, CalcWalletAddress } from "@/api/auth";

import { Global } from "@/server/Global";
import { JSONBigInt } from "@/server/js/common_utils";
import { AccountInterface } from "@/server/account/AccountInterface";
import { useRouter } from "next/navigation";
import Toast from "@/utils/toast";
import { useChains } from "@/store/useChains";
import { useAddress } from "@/store/useAddress";
import { Config } from "@/server/config/Config";

const CountdownTime = 60;

const LoginPage = () => {
  const router = useRouter();
  const { currentChain } = useChains((state) => state);
  const { setMpcAddress, setAddressList, setCurrentAddress } = useAddress(
    (state) => state
  );
  const [password, setPasswork] = useState("123456789");
  const [email, setEmail] = useState("su_5482@163.com");
  const [code, setCode] = useState("");
  const { setLoading } = useContext(LoadingContext);

  const [countdownTime, setCountdownTime] = useState(CountdownTime);
  const canSend = countdownTime === CountdownTime;
  const timer = useRef<any>();

  function handleLoginBtnClick() {
    if (!email) {
      Toast("Please enter your email address");
      return;
    }
    if (!code) {
      Toast("Please enter code");
      return;
    }
    mpcLogin();
  }

  const mpcLogin = async () => {
    try {
      setLoading(true, "Login...");
      const mpcPassword = password.trim();
      const mpcKey1 = Global.keyManage.getKeyFromLocalStorage(mpcPassword);
      if (mpcKey1 == null || mpcKey1 === "") {
        Toast("Please register first");
        setLoading(false);
        return;
      }

      const result = await Login(email, code);
      if (result.body["code"] != 200) {
        Toast(result.body["message"] || "Login failed");
        setLoading(false);
        return;
      }

      Global.authorization = result.body["result"];
      Global.account.setAuthorization(Global.authorization);
      Global.account.setBlockchainRpc(currentChain?.rpcApi!);
      await Global.account.initAccount(JSONBigInt.stringify(mpcKey1));
      localStorage.setItem("email", email);
      const mpcAddress = await Global.account.getOwnerAddress();
      console.log("mpcAddress", mpcAddress);
      setMpcAddress(mpcAddress);
      const res = await CalcWalletAddress(mpcAddress);
      const data = res.body.result;
      setAddressList(data);
      setCurrentAddress(currentChain?.ID!);
      setLoading(false);
      router.push("/dashboard");
    } catch (error: any) {
      // message.error((error as Error).message)
      return;
    }
  };

  async function handleSendCode() {
    if (!email) {
      Toast("Please enter your email address");
      return;
    }
    if (email.match(EmailPattern)) {
      setLoading(true, "Sending Code...");
      const res = await SendEmailCode(email);
      setLoading(false);
      if (res.body.code == 200) {
        setCountdownTime(CountdownTime - 1);
        if (timer.current) {
          clearInterval(timer.current);
          timer.current = null;
        }
        timer.current = setInterval(() => {
          setCountdownTime((t) => {
            if (t <= 1) {
              clearInterval(timer.current);
              return CountdownTime;
            }
            return t - 1;
          });
        }, 1000);
      }
    } else {
      Toast("Please enter the correct email address");
      return;
    }
  }

  function handleSignup() {
    router.replace("/register");
  }

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearInterval(timer.current);
        timer.current = null;
      }
    };
  }, []);

  return (
    <div className="h-full bg-[url(/imgs/bg.png)]">
      <Header title="Login" />
      <div className="mian p-8">
        <PasswordInput
          value={password}
          onValueChange={setPasswork}
          className="mb-6"
          label="Password"
        />
        <EmailInput
          value={email}
          onValueChange={setEmail}
          label="Email"
          onClear={() => setEmail("")}
          className="mb-6"
        />
        <div className="flex items-center mb-6">
          <Input
            isClearable
            type="text"
            value={code}
            label="Code"
            variant="bordered"
            onClear={() => setCode("")}
            className="flex-1"
            maxLength={6}
            onValueChange={setCode}
          />

          <Button
            onClick={handleSendCode}
            size="lg"
            className="w-32 text-white p-7 ml-4 bg-[#819DF5]"
            isDisabled={!canSend}
          >
            {countdownTime == CountdownTime ? "Send" : `${countdownTime} s`}
          </Button>
        </div>
        <div className="text-[#819DF5] text-xs text-right">
          Login on another device?
        </div>
      </div>
      <div className="mt-8 p-8 text-xs">
        <div className="mb-4 text-center">
          <span className="opacity-50">Don`t have an account? </span>
          <span onClick={handleSignup} className="text-white">
            Sign Up
          </span>
        </div>
        <Button
          fullWidth
          size="lg"
          className="bg-[#819DF5] rounded-3xl"
          onClick={handleLoginBtnClick}
        >
          Login
        </Button>
      </div>
    </div>
  );
};
export default LoginPage;
