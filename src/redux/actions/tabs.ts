import { v4 as uuid } from 'uuid';
import Connection from '../../models/connection';
import SavedPayload from '../../models/saved-payload';
import Tab from '../../models/tab';
import createOrmAction from '../../services/orm/create-orm-action';

export const tabCreate = createOrmAction((
  { builder },
  connection: Connection,
  content?: string,
) => {
  builder('tabs')
    .where('selected', true)
    .where('connectionId', connection.id)
    .update({ selected: false });

  builder('tabs')
    .create({
      id: uuid(),
      number: (
        builder('tabs')
          .where('connectionId', connection.id)
          .sortDesc('number')
          .first()?.number || 0
      ) + 1,
      connectionId: connection.id,
      content: content || '',
      selected: true,
    });
});

export const tabCreateFromSavedPayload = createOrmAction((
  { builder },
  connection: Connection,
  savedPayload: SavedPayload,
) => {
  const existingTab: Tab | null = builder('tabs')
    .where('savedPayloadId', savedPayload.id)
    .where('connectionId', connection.id)
    .first();

  const selectedTabs = builder('tabs')
    .whereNot('id', existingTab?.id)
    .whereTrue('selected')
    .where('connectionId', connection.id)
    .get();

  if (existingTab) {
    builder('tabs')
      .whereModel(existingTab)
      .update({ selected: true });
  } else {
    builder('tabs').create({
      id: uuid(),
      number: (builder('tabs')
        .where('connectionId', connection.id)
        .sortDesc('number')
        .first()?.number || 0) + 1,
      connectionId: connection.id,
      content: savedPayload.content,
      savedPayloadId: savedPayload.id,
      selected: true,
    });
  }

  builder('tabs')
    .whereIn('id', selectedTabs.map((selectedTab) => selectedTab.id))
    .update({ selected: false });
});

export const tabClose = createOrmAction((
  { builder },
  tab: Tab,
) => {
  const currentSelectedTab = builder('tabs')
    .where('connectionId', tab.connectionId)
    .whereTrue('selected')
    .first()!;

  if (currentSelectedTab.id === tab.id) {
    const newSelectedTab = (
      builder('tabs')
        .whereNot('id', tab.id)
        .where('connectionId', tab.connectionId)
        .whereLessThanOrEqualTo('number', tab.number)
        .sortDesc('number')
        .first()
    ) || (
      builder('tabs')
        .whereNot('id', tab.id)
        .where('connectionId', tab.connectionId)
        .whereGreaterThanOrEqualTo('number', tab.number)
        .sortAsc('number')
        .first()
    );

    builder('tabs')
      .whereModel(newSelectedTab!)
      .update({ selected: true });
  }

  builder('tabs')
    .whereModel(tab)
    .delete();
});

export const tabSwitch = createOrmAction((
  { builder },
  tab: Tab,
) => {
  builder('tabs')
    .whereModel(tab)
    .update({ selected: true });

  builder('tabs')
    .whereTrue('selected')
    .whereNot('id', tab.id)
    .where('connectionId', tab.connectionId)
    .update({ selected: false });
});

export const tabUpdateContent = createOrmAction((
  { builder },
  tab: Tab,
  content: string,
) => {
  builder('tabs')
    .whereModel(tab)
    .update({ content });
});
