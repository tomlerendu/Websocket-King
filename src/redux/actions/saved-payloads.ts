import { v4 as uuid } from 'uuid';
import Connection from '../../models/connection';
import Project from '../../models/project';
import SavedPayload from '../../models/saved-payload';
import Tab from '../../models/tab';
import createOrmAction from '../../services/orm/create-orm-action';

export const savedPayloadCreate = createOrmAction((
  { builder },
  project: Project,
  name: string,
  content: string,
) => {
  builder('savedPayloads').create({
    id: uuid(),
    projectId: project.id,
    content,
    name,
  });
});

export const savedPayloadCreateFromTab = createOrmAction((
  { builder },
  project: Project,
  connection: Connection,
  tab: Tab,
  name: string,
) => {
  const savedPayload: SavedPayload = {
    id: uuid(),
    projectId: project.id,
    content: tab.content,
    name,
  };

  builder('savedPayloads').create(savedPayload);

  if (tab.savedPayloadId) {
    builder('tabs').create({
      id: uuid(),
      number: builder('tabs')
        .get()
        .find((existingTab) => existingTab.connectionId === connection.id)!
        .number + 1,
      connectionId: connection.id,
      content: tab.content,
      savedPayloadId: savedPayload.id,
      selected: true,
    });

    builder('tabs')
      .whereModel(tab)
      .update({ selected: false });
  } else {
    builder('tabs')
      .whereModel(tab)
      .update({ savedPayloadId: savedPayload.id });
  }
});

export const savedPayloadUpdate = createOrmAction((
  { builder },
  savedPayload: SavedPayload,
  fields: Partial<SavedPayload>,
) => {
  builder('savedPayloads')
    .whereModel(savedPayload)
    .update(fields);
});

export const savedPayloadRemove = createOrmAction((
  { builder },
  savedPayload: SavedPayload,
) => {
  builder('savedPayloads')
    .whereModel(savedPayload)
    .delete();
});

export const savedPayloadsRemoveForProject = createOrmAction((
  { builder },
  project: Project,
) => {
  builder('savedPayloads')
    .where('projectId', project.id)
    .delete();
});
