import React from 'react';
import 'twin.macro';
import ConnectionsConnected from './components/Connections/ConnectionsConnected';
import SidebarConnected from './components/Sidebar/SidebarConnected';
import HeaderConnected from './components/Header/HeaderConnected';
import EmptyMessage from './components/General/Utilities/EmptyMessage';

export interface LayoutProps {
  sidebarOpen: boolean,
  projectOpen: boolean,
  projectsExist: boolean,
}

export default function Layout({
  sidebarOpen,
  projectOpen,
  projectsExist,
}: LayoutProps) {
  return (
    <>
      <div tw="flex flex-col h-full">
        <div tw="flex-grow-0">
          <HeaderConnected />
        </div>
        <div tw="flex flex-grow pb-2">
          {projectOpen && (
            <>
              {sidebarOpen && (
                <div tw="pr-2 flex flex-grow min-w-xs max-w-lg w-1/3 lg:w-1/4">
                  <SidebarConnected />
                </div>
              )}
              <ConnectionsConnected
                paddingLeft={!sidebarOpen}
              />
            </>
          )}
          {(!projectOpen && !projectsExist) && (
            <EmptyMessage heading="No Projects Exist">
              Click the projects button in the top left to create one.
            </EmptyMessage>
          )}
          {(!projectOpen && projectsExist) && (
            <EmptyMessage heading="No Project Open">
              Click the projects button in the top left to open one.
            </EmptyMessage>
          )}
        </div>
      </div>
    </>
  );
}
