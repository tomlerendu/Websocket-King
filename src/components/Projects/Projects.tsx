import React, { useContext } from 'react';
import 'twin.macro';
import { format } from 'date-fns';
import Project from '../../models/project';
import ProjectValidator from '../../models/project/validator';
import List from '../General/List/List';
import ListItem from '../General/List/ListItem';
import { PopupContext } from '../../providers/PopupProvider';
import PopupPrompt from '../General/PopupPresets/PopupPrompt';
import PopupConfirmation from '../General/PopupPresets/PopupConfirmation';
import ButtonPrimary from '../General/Styled/ButtonPrimary';
import { projectCreate, projectRemoveRelatedItemsAndDelete } from '../../redux/actions/projects';
import { userInterfaceProjectSwitch } from '../../redux/actions/user-interface-properties';

export interface ProjectsProps {
  projects: Project[],
  onCreate: typeof projectCreate,
  onSwitch: typeof userInterfaceProjectSwitch,
  onDelete: typeof projectRemoveRelatedItemsAndDelete,
}

export default function Projects({
  projects,
  onCreate,
  onSwitch,
  onDelete,
}: ProjectsProps) {
  const popup = useContext(PopupContext);

  return (
    <>
      <div tw="flex justify-end py-2 px-4">
        <ButtonPrimary
          type="button"
          onClick={async () => {
            const name = await popup.push<string>(
              'Create',
              PopupPrompt,
              {
                label: 'Project Name',
                submitLabel: 'Create',
                yupValidator: ProjectValidator.name,
                maxLength: ProjectValidator.nameLength,
              },
            );

            if (name?.length) {
              onCreate(name);
            }
          }}
          tw="py-1 px-4 text-sm rounded"
        >
          Create Project
        </ButtonPrimary>
      </div>
      <div tw="flex flex-col border-t border-gray-300 dark:border-gray-700">
        <List>
          {projects.map((project) => (
            <ListItem
              key={project.id}
              title={<>{project.name}</>}
              subtitle={(
                <>
                  Created
                  {' '}
                  {project.createdAt ? format(new Date(project.createdAt), 'd MMM Y') : 'Unknown'}
                </>
              )}
              onClick={() => {
                onSwitch(project);
                popup.popToRoot();
              }}
              secondaryClickActions={[
                {
                  label: 'Open',
                  onClick: () => {
                    onSwitch(project);
                    popup.popToRoot();
                  },
                },
                {
                  label: 'Delete',
                  onClick: async () => {
                    if (await popup.push<string>(
                      'Delete',
                      PopupConfirmation,
                      {
                        message: `Are you sure you would like to delete ${project.name}? `
                          + 'This action is permanent and cannot be undone.',
                      },
                    )) {
                      onDelete(project);
                    }
                  },
                },
              ]}
            />
          ))}
        </List>
      </div>
    </>
  );
}
