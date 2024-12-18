/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLoading } from "@/hooks/useLoading";
import { AppDispatch } from "@/store";
import { loginUser } from "@/store/actions/authActions";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const dispatch: AppDispatch = useDispatch();
  const [isSubmitting] = useState(false);
  const { isLoading, startLoading, stopLoading } = useLoading();

  // Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    startLoading();

    try {
      await dispatch(loginUser(formData));
    } catch (error) {
      console.error("Đăng nhập thất bại: ", error);
    } finally {
      stopLoading();
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto w-full max-w-md space-y-4 bg-white p-6 shadow-md rounded-md"
    >
      <h1 className="text-xl font-semibold text-center">Đăng nhập</h1>

      {/* Username Field */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="username" className="text-sm font-medium">
          Tên đăng nhập
        </label>
        <Input
          id="username"
          name="username"
          type="text"
          placeholder="Nhập tên người dùng"
          value={formData.username}
          onChange={handleChange}
        />
      </div>

      {/* Password Field */}
      <div className="flex flex-col space-y-1">
        <label htmlFor="password" className="text-sm font-medium">
          Mật khẩu
        </label>
        <Input
          id="password"
          name="password"
          type="password"
          placeholder="Nhập mật khẩu"
          value={formData.password}
          onChange={handleChange}
        />
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        className="w-full"
        variant="default"
        size="lg"
        disabled={isSubmitting}
      >
        {isLoading ? "Đang đăng nhập..." : "Đăng nhập"}
      </Button>
    </form>
  );
}
