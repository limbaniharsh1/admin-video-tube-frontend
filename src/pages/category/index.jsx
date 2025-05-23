import { useEffect, useState } from "react";
import Header from "../../components/Header";
import { DndProvider } from "react-dnd";
import CategoryList from "../../components/CategoryList";
import { HTML5Backend } from "react-dnd-html5-backend";
import CategoryModal from "../../components/CategoryModal";
import Layout from "../../Layout";
import { useDispatch, useSelector } from "react-redux";
import { getAllCategoryThunk } from "../../store/category/thunk";

export default function CategoriesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState(null);
  const { data, loading } = useSelector((store) => store.Category);

  const dispatch = useDispatch();

  const handleOpenModal = (category) => {
    if (category?.id) {
      setEditingCategory(category);
    } else {
      setEditingCategory(null);
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
  };

  useEffect(() => {
    if (!data?.length > 0) {
      dispatch(getAllCategoryThunk());
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <Layout btnContent="Add Category" onAddClick={handleOpenModal}>
        {/* <Header title="Categories" onAddClick={() => handleOpenModal()} /> */}
        <div className="container mx-auto px-4 py-8">
          <DndProvider backend={HTML5Backend}>
            <CategoryList onEdit={handleOpenModal} />
          </DndProvider>
        </div>
        <CategoryModal
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          editingCategory={editingCategory}
        />
      </Layout>
    </div>
  );
}
