import React, { useState } from "react";
import AuthLayout from "./layout";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { verifyAdminThunk } from "../../store/auth/thunk";
import { routeConstants } from "../../constants/routes";

const VerifyAdmin = () => {
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { adminId } = useSelector((store) => store.Auth);

  const formik = useFormik({
    initialValues: {
      secretCode: "",
    },
    validationSchema: Yup.object({
      secretCode: Yup.string()
        .min(10, "secret must be at 10 characters")
        .max(10, "secret must be at 10 characters")
        .required("Required"),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        await dispatch(verifyAdminThunk({ ...values, adminId })).unwrap();
        navigate(routeConstants.HOME);
      } catch (err) {
        setError(err.message);
      }
    },
  });
  return (
    <AuthLayout>
      <form className="space-y-6" onSubmit={formik.handleSubmit}>
        {error && (
          <div className="bg-red-900/30 border border-red-800 text-red-300 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}
        <div>
          <label
            htmlFor="secretCode"
            className="block text-sm font-medium text-gray-300"
          >
            Enter Admin Secret
          </label>
          <div className="mt-1">
            <input
              id="secretCode"
              name="secretCode"
              type="text"
              autoComplete="secretCode"
              className="appearance-none block w-full px-3 py-2 border border-gray-600 rounded-md shadow-sm placeholder-gray-500 bg-gray-700 text-white focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm"
              placeholder="......."
              {...formik.getFieldProps("secretCode")}
            />
            {formik.touched.secretCode && formik.errors.secretCode && (
              <p className="mt-1 text-sm text-red-400">
                {formik.errors.secretCode}
              </p>
            )}
          </div>
        </div>

        <div>
          <button
            type="submit"
            disabled={formik.isSubmitting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {formik.isSubmitting ? "Verifying..." : "Verify"}
          </button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default VerifyAdmin;
