import React, { useEffect } from "react";
import { X } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import {
  createCategoryThunk,
  updateCategoryThunk,
} from "../store/category/thunk";

function CategoryModal({ isOpen, onClose, editingCategory }) {
  console.log(editingCategory);
  const dispatch = useDispatch();
  const { loading } = useSelector((store) => store.Category);
  const formik = useFormik({
    initialValues: {
      name: "",
    },
    validationSchema: Yup.object({
      name: Yup.string()
        .trim()
        .required("Category name is required")
        .min(2, "Must be at least 2 characters"),
    }),
    onSubmit: async (values) => {
      if (editingCategory) {
        await dispatch(
          updateCategoryThunk({ id: editingCategory.id, values })
        ).unwrap();
        formik.resetForm();
        onClose();
      } else {
        await dispatch(createCategoryThunk(values)).unwrap();
        formik.resetForm();
        onClose();
      }
    },
    enableReinitialize: true,
  });

  useEffect(() => {
    if (editingCategory) {
      formik.setValues({ name: editingCategory.name });
    } else {
      formik.resetForm();
    }
  }, [editingCategory, isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-md">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">
            {editingCategory ? "Edit Category" : "Add New Category"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <form
          onSubmit={formik.handleSubmit}
          className="p-4 space-y-6 text-start"
        >
          <div className="space-y-2">
            <label
              htmlFor="categoryName"
              className="block   text-sm font-medium"
            >
              Category Name
            </label>
            <input
              id="categoryName"
              name="name"
              type="text"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className={`w-full px-3 py-2 bg-gray-700 border ${
                formik.touched.name && formik.errors.name
                  ? "border-red-500"
                  : "border-gray-600"
              } rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500`}
              placeholder="Enter category name"
              autoFocus
            />
            {formik.touched.name && formik.errors.name && (
              <p className="text-sm text-red-500">{formik.errors.name}</p>
            )}
          </div>

          <div className="flex justify-end gap-2 pt-4 border-t border-gray-700">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading || !formik.isValid || !formik.dirty}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {editingCategory
                ? loading
                  ? "Updating..."
                  : "Update"
                : loading
                ? "Adding..."
                : "Add"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CategoryModal;
