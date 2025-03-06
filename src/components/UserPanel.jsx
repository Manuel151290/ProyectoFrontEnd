import { useState, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import Avatar from "boring-avatars";
import Swal from 'sweetalert2'
import 'bootstrap/dist/css/bootstrap.min.css';

const UserPanel = ({ isOpen, closePanel }) => {
  const [users, setUsers] = useState(["Juan", "Maria", "Pedro"]);
  const [editIndex, setEditIndex] = useState(null);
  const [editName, setEditName] = useState("");
  const [newUser, setNewUser] = useState("");

  const startEdit = (index) => {
    setEditIndex(index);
    setEditName(users[index]);
  };

  const saveEdit = () => {
    const updatedUsers = [...users];
    updatedUsers[editIndex] = editName;
    setUsers(updatedUsers);
    setEditIndex(null);
    setEditName("");
  };

 
const deleteUser = (index) => {
  const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: "btn btn-success",
      cancelButton: "btn btn-danger"
    },
    buttonsStyling: false
  });

  swalWithBootstrapButtons.fire({
    title: "¿Estás seguro?",
    text: "¡No podrás revertir esto!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminarlo",
    cancelButtonText: "No, cancelar",
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
      // Aquí puedes proceder con la eliminación del usuario
      const newUsers = [...users];
      newUsers.splice(index, 1);
      setUsers(newUsers);

      swalWithBootstrapButtons.fire({
        title: "¡Eliminado!",
        text: "El usuario ha sido eliminado.",
        icon: "success"
      });
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      swalWithBootstrapButtons.fire({
        title: "Cancelado",
        text: "El usuario está a salvo :)",
        icon: "error"
      });
    }
  });
};

  const addUser = () => {
    if (newUser.trim() !== "") {
      setUsers([...users, newUser]);
      setNewUser("");
    }
  };

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="fixed inset-0 overflow-hidden z-50" onClose={closePanel}>
        <div className="absolute inset-0 flex justify-end">
          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="w-screen max-w-md">
              <div className="h-full flex flex-col bg-white shadow-xl overflow-y-scroll">
                <div className="px-4 py-6 sm:px-6 bg-blue-600 text-white">
                  <Dialog.Title className="text-lg font-medium">Gestión de Usuarios</Dialog.Title>
                  <button onClick={closePanel} className="absolute top-4 right-4">
                    <span className="sr-only">Cerrar</span>
                    &times;
                  </button>
                </div>
                <div className="relative flex-1 px-4 sm:px-6">
                  <div className="mt-6">
                    <input
                      type="text"
                      value={newUser}
                      onChange={(e) => setNewUser(e.target.value)}
                      placeholder="Nuevo usuario"
                      className="border p-2 w-full"
                    />
                    <button onClick={addUser} className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">
                      Añadir Usuario
                    </button>
                  </div>
                  <ul className="mt-6 space-y-4">
                    {users.map((user, index) => (
                      <li key={index} className="flex justify-between items-center">
                        <div className="flex items-center">
                          <Avatar
                            size={40}
                            name={user}
                            variant="beam"
                            colors={["#92A1C6", "#146A7C", "#F0AB3D", "#C271B4", "#C20D90"]}
                          />
                          {editIndex === index ? (
                            <input
                              type="text"
                              value={editName}
                              onChange={(e) => setEditName(e.target.value)}
                              className="ml-4 border p-2"
                            />
                          ) : (
                            <span className="ml-4">{user}</span>
                          )}
                        </div>
                        <div>
                          {editIndex === index ? (
                            <button onClick={saveEdit} className="ml-2 bg-green-600 text-white px-4 py-2 rounded">
                              Guardar
                            </button>
                          ) : (
                            <>
                              <button onClick={() => startEdit(index)} className="ml-2 bg-yellow-600 text-white px-4 py-2 rounded">
                                Editar
                              </button>
                              <button onClick={() => deleteUser(index)} className="ml-2 bg-red-600 text-white px-4 py-2 rounded">
                                Eliminar
                              </button>
                            </>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UserPanel;