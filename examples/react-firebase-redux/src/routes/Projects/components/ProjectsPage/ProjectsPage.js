import React, { cloneElement } from 'react'
import PropTypes from 'prop-types'
import { isEmpty } from 'react-redux-firebase'
import ProjectTile from '../ProjectTile'
import NewProjectTile from '../NewProjectTile'
import NewProjectDialog from '../NewProjectDialog'
import classes from './ProjectsPage.scss'

export const ProjectsPage = ({
  children,
  projects,
  collabProjects,
  auth,
  newDialogOpen,
  toggleDialog,
  deleteProject,
  addProject,
  goToProject,
  goToCollaborator
}) =>
  children ? (
    cloneElement(children, { auth })
  ) : (
    <div className={classes.container}>
      <NewProjectDialog
        onSubmit={addProject}
        open={newDialogOpen}
        onRequestClose={toggleDialog}
      />
      <div className={classes.tiles}>
        <NewProjectTile onClick={toggleDialog} />
        {!isEmpty(projects) &&
          projects.map((project, ind) => (
            <ProjectTile
              key={`Project-${project.key}-${ind}`}
              name={project.value.name}
              onCollabClick={goToCollaborator}
              onSelect={() => goToProject(project.key)}
              onDelete={() => deleteProject(project.key)}
            />
          ))}
        {!isEmpty(collabProjects) &&
          collabProjects.map((project, ind) => (
            <ProjectTile
              key={`Collab-Project-${project.key}-${ind}`}
              name={project.value.name}
              onCollabClick={goToCollaborator}
              onSelect={() => goToProject(project.key)}
              onDelete={() => deleteProject(project.key)}
            />
          ))}
      </div>
    </div>
  )

ProjectsPage.propTypes = {
  children: PropTypes.object,
  auth: PropTypes.object,
  projects: PropTypes.array,
  collabProjects: PropTypes.array,
  newDialogOpen: PropTypes.bool,
  toggleDialog: PropTypes.func,
  deleteProject: PropTypes.func,
  addProject: PropTypes.func,
  goToProject: PropTypes.func,
  goToCollaborator: PropTypes.func
}

export default ProjectsPage
