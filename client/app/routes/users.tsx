import { useState } from "react";
import { useTranslation } from "react-i18next";
import { UserForm } from "~/components/form";
import { User } from "~/components/user";
import { useUsers } from "~/hooks/useUsers";

export default function Users() {
  const { t } = useTranslation();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const users = useUsers();

  if (users == null) {
    return (
      <section className="container relative p-6 sm:p-16 h-screen flex flex-col">
        <h1 className="text-3xl sm:text-4xl text-primary font-bold mb-6">
          {t("users.title")}
        </h1>
        <p className="text-lg sm:text-2xl font-medium text-text-primary dark:text-dark-text-primary">
          {t("loading")}...
        </p>
      </section>
    );
  }

  return (
    <section className="container p-6 sm:p-16 h-screen flex flex-col">
      <h1 className="text-3xl sm:text-4xl text-primary font-bold mb-6">
        {t("user.title")}
      </h1>

      {/* Table Header */}
      <div className="hidden sm:grid grid-cols-4 gap-4 bg-background-100 dark:bg-dark-background-100 py-4 px-6 sm:px-12 rounded-lg shadow-md mb-6">
        <p className="text-lg sm:text-2xl font-bold text-text-primary dark:text-dark-text-primary">
          {t("user.name")}
        </p>
        <p className="text-lg sm:text-2xl font-bold text-text-primary dark:text-dark-text-secondary">
          {t("user.role")}
        </p>
        <p className="text-lg sm:text-2xl font-bold text-text-primary dark:text-dark-text-primary">
          {t("user.email")}
        </p>
      </div>

      {/* User List */}
      <div className="container flex flex-col gap-4 overflow-y-scroll scrollbar-custom">
        {/* @ts-ignore */}
        {users && users.map((user) => <User key={user.id} user={user} />)}
      </div>

      {/* Create User Button */}
      <button
          onClick={() => setIsModalOpen(true)}
           className="text-lg sm:text-xl font-bold bg-primary fixed bottom-6 right-4 sm:bottom-6 sm:right-6 text-background dark:text-dark-background w-12 sm:w-60 rounded-lg sm:px-4 sm:py-2 mt-6 
        border-3 border-primary hover:bg-background-100 dark:hover:bg-dark-background-100 hover:text-primary"
        >
        <span className="block sm:hidden text-3xl text-center">+</span>
        <span className="hidden sm:block">{t("user.create")}</span>
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-background dark:bg-dark-background bg-opacity-90 flex justify-center items-center z-50 w-screen h-screen">
          <div className="border-4 border-primary bg-background-100 dark:bg-dark-background-100 p-4 sm:p-6 rounded-xl w-[90%] sm:w-[400px]">
            <button
              onClick={() => setIsModalOpen(false)}
              className="text-primary float-right font-bold text-3xl sm:text-4xl"
            >
              X
            </button>
            <UserForm />
          </div>
        </div>
      )}
    </section>
  );
}