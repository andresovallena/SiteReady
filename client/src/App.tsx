import { Link, Route, Routes, useParams} from 'react-router';
import './App.css';

type Project = {
  id: string;
  name: string;
  systemType: string;
  contactName: string | null;
  installationAddress: string | null;
  accessInstructions: string | null;
};

const projects: Project[] = [
    {
      id: "1",
      name: "mueller's house",
      systemType: "solar",
      contactName: "Alex",
      installationAddress: "Bgm",
      accessInstructions: null,
    },
    {
      id: "2",
      name: "jannick's house",
      systemType: "solar",
      contactName: "Jannick",
      installationAddress: null,
      accessInstructions: null,
    },
    {
      id: "3",
      name: "johannes's house",
      systemType: "solar",
      contactName: "Johannes",
      installationAddress: "Alte Uni",
      accessInstructions: "enter the house on the left black door",
    },
  ];

function ProjectListPage() {

  return (
    <main>
      <h1>SiteReady</h1>

      <div className='project-grid'>

        {projects.map((project) => {
          const requiredValues = [
            project.contactName,
            project.installationAddress,
            project.accessInstructions,
          ];

          const missingCount = requiredValues.filter(
            (value) => value === null
          ).length;

          return (
            <article className='project-card' key={project.id}>
              <h2>{project.name}</h2>
              <p>
                {missingCount === 0
                  ? "Information complete"
                  : `${missingCount} item(s) missing`}
              </p>
              <Link to={`/projects/${project.id}`}>
                Open project
              </Link>
            </article>
          );
        })}
      </div>
    </main>
  );
}

function ProjectDetailPage(){
  const { projectId } = useParams();

  const project = projects.find(
    (project) => project.id === projectId
  );

  if (!project){
    return (
      <main>
        <h1>
          Project not found
        </h1>
        <Link to="/projects"> Back to projects</Link>
      </main>
    )
  }

  return (
    <main>
      <h1>{project.name}</h1>
      <Link to="/projects"> Back to projects</Link>
    </main>
  )
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<ProjectListPage />} />
      <Route path="/projects" element={<ProjectListPage />} />

      <Route
        path="/projects/:projectId"
        element = {<ProjectDetailPage />}
      />
    </Routes>
  );
}

export default App;
