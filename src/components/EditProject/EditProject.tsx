import React, { useContext } from 'react';
import 'twin.macro';
import Project from '../../models/project';
import { PopupContext } from '../../providers/PopupProvider';
import List from '../General/List/List';
import ListItem from '../General/List/ListItem';
import EditProjectConnectionDefaults from './EditProjectConnectionDefaults';
import EditProjectGeneral from './EditProjectGeneral';
import { projectUpdate } from '../../redux/actions/projects';

export interface EditProjectProps {
  project: Project,
  onProjectChange: typeof projectUpdate,
}

export default function EditProject({
  project,
  onProjectChange,
}: EditProjectProps) {
  const popup = useContext(PopupContext);

  return (
    <>
      <h1 tw="text-2xl p-4 text-gray-600 dark:text-gray-400 border-b border-gray-300 dark:border-gray-700">
        {project.name}
      </h1>
      <List>
        <ListItem
          title="General"
          subtitle="Project name and formatting"
          onClick={() => popup.push(
            'General',
            EditProjectGeneral,
            {
              project,
              onProjectChange,
            },
          )}
        />
        <ListItem
          title="Connection Defaults"
          subtitle="Default WebSocket URL, protocol header and auto-reconnect values"
          onClick={() => popup.push(
            'Connection Defaults',
            EditProjectConnectionDefaults,
            {
              project,
              onProjectChange,
            },
          )}
        />
      </List>
    </>
  );
}
