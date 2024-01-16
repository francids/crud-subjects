"use client";

import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Modal,
  Label,
  TextInput,
} from "flowbite-react";
import { Subject } from "@/models/Subjects";
import { useState } from "react";

export default function Home() {
  const [subjects, setSubjects] = useState<Subject[]>([
    {
      id: 1,
      code: "MATH-101",
      name: "Mathematics",
      description: "Mathematics",
      credits: 3,
      created_at: new Date(),
      updated_at: new Date(),
      teacher_id: 1,
    },
    {
      id: 2,
      code: "PHYS-101",
      name: "Physics",
      description: "Physics",
      credits: 3,
      created_at: new Date(),
      updated_at: new Date(),
      teacher_id: 2,
    },
    {
      id: 3,
      code: "CHEM-101",
      name: "Chemistry",
      description: "Chemistry",
      credits: 3,
      created_at: new Date(),
      updated_at: new Date(),
      teacher_id: 3,
    },
  ]);

  const addSubject = (subject: Subject) => setSubjects([...subjects, subject]);
  const removeSubject = (id: number) => {
    setSubjects(subjects.filter((subject) => subject.id !== id));
  };

  const [openCreateModal, setOpenCreateModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [editingSubject, setEditingSubject] = useState<Subject | null>(null);

  const CreateModal = () => {
    const [newSubject, setNewSubject] = useState<Subject>({
      id: 1,
      code: "",
      name: "",
      description: "",
      credits: 0,
      created_at: new Date(),
      updated_at: new Date(),
      teacher_id: 0,
    });

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setNewSubject({
        ...newSubject,
        [event.target.name]: event.target.value,
      });
    };

    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      addSubject(newSubject);
      setOpenCreateModal(false);
    };

    return (
      <Modal
        show={openCreateModal}
        size="md"
        onClose={() => setOpenCreateModal(false)}
        popup
      >
        <Modal.Header>
          <h2 className="text-lg font-normal">Create Subject</h2>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <Label>
              Code:
              <TextInput
                type="text"
                name="code"
                value={newSubject.code}
                onChange={handleInputChange}
              />
            </Label>
            <Label>
              Name:
              <TextInput
                type="text"
                name="name"
                value={newSubject.name}
                onChange={handleInputChange}
              />
            </Label>
            <Label>
              Description:
              <TextInput
                type="text"
                name="description"
                value={newSubject.description}
                onChange={handleInputChange}
              />
            </Label>
            <Label>
              Credits:
              <TextInput
                type="number"
                name="credits"
                value={newSubject.credits}
                onChange={handleInputChange}
              />
            </Label>
            <Label>
              Teacher ID:
              <TextInput
                type="number"
                name="teacher_id"
                value={newSubject.teacher_id}
                onChange={handleInputChange}
              />
            </Label>
            <div className="flex justify-center gap-4 mt-4">
              <Button type="submit" color="success">
                Create
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    );
  };

  const EditModal = () => {
    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      setEditingSubject({
        ...editingSubject,
        [event.target.name]: event.target.value,
      });
    };

    const handleSubmit = (event: React.FormEvent) => {
      event.preventDefault();
      // Aquí debes implementar la lógica para actualizar el `Subject`
      setOpenEditModal(false);
    };

    return (
      <Modal
        show={openEditModal}
        size="md"
        onClose={() => setOpenEditModal(false)}
        popup
      >
        <Modal.Header>
          <h2 className="text-lg font-normal">Edit Subject</h2>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <Label>
              Code:
              <TextInput
                type="text"
                name="code"
                value={editingSubject?.code}
                onChange={handleInputChange}
              />
            </Label>
            <Label>
              Name:
              <TextInput
                type="text"
                name="name"
                value={editingSubject?.name}
                onChange={handleInputChange}
              />
            </Label>
            <Label>
              Description:
              <TextInput
                type="text"
                name="description"
                value={editingSubject?.description}
                onChange={handleInputChange}
              />
            </Label>
            <Label>
              Credits:
              <TextInput
                type="number"
                name="credits"
                value={editingSubject?.credits}
                onChange={handleInputChange}
              />
            </Label>
            <Label>
              Teacher ID:
              <TextInput
                type="number"
                name="teacher_id"
                value={editingSubject?.teacher_id}
                onChange={handleInputChange}
              />
            </Label>
            <div className="flex justify-center gap-4 mt-4">
              <Button type="submit" color="success">
                Save changes
              </Button>
            </div>
          </form>
        </Modal.Body>
      </Modal>
    );
  };

  const DeleteModal = (subject: Subject) => {
    return (
      <Modal
        show={openDeleteModal}
        size="md"
        onClose={() => setOpenDeleteModal(false)}
        popup
      >
        <Modal.Header />
        <Modal.Body>
          <div className="text-center">
            <h3 className="mb-5 text-lg font-normal">
              Are you sure you want to delete this subject?
            </h3>
            <div className="flex justify-center gap-4">
              <Button
                color="failure"
                onClick={() => {
                  setOpenDeleteModal(false);
                  removeSubject(editingSubject?.id as number);
                }}
              >
                Yes, I'm sure
              </Button>
              <Button color="gray" onClick={() => setOpenDeleteModal(false)}>
                No, cancel
              </Button>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <main className="bg-slate-950 w-full h-screen flex flex-col justify-center items-center text-white overflow-x-auto">
      <div className="flex justify-center items-center">
        <h1 className="font-bold text-3xl px-3">CRUD Subjects</h1>
        <Button onClick={() => setOpenCreateModal(true)}>
          <svg
            className="w-3 h-3 text-white"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.546.5a9.5 9.5 0 1 0 9.5 9.5 9.51 9.51 0 0 0-9.5-9.5ZM13.788 11h-3.242v3.242a1 1 0 1 1-2 0V11H5.304a1 1 0 0 1 0-2h3.242V5.758a1 1 0 0 1 2 0V9h3.242a1 1 0 1 1 0 2Z" />
          </svg>
        </Button>
      </div>
      <hr className="border-1 border-white w-96 my-6" />
      <div className="container">
        <Table striped>
          <TableHead>
            <TableHeadCell>Code</TableHeadCell>
            <TableHeadCell>Name</TableHeadCell>
            <TableHeadCell>Description</TableHeadCell>
            <TableHeadCell>Credits</TableHeadCell>
            <TableHeadCell>Created At</TableHeadCell>
            <TableHeadCell>Updated At</TableHeadCell>
            <TableHeadCell>Teacher ID</TableHeadCell>
            <TableHeadCell>Actions</TableHeadCell>
          </TableHead>
          <TableBody>
            {subjects.map((subject) => (
              <TableRow key={subject.id}>
                <TableCell>{subject.code}</TableCell>
                <TableCell>{subject.name}</TableCell>
                <TableCell>{subject.description}</TableCell>
                <TableCell>{subject.credits}</TableCell>
                <TableCell>{subject.created_at?.toDateString()}</TableCell>
                <TableCell>{subject.updated_at?.toDateString()}</TableCell>
                <TableCell>{subject.teacher_id}</TableCell>
                <TableCell className="grid gap-1 grid-cols-2 text-white">
                  <Button onClick={() => setOpenEditModal(true)}>
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 18"
                    >
                      <path d="M12.687 14.408a3.01 3.01 0 0 1-1.533.821l-3.566.713a3 3 0 0 1-3.53-3.53l.713-3.566a3.01 3.01 0 0 1 .821-1.533L10.905 2H2.167A2.169 2.169 0 0 0 0 4.167v11.666A2.169 2.169 0 0 0 2.167 18h11.666A2.169 2.169 0 0 0 16 15.833V11.1l-3.313 3.308Zm5.53-9.065.546-.546a2.518 2.518 0 0 0 0-3.56 2.576 2.576 0 0 0-3.559 0l-.547.547 3.56 3.56Z" />
                      <path d="M13.243 3.2 7.359 9.081a.5.5 0 0 0-.136.256L6.51 12.9a.5.5 0 0 0 .59.59l3.566-.713a.5.5 0 0 0 .255-.136L16.8 6.757 13.243 3.2Z" />
                    </svg>
                  </Button>
                  <Button onClick={() => setOpenDeleteModal(true)}>
                    <svg
                      className="w-3 h-3"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 18 20"
                    >
                      <path d="M17 4h-4V2a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v2H1a1 1 0 0 0 0 2h1v12a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6h1a1 1 0 1 0 0-2ZM7 2h4v2H7V2Zm1 14a1 1 0 1 1-2 0V8a1 1 0 0 1 2 0v8Zm4 0a1 1 0 0 1-2 0V8a1 1 0 0 1 2 0v8Z" />
                    </svg>
                  </Button>
                  <DeleteModal />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <CreateModal />
      <EditModal />
    </main>
  );
}
