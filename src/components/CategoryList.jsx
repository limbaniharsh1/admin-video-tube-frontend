import React, { useRef, useState } from "react";
import { useDrag, useDrop, DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { Edit2, Trash2, GripVertical, Plus } from "lucide-react";
import CategoryModal from "./CategoryModal";
import { useDispatch, useSelector } from "react-redux";
import { deleteCategoryThunk } from "../store/category/thunk";
import DeleteConfirmationModal from "./DleleteConfirmationModal";

const CategoryItem = ({ id, name, index, moveCategory, onEdit, onDelete }) => {
  const ref = useRef(null);
  const [{ isDragging }, drag] = useDrag({
    type: "CATEGORY",
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  const [, drop] = useDrop({
    accept: "CATEGORY",
    hover: (item, monitor) => {
      if (!ref.current) return;
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) return;
      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) return;
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) return;
      moveCategory(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  drag(drop(ref));

  return (
    <div
      ref={ref}
      className={`flex items-center justify-between p-4 mb-2 bg-gray-800 rounded-lg border border-gray-700 ${
        isDragging ? "opacity-50" : ""
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="cursor-move text-gray-500 hover:text-gray-300">
          <GripVertical size={20} />
        </div>
        <span className="text-lg">{name}</span>
      </div>
      <div className="flex gap-2">
        <button
          onClick={() => onEdit({ id, name })}
          className="p-2 text-gray-400 hover:text-purple-500 rounded-full hover:bg-gray-700 transition-colors"
          aria-label="Edit category"
        >
          <Edit2 size={16} />
        </button>
        <button
          onClick={() => onDelete({ id, name })}
          className="p-2 text-gray-400 hover:text-red-500 rounded-full hover:bg-gray-700 transition-colors"
          aria-label="Delete category"
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

const CategoryList = ({ onEdit }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const [deletingCategory, setDeletingCategory] = useState({});
  const { data } = useSelector((state) => state.Category);
  const dispatch = useDispatch();

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  const handleConfirmDelete = async () => {
    await dispatch(deleteCategoryThunk({ id: deletingCategory.id })).unwrap();
    setDeletingCategory({});
  };

  const handleClose = () => {
    setDeletingCategory({});
  };

  const [categories, setCategories] = useState([]);

  const moveCategory = (dragIndex, hoverIndex) => {
    const updated = [...categories];
    const draggedItem = updated[dragIndex];
    updated.splice(dragIndex, 1);
    updated.splice(hoverIndex, 0, draggedItem);
    setCategories(updated);
  };

  const deleteCategory = (values) => {
    setDeletingCategory(values);
    // dispatch(deleteCategoryThunk({ id }));
    // setCategories(categories.filter((cat) => cat.id !== id));
  };

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center">
        <h2 className="text-2xl font-bold mb-4">No categories added yet</h2>
        <p className="text-gray-400">Add your first category to get started</p>
        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 mt-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
        >
          <Plus size={18} />
          <span className="hidden sm:inline">{"Add Category"}</span>
        </button>
        <CategoryModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          editingCategory={editingCategory}
        />
      </div>
    );
  }

  return (
    <>
      <DndProvider backend={HTML5Backend}>
        <div>
          <div className="flex items-center justify-between mb-6">
            <span>
              <h2 className="text-2xl font-bold mb-6">Manage Categories</h2>
              {/* <p className="text-gray-400 mb-6">
              Drag and drop to reorder categories
            </p> */}
            </span>
            {/* <button
            onClick={() => setIsModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition-colors"
          >
            <Plus size={18} />
            <span className="hidden sm:inline">{"Add Category"}</span>
          </button> */}
          </div>
          <div className="max-w-2xl mx-auto">
            {data.map((category, index) => (
              <CategoryItem
                key={category._id}
                id={category._id}
                name={category.name}
                index={index}
                moveCategory={moveCategory}
                onEdit={onEdit}
                onDelete={deleteCategory}
              />
            ))}
          </div>
          <CategoryModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            editingCategory={editingCategory}
          />
        </div>
      </DndProvider>

      <DeleteConfirmationModal
        isOpen={Object.keys(deletingCategory)?.length > 0}
        onClose={handleClose}
        onConfirm={handleConfirmDelete}
        isDeleting={false}
        itemName={deletingCategory?.title}
        itemType="item"
      />
    </>
  );
};

export default CategoryList;
