import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";


const TicketPanel = ({ isOpen, closePanel }) => {
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
            <Dialog.Panel className="w-96 bg-white shadow-xl h-full flex flex-col p-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-bold">Gestión de Tickets</h2>
                <button onClick={closePanel} className="text-gray-600 hover:text-gray-900">✕</button>
              </div>

              <p className="text-gray-500">Aquí se gestionarán los tickets en el futuro.</p>
            </Dialog.Panel>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default TicketPanel;
