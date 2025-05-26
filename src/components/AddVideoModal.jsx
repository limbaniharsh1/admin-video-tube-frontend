import React, { useRef, useEffect, useState, useCallback } from "react";
import { X, Upload, Film } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoryThunk } from "../store/category/thunk";
import { useFormik } from "formik";
import * as Yup from "yup";
import { uploadVideoThunk } from "../store/videos/thunk";

export default function AddVideoModal({ isOpen, onClose, onAdd }) {
  const { data } = useSelector((store) => store.Category);
  const { loading } = useSelector((store) => store.Videos);
  const dispatch = useDispatch();

  const predefinedCategories = data || [];

  const [videoUrl, setVideoUrl] = useState(null);
  const [thumbnailUrl, setThumbnailUrl] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [tagInput, setTagInput] = useState("");

  const videoInputRef = useRef(null);
  const thumbnailInputRef = useRef(null);
  const dropdownRef = useRef(null);

  useEffect(() => {
    if (!data?.length) dispatch(getAllCategoryThunk());
  }, [data, dispatch]);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const formik = useFormik({
    initialValues: {
      title: "",
      categories: [],
      description: "",
      video: null,
      thumbnailFile: null,
      tags: [],
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      video: Yup.mixed().required("Video file is required"),
      categories: Yup.array()
        .min(1, "At least one category is required")
        .of(
          Yup.object().shape({
            id: Yup.string().required(),
            name: Yup.string().required(),
          })
        ),
    }),
    onSubmit: async (values, { resetForm }) => {
      const formData = new FormData();
      formData.append("video", values.video);
      if (values.thumbnailFile)
        formData.append("thumbnail", values.thumbnailFile);
      formData.append("title", values.title);
      formData.append("description", values.description);
      formData.append("tags", JSON.stringify(values.tags)); // Important: convert arrays to JSON string
      const categoryIds = values.categories.map((cat) => cat.id);
      formData.append("categories", JSON.stringify(categoryIds));
      await dispatch(uploadVideoThunk(formData)).unwrap();
      // onClose();

      // onAdd({
      //   title: values.title,
      //   categories: values.categories,
      //   video: values.video,
      //   thumbnailUrl,
      // });

      setVideoUrl(null);
      setThumbnailUrl(null);
      resetForm();
      onClose();
    },
  });

  const handleAddCategory = () => {
    const { categoryInput, categories } = formik.values;
    const trimmed = categoryInput.trim();

    if (trimmed && !categories.includes(trimmed)) {
      formik.setFieldValue("categories", [...categories, trimmed]);
    }
    formik.setFieldValue("categoryInput", "");
    setIsDropdownOpen(false);
  };

  const handleRemoveCategory = (id) => {
    formik.setFieldValue(
      "categories",
      formik.values.categories.filter((c) => c.id !== id)
    );
  };

  const handleVideoChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoUrl(URL.createObjectURL(file));
      formik.setFieldValue("video", file);
    }
  };

  const handleThumbnailChange = (e) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailUrl(URL.createObjectURL(file));
      formik.setFieldValue("thumbnailFile", file);
    }
  };

  const handleClose = useCallback(() => {
    formik.resetForm();
    setVideoUrl(null);
    setThumbnailUrl(null);
    setIsDropdownOpen(false);
    onClose();
  }, [onClose]);

  const handleTagKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const trimmed = tagInput.trim();
      if (trimmed && !formik.values.tags.includes(trimmed)) {
        formik.setFieldValue("tags", [...formik.values.tags, trimmed]);
      }
      setTagInput("");
    }
  };

  const handleRemoveTag = (indexToRemove) => {
    formik.setFieldValue(
      "tags",
      formik.values.tags.filter((_, index) => index !== indexToRemove)
    );
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
      <div className="bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-bold">Add New Video</h2>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white"
          >
            <X size={24} />
          </button>
        </div>

        <form onSubmit={formik.handleSubmit} className="p-4 space-y-6">
          {/* Title */}
          <div className="space-y-2">
            {/* <label htmlFor="title" className="block text-sm font-medium">
              Title
            </label> */}
            <input
              id="title"
              name="title"
              type="text"
              value={formik.values.title}
              onChange={formik.handleChange}
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md"
              placeholder="Enter video title"
            />
            {formik.errors.title && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.title}</p>
            )}
          </div>

          {/* Categories */}
          <div className="space-y-2">
            {/* <label className="block text-sm font-medium">Categories</label> */}
            <div className="relative" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-left"
              >
                {formik.values.categories.length
                  ? `${formik.values.categories.length} selected`
                  : "Select categories"}
              </button>

              {isDropdownOpen && (
                <div className="absolute z-10 w-full mt-1 bg-gray-700 border border-gray-600 rounded shadow-lg max-h-60 overflow-y-auto">
                  <div className="p-2">
                    <input
                      type="text"
                      name="categoryInput"
                      value={formik.values.categoryInput}
                      onChange={formik.handleChange}
                      onKeyDown={(e) => {
                        if (e.key === "Enter") {
                          e.preventDefault();
                          handleAddCategory();
                        }
                      }}
                      placeholder="Search or add category"
                      className="w-full px-3 py-2 bg-gray-800 border border-gray-600 rounded-md"
                    />
                  </div>
                  <ul className="py-1">
                    {predefinedCategories
                      .filter(
                        (cat) =>
                          !formik.values.categoryInput ||
                          cat.name
                            .toLowerCase()
                            .includes(formik.values.categoryInput.toLowerCase())
                      )
                      .map((cat) => (
                        <li key={cat._id} className="px-2">
                          <label className="flex items-center p-2 rounded hover:bg-gray-600 space-x-2">
                            <input
                              type="checkbox"
                              checked={formik.values.categories.some(
                                (c) => c.id === cat._id
                              )}
                              onChange={() => {
                                if (
                                  formik.values.categories.some(
                                    (c) => c.id === cat._id
                                  )
                                ) {
                                  formik.setFieldValue(
                                    "categories",
                                    formik.values.categories.filter(
                                      (c) => c.id !== cat._id
                                    )
                                  );
                                } else {
                                  formik.setFieldValue("categories", [
                                    ...formik.values.categories,
                                    { id: cat._id, name: cat.name },
                                  ]);
                                }
                              }}
                            />
                            <span>{cat.name}</span>
                          </label>
                        </li>
                      ))}
                  </ul>
                </div>
              )}
            </div>

            {formik.values.categories.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formik.values.categories.map((cat) => (
                  <div
                    key={cat.id}
                    className="flex items-center gap-1 px-3 py-1 bg-gray-700 rounded-full"
                  >
                    <span>{cat.name}</span>
                    <button
                      type="button"
                      onClick={() => handleRemoveCategory(cat.id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {formik.errors.categories && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.categories}
              </p>
            )}
          </div>

          <div className="flex gap-4">
            {/* Video File */}
            <div className="space-y-2 w-[50%]">
              <label className="block text-sm font-medium">Video File</label>
              <div
                onClick={() => videoInputRef.current?.click()}
                className="border-2 border-dashed border-gray-600 rounded-lg p-6 cursor-pointer hover:border-purple-500"
              >
                <input
                  type="file"
                  accept="video/*"
                  ref={videoInputRef}
                  className="hidden"
                  onChange={handleVideoChange}
                />
                {videoUrl ? (
                  <div>
                    <video
                      src={videoUrl}
                      controls
                      className="w-full h-40 rounded-lg"
                    />
                    {/* <p className="text-sm text-center text-gray-400">
                      {formik.values.video?.name}
                    </p> */}
                  </div>
                ) : (
                  <div className="flex flex-col items-center text-gray-400">
                    <Film size={48} />
                    <p>Click to upload video</p>
                  </div>
                )}
              </div>
              {formik.errors.video && (
                <p className="text-red-500 text-sm mt-1">
                  {formik.errors.video}
                </p>
              )}
            </div>

            {/* Thumbnail File */}
            <div className="space-y-2 w-[50%]">
              <label className="block text-sm font-medium">
                Thumbnail (Optional)
              </label>
              <div
                onClick={() => thumbnailInputRef.current?.click()}
                className="border-2 border-dashed border-gray-600 rounded-lg p-6 cursor-pointer hover:border-purple-500"
              >
                <input
                  type="file"
                  accept="image/*"
                  ref={thumbnailInputRef}
                  className="hidden"
                  onChange={handleThumbnailChange}
                />
                {thumbnailUrl ? (
                  <img
                    src={thumbnailUrl}
                    alt="thumbnail"
                    className="w-full h-40 rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex flex-col items-center text-gray-400">
                    <Upload size={48} />
                    <p>Click to upload thumbnail</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Tags Input */}
          <div className="space-y-2">
            {/* <label className="block text-sm font-medium">Tags</label> */}
            <div className="flex flex-wrap items-center gap-2 p-2 bg-gray-700 border border-gray-600 rounded-md min-h-[44px]">
              {formik.values.tags.map((tag, index) => (
                <div
                  key={index}
                  className="flex items-center gap-1 px-3 py-1 bg-purple-600 text-white rounded-full"
                >
                  <span>{tag}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveTag(index)}
                    className="hover:text-red-300"
                  >
                    <X size={14} />
                  </button>
                </div>
              ))}
              <input
                type="text"
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder="Type and press Enter to add tags"
                className="bg-transparent flex-1 min-w-[120px] outline-none text-white"
              />
            </div>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <textarea
              value={formik.values.description}
              onChange={formik.handleChange}
              placeholder="Enter video description"
              name="description"
              id="description"
              className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md"
            ></textarea>
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-2 pt-4 border-t border-gray-700">
            <button
              type="button"
              onClick={handleClose}
              className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-md disabled:opacity-50"
              disabled={loading || !formik.isValid || !formik.values.video}
            >
              {loading ? "Adding..." : "Add Video"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
