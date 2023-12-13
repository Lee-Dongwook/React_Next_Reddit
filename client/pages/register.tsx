import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import axios from "axios";
import InputGroup from "@/components/InputGroup";

const Register = () => {
  const [email, setEmail] = useState<string>("");
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errors, setErrors] = useState<any>({});

  let router = useRouter();

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();

    try {
      const response = await axios.post("/auth/register", {
        email,
        password,
        username,
      });
      console.log("response", response);
      router.push("/login");
    } catch (error: any) {
      console.log("error", error);
      setErrors(error.response.data || {});
    }
  };

  return (
    <div className="bg-white">
      <div className="flex flex-col items-center justify-content h-screen p-6">
        <div className="w-10/12 mx-auto md:w-96"></div>
        <h1 className="mb-2 text-lg font-medium">회원가입</h1>
        <form onSubmit={handleSubmit}>
          <InputGroup
            placeholder="Email"
            value={email}
            setValue={setEmail}
            error={errors.email}
          />
          <InputGroup
            placeholder="Username"
            value={username}
            setValue={setUsername}
            error={errors.username}
          />
          <InputGroup
            placeholder="Password"
            value={password}
            setValue={setPassword}
            error={errors.password}
          />
          <button className="w-full py-2 mb-1 text-xs font-bold text-white uppercase bg-gray-400 border border-gray-400 rounded">
            회원가입
          </button>
        </form>
        <small>
          이미 가입하셨나요?{" "}
          <Link href="/login" legacyBehavior>
            <a id="/login" className="m1-1 text-blue-500 uppercase">
              로그인
            </a>
          </Link>
        </small>
      </div>
    </div>
  );
};

export default Register;
