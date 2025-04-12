import { Project } from "~/components/project";

const mockProjects = [
  {
    id: 1,
    name: "Website Redesign",
    description: "Redesign the company website to improve user experience.",
    owner: { id: 101, name: "Alice Johnson" },
    assignedUsers: [
      { id: 201, name: "John Doe" },
      { id: 202, name: "Jane Smith" },
    ],
    tasks: [
      { id: 301, title: "Create Wireframes", status: "COMPLETED" as "COMPLETED" },
      { id: 302, title: "Develop Frontend", status: "IN_PROGRESS" as "IN_PROGRESS" },
      { id: 303, title: "Setup Backend", status: "PENDING" as "PENDING" },
    ],
    status: "IN_PROGRESS",
    createdAt: "2025-04-11T10:00:00Z",
  },
  {
    id: 2,
    name: "API Development",
    description: "Develop the backend API for the application.",
    owner: { id: 102, name: "Bob Williams" },
    assignedUsers: [
      { id: 203, name: "Alice Johnson" },
      { id: 204, name: "Charlie Brown" },
    ],
    tasks: [
      { id: 304, title: "Setup Database", status: "PENDING" as "PENDING" },
      { id: 305, title: "Implement Authentication", status: "IN_PROGRESS" as "IN_PROGRESS" },
    ],
    status: "PENDING",
    createdAt: "2025-04-10T12:00:00Z",
  },
];

export default function Projects() {
  return (
      <section className="container py-18 px-12">
            <h1 className="text-4xl text-primary font-bold mb-6">Proyectos</h1>
            <div className="container flex flex-col gap-6">
            {mockProjects.map((project) => (
        <Project key={project.id} project={project} />
      ))}
      </div>
           
      </section>

  );
}
